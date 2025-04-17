import React, { useEffect } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useVideoStore } from '../store/videoStore';
import { setupDatabase, getAllVideos } from '../db/videoDb'; 
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Animated } from 'react-native-reanimated';
import { styled } from 'nativewind';

const AnimatedView = styled(Animated.View);

export default function HomeScreen() {
  const { videos, setVideos } = useVideoStore(); 
  const router = useRouter();

  
  useEffect(() => {
    setupDatabase();
    getAllVideos().then((videos) => {
      useVideoStore.getState().setVideos(videos);
    });
  }, []);  

  return (
    <AnimatedView
      className="flex-1 p-4 bg-white"
      entering="fadeIn"
      exiting="fadeOut"
    >
      <AnimatedView
        entering="fadeInDown"
        className="flex-row justify-between items-center mb-6"
      >
        <Text className="text-2xl font-bold text-blue-800">Cropped Videos</Text>
        <Button title="Add New" onPress={() => router.push('/crop')} />
      </AnimatedView>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/details/${item.id}`)}
            onLongPress={() => router.push(`/edit/${item.id}`)}
            className="active:opacity-70"
          >
            <AnimatedView
              entering="fadeInUp"
              className="mb-3 p-4 rounded-2xl bg-gray-100 shadow-md transition-all duration-300"
            >
              <Text className="text-lg text-blue-700 font-semibold">{item.name}</Text>
              <Text className="text-gray-500 mt-1">{item.desc}</Text>
            </AnimatedView>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-20 text-lg">
            No videos cropped yet.
          </Text>
        }
      />
    </AnimatedView>
  );
}
