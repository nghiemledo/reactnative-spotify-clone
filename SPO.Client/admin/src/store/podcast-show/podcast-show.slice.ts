import { PodcastShow } from "@/types/podcast-show.type";
import { createSlice } from "@reduxjs/toolkit";
import { deletePodcastShowData, getPodcastShowById, getPodcastShowData, postPodcastShowData, putPodcastShowData } from "./podcast-show.actions";

interface initialStateTypes {
    podcastShowData: PodcastShow[];
    podcastShowDetail: PodcastShow | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    podcastShowData: [],
    podcastShowDetail: null,
    loading: false,
    error: null,
}

const podcastShowSlice = createSlice({
    name: 'podcastShow',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getPodcastShowData.fulfilled, (state, action) => {
                state.podcastShowData = action.payload
            })
            .addCase(getPodcastShowById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPodcastShowById.fulfilled, (state, action) => {
                state.loading = false;
                state.podcastShowDetail = action.payload;
                const id = action.payload.id;

                const existingItem = state.podcastShowData.find((item) => item.id === id);
                if (existingItem) {
                    const index = state.podcastShowData.indexOf(existingItem);
                    state.podcastShowData[index] = action.payload;
                }
            })
            .addCase(getPodcastShowData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postPodcastShowData.fulfilled, (state, action) => {
                state.podcastShowData.push(action.payload)
            })
            .addCase(postPodcastShowData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putPodcastShowData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.podcastShowData.some((item, index) => {
                    if (item.id === id) {
                        state.podcastShowData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deletePodcastShowData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.podcastShowData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.podcastShowData.splice(itemIndex, 1);
                }
            })
    },
});

export const podcastShowReducer = podcastShowSlice.reducer