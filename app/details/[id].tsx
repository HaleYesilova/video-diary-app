import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useVideoStore } from '../../store/videoStore';
import { Video } from 'expo-av';

export default function VideoDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const video = useVideoStore((s) => s.videos.find((v) => v.id.toString() === id));

  if (!video) return <Text className="p-4">Video not found.</Text>;

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold">{video.name}</Text>
      <Text className="text-gray-500 mb-4">{video.desc}</Text>
      <Video
        source={{ uri: video.uri }}
        useNativeControls
        resizeMode="contain"
        style={{ width: '100%', height: 300 }}
      />
    </View>
  );
}
