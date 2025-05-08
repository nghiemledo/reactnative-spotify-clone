import { createSlice } from "@reduxjs/toolkit";
import { Artist } from "@/types/artist.type";
import { deleteAlbumData, getAlbumById, getAlbumData, postAlbumData, putAlbumData } from "./album.actions";

interface initialStateTypes {
    albumData: Artist[];
    albumDetail: Artist | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    albumData: [],
    albumDetail: null,
    loading: false,
    error: null,
}

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAlbumData.fulfilled, (state, action) => {
                state.albumData = action.payload
            })
            .addCase(getAlbumById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAlbumById.fulfilled, (state, action) => {
                state.loading = false;
                state.albumDetail = action.payload;
                const id = action.payload.id;
                const existingItem = state.albumData.find((item) => item.id === id);
                if (existingItem) {
                    const index = state.albumData.indexOf(existingItem);
                    state.albumData[index] = action.payload;
                }
            })
            .addCase(getAlbumData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postAlbumData.fulfilled, (state, action) => {
                state.albumData.push(action.payload)
            })
            .addCase(postAlbumData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putAlbumData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.albumData.some((item, index) => {
                    if (item.id === id) {
                        state.albumData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deleteAlbumData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.albumData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.albumData.splice(itemIndex, 1);
                }
            })
    },
});

export const albumReducer = albumSlice.reducer