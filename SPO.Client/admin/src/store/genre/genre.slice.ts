import { Genre } from "@/types/genre.type";
import { createSlice } from "@reduxjs/toolkit";
import { deleteGenreData, getGenreById, getGenreData, postGenreData, putGenreData } from "./genre.actions";

interface initialStateTypes {
    genreData: Genre[];
    genreDetail: Genre | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    genreData: [],
    genreDetail: null,
    loading: false,
    error: null,
}

const genreSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getGenreData.fulfilled, (state, action) => {
                state.genreData = action.payload
            })
            .addCase(getGenreById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGenreById.fulfilled, (state, action) => {
                state.loading = false;
                state.genreDetail = action.payload;
                const id = action.payload.id;
                const index = state.genreData.findIndex((item) => item.id === id);
                if (index !== -1) {
                    state.genreData[index] = action.payload;
                }
            })
            .addCase(getGenreData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postGenreData.fulfilled, (state, action) => {
                state.genreData.push(action.payload)
            })
            .addCase(postGenreData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putGenreData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.genreData.some((item, index) => {
                    if (item.id === id) {
                        state.genreData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deleteGenreData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.genreData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.genreData.splice(itemIndex, 1);
                }
            })
    },
});

export const genreReducer = genreSlice.reducer