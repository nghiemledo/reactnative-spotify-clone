/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_PODCAST_CATEGORY, GET_PODCAST_CATEGORIES, GET_PODCAST_CATEGORY_BY_ID, POST_PODCAST_CATEGORY, PUT_PODCAST_CATEGORY } from "./podcast-category.constants";
import { PodcastCategory } from "@/types/podcast-category.type";

export const getPodcastCategoryData = createAsyncThunk(GET_PODCAST_CATEGORIES, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/podcastCategory`, {
            signal: signal,
        });
        if (response.data.status === true) {
            return response.data.data
        }
        return rejectWithValue(response.data);
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Unexpected error occurred');
    }
});

export const getPodcastCategoryById = createAsyncThunk(
    GET_PODCAST_CATEGORY_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/podcastCategory/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postPodcastCategoryData = createAsyncThunk(
    POST_PODCAST_CATEGORY,
    async (body: Omit<PodcastCategory, 'id' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/podcastCategory`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putPodcastCategoryData = createAsyncThunk(PUT_PODCAST_CATEGORY, async (body: PodcastCategory, thunkAPI) => {
    const response = await axiosClient.put(`/podcastCategory`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deletePodcastCategoryData = createAsyncThunk(DELETE_PODCAST_CATEGORY, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/podcastCategory/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});