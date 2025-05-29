import { PodcastEpisode } from "@/types/podcast-episode.type";
import { createSlice } from "@reduxjs/toolkit";
import { deletePodcastEpisodeData, getPodcastEpisodeById, getPodcastEpisodeData, postPodcastEpisodeData, putPodcastEpisodeData } from "./podcast-episode.actions";

interface initialStateTypes {
    podcastEpisodeData: PodcastEpisode[];
    podcastEpisodeDetail: PodcastEpisode | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    podcastEpisodeData: [],
    podcastEpisodeDetail: null,
    loading: false,
    error: null,
}

const podcastEpisodeSlice = createSlice({
    name: 'podcastEpisode',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getPodcastEpisodeData.fulfilled, (state, action) => {
                state.podcastEpisodeData = action.payload
            })
            .addCase(getPodcastEpisodeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPodcastEpisodeById.fulfilled, (state, action) => {
                state.loading = false;
                state.podcastEpisodeDetail = action.payload;
                const id = action.payload.id;
                const existingItem = state.podcastEpisodeData.find((item) => item.id === id);
                if (existingItem) {
                    const index = state.podcastEpisodeData.indexOf(existingItem);
                    state.podcastEpisodeData[index] = action.payload;
                }
            })
            .addCase(getPodcastEpisodeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postPodcastEpisodeData.fulfilled, (state, action) => {
                state.podcastEpisodeData.push(action.payload)
            })
            .addCase(postPodcastEpisodeData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putPodcastEpisodeData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.podcastEpisodeData.some((item, index) => {
                    if (item.id === id) {
                        state.podcastEpisodeData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deletePodcastEpisodeData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.podcastEpisodeData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.podcastEpisodeData.splice(itemIndex, 1);
                }
            })
    },
});

export const podcastEpisodeReducer = podcastEpisodeSlice.reducer