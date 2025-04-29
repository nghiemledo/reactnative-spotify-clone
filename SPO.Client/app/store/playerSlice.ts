import { createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  currentSong: string | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentSong: null,
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
  },
});

export const { playSong, pauseSong } = playerSlice.actions;
export default playerSlice.reducer;
