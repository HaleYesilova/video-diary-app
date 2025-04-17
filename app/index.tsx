import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useVideoStore } from '../store/videoStore';

export default function HomeScreen() {
  const { videos } = useVideoStore();
  const router = useRouter();

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Cropped Videos</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/details/${item.id}`)}>
            <Text className="text-lg mb-2 text-blue-600">{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">No videos cropped yet.</Text>
        }
      />
    </View>
  );
}
