import { createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  currentSong: SongTrack;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentSong: {},
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    skipToNext: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    skipToPrevious: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
  },
});

export const { playSong, pauseSong, skipToNext, skipToPrevious } =
  playerSlice.actions;
export default playerSlice.reducer;
