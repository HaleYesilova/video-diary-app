import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { cropVideo } from '../utils/cropVideo';
import { useVideoStore } from '../store/videoStore';

export default function MetadataScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const addVideo = useVideoStore((s) => s.addVideo);
  const router = useRouter();

  const handleCrop = async () => {
    if (!uri) return;

    const output = `${FileSystem.documentDirectory}${Date.now()}.mp4`;
    try {
      await cropVideo(uri, 0, 5, output);
      addVideo({ id: Date.now(), uri: output, name, desc });
      router.push('/');
    } catch (e) {
      Alert.alert('Error', 'Failed to crop the video.');
    }
  };

  return (
    <View className="flex-1 p-4 gap-4 bg-white">
      <TextInput
        placeholder="Video Name"
        value={name}
        onChangeText={setName}
        className="border p-2 rounded"
      />
      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        multiline
        numberOfLines={4}
        className="border p-2 rounded"
      />
      <Button title="Crop & Save" onPress={handleCrop} />
    </View>
  );
}
