import React, { useState } from 'react';
import { View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

export default function CropScreen() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const router = useRouter();

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 justify-center items-center gap-4 bg-white">
      <Button title="Select a Video" onPress={pickVideo} />
      {videoUri && (
        <Button
          title="Continue to Add Metadata"
          onPress={() => router.push({ pathname: '/metadata', params: { uri: videoUri } })}
        />
      )}
    </View>
  );
}
