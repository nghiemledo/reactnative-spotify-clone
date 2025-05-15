import { Song } from "@/types/song.type";
import { createSlice } from "@reduxjs/toolkit";
import { deleteSongData, getSongById, getSongData, postSongData, putSongData } from "./song.actions";

interface initialStateTypes {
    songData: Song[];
    songDetail: Song | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    songData: [],
    songDetail: null,
    loading: false,
    error: null,
}

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getSongData.fulfilled, (state, action) => {
                state.songData = action.payload
            })
            .addCase(getSongById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSongById.fulfilled, (state, action) => {
                state.loading = false;
                state.songDetail = action.payload;
                const id = action.payload.id;
                const existingGenre = state.songData.find((item) => item.id === id);
                if (existingGenre) {
                    const index = state.songData.indexOf(existingGenre);
                    state.songData[index] = action.payload;
                }
            })
            .addCase(getSongData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postSongData.fulfilled, (state, action) => {
                state.songData.push(action.payload)
            })
            .addCase(postSongData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putSongData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.songData.some((item, index) => {
                    if (item.id === id) {
                        state.songData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deleteSongData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.songData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.songData.splice(itemIndex, 1);
                }
            })
    },
});

export const songReducer = songSlice.reducer