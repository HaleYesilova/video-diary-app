import React, { useState } from 'react';
import { Text, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoStore } from '../../store/videoStore';
import MetadataForm from '../../components/MetadataForm';

import { Animated } from 'react-native-reanimated';
import { styled } from 'nativewind';

const AnimatedView = styled(Animated.View);

export default function EditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { videos } = useVideoStore();

  const video = videos.find((v) => v.id.toString() === id);
  const [name, setName] = useState(video?.name || '');
  const [desc, setDesc] = useState(video?.desc || '');

  const handleSave = () => {
    if (!video) return;

    const updated = videos.map((v) =>
      v.id.toString() === id ? { ...v, name, desc } : v
    );

    useVideoStore.setState({ videos: updated });
    Alert.alert('Updated', 'Video information updated successfully!');
    router.push('/');
  };

  if (!video) return <Text className="p-4 text-red-500">Video not found.</Text>;

  return (
    <AnimatedView
      className="flex-1 bg-white p-4"
      entering="fadeInUp"
      exiting="fadeOutDown"
    >
      <AnimatedView entering="fadeInDown" className="mb-4">
        <Text className="text-2xl font-bold text-blue-800">Edit Video</Text>
        <Text className="text-gray-500">Update title or description</Text>
      </AnimatedView>

      <AnimatedView entering="zoomIn" className="bg-white rounded-xl shadow p-2">
        <MetadataForm
          name={name}
          desc={desc}
          onNameChange={setName}
          onDescChange={setDesc}
        />
      </AnimatedView>

      <AnimatedView entering="fadeInUp" className="mt-4 rounded-xl overflow-hidden">
        <Button title="Save Changes" onPress={handleSave} />
      </AnimatedView>
    </AnimatedView>
  );
}
