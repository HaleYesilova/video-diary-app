import { create } from 'zustand';

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

export const useVideoStore = create<State>((set) => ({
  videos: [],
  addVideo: (video) =>
    set((state) => ({
      videos: [...state.videos, video],
    })),
}));
