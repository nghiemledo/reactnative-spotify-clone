import { createSlice } from "@reduxjs/toolkit";
import { deleteArtistData, getArtistById, getArtistData, postArtistData, putArtistData } from "./artist.actions";
import { Artist } from "@/types/artist.type";

interface initialStateTypes {
    artistData: Artist[];
    artistDetail: Artist | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    artistData: [],
    artistDetail: null,
    loading: false,
    error: null,
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getArtistData.fulfilled, (state, action) => {
                state.artistData = action.payload
            })
            .addCase(getArtistById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArtistById.fulfilled, (state, action) => {
                state.loading = false;
                state.artistDetail = action.payload;
                const id = action.payload.id;
                const existingGenre = state.artistData.find((item) => item.id === id);
                if (existingGenre) {
                    const index = state.artistData.indexOf(existingGenre);
                    state.artistData[index] = action.payload;
                }
            })
            .addCase(getArtistData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postArtistData.fulfilled, (state, action) => {
                state.artistData.push(action.payload)
            })
            .addCase(postArtistData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putArtistData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.artistData.some((item, index) => {
                    if (item.id === id) {
                        state.artistData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deleteArtistData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.artistData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.artistData.splice(itemIndex, 1);
                }
            })
    },
});

export const artistReducer = artistSlice.reducer