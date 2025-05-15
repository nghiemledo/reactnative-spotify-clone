import { PodcastCategory } from "@/types/podcast-category.type";
import { createSlice } from "@reduxjs/toolkit";
import { deletePodcastCategoryData, getPodcastCategoryById, getPodcastCategoryData, postPodcastCategoryData, putPodcastCategoryData } from "./podcast-category.actions";

interface initialStateTypes {
    podcastCategoryData: PodcastCategory[];
    podcastCategoryDetail: PodcastCategory | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    podcastCategoryData: [],
    podcastCategoryDetail: null,
    loading: false,
    error: null,
}

const podcastCategorySlice = createSlice({
    name: 'podcastCategory',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getPodcastCategoryData.fulfilled, (state, action) => {
                state.podcastCategoryData = action.payload
            })
            .addCase(getPodcastCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPodcastCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.podcastCategoryDetail = action.payload;
                const id = action.payload.id;

                const existingItem = state.podcastCategoryData.find((item) => item.id === id);
                if (existingItem) {
                    const index = state.podcastCategoryData.indexOf(existingItem);
                    state.podcastCategoryData[index] = action.payload;
                }
            })
            .addCase(getPodcastCategoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postPodcastCategoryData.fulfilled, (state, action) => {
                state.podcastCategoryData.push(action.payload)
            })
            .addCase(putPodcastCategoryData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putPodcastCategoryData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.podcastCategoryData.some((item, index) => {
                    if (item.id === id) {
                        state.podcastCategoryData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deletePodcastCategoryData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.podcastCategoryData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.podcastCategoryData.splice(itemIndex, 1);
                }
            })
    },
});

export const podcastCategoryReducer = podcastCategorySlice.reducer