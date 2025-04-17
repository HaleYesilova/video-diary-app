import React from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useVideoStore } from '../../store/videoStore';
import { Video } from 'expo-av';
import { Animated } from 'react-native-reanimated';
import { styled } from 'nativewind';

const AnimatedView = styled(Animated.View);

export default function VideoDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const video = useVideoStore((s) => s.videos.find((v) => v.id.toString() === id));

  if (!video) return <Text className="p-4 text-red-500">Video not found.</Text>;

  return (
    <AnimatedView
      className="flex-1 p-4 bg-white"
      entering="fadeInUp"
      exiting="fadeOut"
    >
      <AnimatedView
        className="rounded-xl bg-white p-3 shadow mb-4"
        entering="fadeInDown"
      >
        <Text className="text-xl font-bold text-blue-800">{video.name}</Text>
        <Text className="text-gray-500 mt-1">{video.desc}</Text>
      </AnimatedView>

      <AnimatedView
        entering="zoomIn"
        className="overflow-hidden rounded-xl shadow-md"
      >
        <Video
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          style={{ width: '100%', height: 300 }}
        />
      </AnimatedView>
    </AnimatedView>
  );
}
