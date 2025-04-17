import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

type VideoItem = {
  id: number;
  uri: string;
  name: string;
  desc: string;
};

type State = {
  videos: VideoItem[];
  addVideo: (video: VideoItem) => void;
};

export const useVideoStore = create<State>()(
  persist(
    (set) => ({
      videos: [],
      addVideo: (video) =>
        set((state) => ({
          videos: [...state.videos, video],
        })),
    }),
    {
      name: 'video-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
