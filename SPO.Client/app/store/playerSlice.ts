import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Track {
  id: string;
  url: string;
  title?: string;
  artist?: string;
  artwork?: string;
}

interface PlayerState {
  isPlaying: boolean;
  playbackState: string | null;
  currentTrack: Track | null;
  position: number;
  duration: number;
  queue: Track[];
  shuffle: boolean; // Trạng thái shuffle
  loop: "off" | "track" | "queue"; // Trạng thái lặp lại
  volume: number; // Mức âm lượng (0.0 đến 1.0)
}

const initialState: PlayerState = {
  isPlaying: false,
  playbackState: null,
  currentTrack: null,
  position: 0,
  duration: 0,
  queue: [],
  shuffle: false,
  loop: "off",
  volume: 1.0, // Mặc định âm lượng tối đa
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setPlaybackState(state, action: PayloadAction<string | null>) {
      state.playbackState = action.payload;
    },
    setCurrentTrack(state, action: PayloadAction<Track | null>) {
      state.currentTrack = action.payload;
    },
    setPosition(state, action: PayloadAction<number>) {
      state.position = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setQueue(state, action: PayloadAction<Track[]>) {
      state.queue = action.payload;
    },
    addTrackToQueue(state, action: PayloadAction<Track>) {
      state.queue.push(action.payload);
    },
    removeTrackFromQueue(state, action: PayloadAction<string>) {
      state.queue = state.queue.filter((track) => track.id !== action.payload);
    },
    clearQueue(state) {
      state.queue = [];
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    setShuffle(state, action: PayloadAction<boolean>) {
      state.shuffle = action.payload;
    },
    setLoop(state, action: PayloadAction<"off" | "track" | "queue">) {
      state.loop = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = Math.max(0, Math.min(1, action.payload)); // Giới hạn volume từ 0.0 đến 1.0
    },
  },
});

export const {
  setPlaying,
  setPlaybackState,
  setCurrentTrack,
  setPosition,
  setDuration,
  setQueue,
  addTrackToQueue,
  removeTrackFromQueue,
  clearQueue,
  togglePlay,
  setShuffle,
  setLoop,
  setVolume,
} = playerSlice.actions;
export default playerSlice.reducer;
