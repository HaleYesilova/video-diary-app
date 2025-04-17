import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { cropVideo } from '../utils/cropVideo';
import { useVideoStore } from '../store/videoStore';
import MetadataForm from '../components/MetadataForm';
import CropScrubber from '../components/CropScrubber';

export default function MetadataScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [start, setStart] = useState(0);
  const videoDuration = 60; // Replace with dynamic value if needed

  const addVideo = useVideoStore((s) => s.addVideo);
  const router = useRouter();

  const handleCrop = async () => {
    if (!uri) return;

    const output = `${FileSystem.documentDirectory}${Date.now()}.mp4`;
    try {
      await cropVideo(uri, start, 5, output);
      addVideo({ id: Date.now(), uri: output, name, desc });
      router.push('/');
    } catch (e) {
      Alert.alert('Error', 'Failed to crop the video.');
    }
  };

  return (
    <View className="flex-1 p-4 gap-4 bg-white">
      <MetadataForm
        name={name}
        desc={desc}
        onNameChange={setName}
        onDescChange={setDesc}
      />

      <CropScrubber
        startTime={start}
        setStartTime={setStart}
        duration={videoDuration}
      />

      <Button title="Crop & Save" onPress={handleCrop} />
    </View>
  );
}
