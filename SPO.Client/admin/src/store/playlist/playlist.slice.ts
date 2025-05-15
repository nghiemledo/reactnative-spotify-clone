import { Playlist } from "@/types/playlist.type";
import { createSlice } from "@reduxjs/toolkit";
import { deletePlaylistData, getPlaylistById, getPlaylistData, postPlaylistData, putPlaylistData } from "./playlist.actions";

interface initialStateTypes {
    playlistData: Playlist[];
    playlistDetail: Playlist | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    playlistData: [],
    playlistDetail: null,
    loading: false,
    error: null,
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getPlaylistData.fulfilled, (state, action) => {
                state.playlistData = action.payload
            })
            .addCase(getPlaylistById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPlaylistById.fulfilled, (state, action) => {
                state.loading = false;
                state.playlistDetail = action.payload;
                const id = action.payload.id;
                const existingGenre = state.playlistData.find((item) => item.id === id);
                if (existingGenre) {
                    const index = state.playlistData.indexOf(existingGenre);
                    state.playlistData[index] = action.payload;
                }
            })
            .addCase(getPlaylistData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postPlaylistData.fulfilled, (state, action) => {
                state.playlistData.push(action.payload)
            })
            .addCase(postPlaylistData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putPlaylistData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.playlistData.some((item, index) => {
                    if (item.id === id) {
                        state.playlistData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deletePlaylistData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.playlistData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.playlistData.splice(itemIndex, 1);
                }
            })
    },
});

export const playlistReducer = playlistSlice.reducer