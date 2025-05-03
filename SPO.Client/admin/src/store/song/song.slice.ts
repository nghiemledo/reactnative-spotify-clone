import { Song } from "@/types/song.type";
import { createSlice } from "@reduxjs/toolkit";
import { deleteSongData, getSongBySlug, getSongData, postSongData, putSongData } from "./song.actions";

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
            .addCase(getSongBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSongBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.songDetail = action.payload;
                const slug = action.payload.slug;
                const index = state.songData.findIndex((item) => item.slug === slug);
                if (index !== -1) {
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
                const slug = action.payload.slug;
                state.songData.some((item, index) => {
                    if (item.id === slug) {
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