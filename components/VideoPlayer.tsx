import { Video } from 'expo-av';
import React from 'react';

export default function VideoPlayer({ uri }: { uri: string }) {
  return (
    <Video
      source={{ uri }}
      useNativeControls
      resizeMode="contain"
      style={{ width: '100%', height: 300 }}
    />
  );
}
