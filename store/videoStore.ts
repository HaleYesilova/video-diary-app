import { create } from 'zustand';

export type VideoItem = {
  id: number;
  uri: string;
  name: string;
  desc: string;
};

type State = {
  videos: VideoItem[];
  setVideos: (videos: VideoItem[]) => void;
};

export const useVideoStore = create<State>((set) => ({
  videos: [],
  setVideos: (videos) => set(() => ({ videos })),
}));
