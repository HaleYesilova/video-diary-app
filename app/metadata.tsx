import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import { z } from 'zod';

import { cropVideo } from '../utils/cropVideo';
import { useVideoStore } from '../store/videoStore';
import { insertVideo, getAllVideos } from '../db/videoDb';
import MetadataForm from '../components/MetadataForm';
import CropScrubber from '../components/CropScrubber';

import { Animated } from 'react-native-reanimated';
import { styled } from 'nativewind';

const AnimatedView = styled(Animated.View);

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  desc: z.string().min(1, 'Description is required'),
});

export default function MetadataScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [start, setStart] = useState(0);
  const [videoDuration, setVideoDuration] = useState(60);

  const videoRef = useRef<Video>(null);
  const setVideos = useVideoStore((s) => s.setVideos);

  useEffect(() => {
    const getDuration = async () => {
      if (videoRef.current) {
        const status = await videoRef.current.getStatusAsync();
        if (status?.isLoaded) {
          setVideoDuration((status.durationMillis || 60000) / 1000);
        }
      }
    };
    getDuration();
  }, []);

  const handleCrop = async () => {
    if (!uri) return;

    try {
      schema.parse({ name, desc });

      const output = `${FileSystem.documentDirectory}${Date.now()}.mp4`;
      await cropVideo(uri, start, 5, output);

      await insertVideo(output, name, desc);
      const videos = await getAllVideos();
      setVideos(videos);

      setName('');
      setDesc('');
      setStart(0);

      router.push('/');
    } catch (err: any) {
      Alert.alert('Validation Error', err?.errors?.[0]?.message || 'Please fill out all fields.');
    }
  };

  return (
    <AnimatedView
      className="flex-1 p-4 gap-4 bg-white"
      entering="fadeInUp"
      exiting="fadeOutDown"
    >
      <AnimatedView entering="zoomIn" className="rounded-xl overflow-hidden shadow-md">
        <Video
          ref={videoRef}
          source={{ uri }}
          style={{ width: '100%', height: 200 }}
          useNativeControls
          resizeMode="contain"
        />
      </AnimatedView>

      <AnimatedView entering="fadeIn" className="rounded-xl shadow p-2 bg-white">
        <MetadataForm
          name={name}
          desc={desc}
          onNameChange={setName}
          onDescChange={setDesc}
        />
      </AnimatedView>

      <AnimatedView entering="fadeInUp" className="bg-white rounded shadow p-2">
        <CropScrubber
          startTime={start}
          setStartTime={setStart}
          duration={videoDuration}
        />
      </AnimatedView>

      <AnimatedView entering="zoomIn" className="mt-4 rounded-xl overflow-hidden">
        <Button title="Crop & Save" onPress={handleCrop} />
      </AnimatedView>
    </AnimatedView>
  );
}
