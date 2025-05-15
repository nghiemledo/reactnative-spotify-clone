/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_PODCAST_SHOW, GET_PODCAST_SHOW_BY_ID, GET_PODCAST_SHOWS, POST_PODCAST_SHOW, PUT_PODCAST_SHOW } from "./podcast-show.constants";
import { PodcastShow } from "@/types/podcast-show.type";

export const getPodcastShowData = createAsyncThunk(GET_PODCAST_SHOWS, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/podcastShow`, {
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

export const getPodcastShowById = createAsyncThunk(
    GET_PODCAST_SHOW_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/podcastShow/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postPodcastShowData = createAsyncThunk(
    POST_PODCAST_SHOW,
    async (body: Omit<PodcastShow, 'id' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/podcastShow`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putPodcastShowData = createAsyncThunk(PUT_PODCAST_SHOW, async (body: PodcastShow, thunkAPI) => {
    const response = await axiosClient.put(`/podcastShow`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deletePodcastShowData = createAsyncThunk(DELETE_PODCAST_SHOW, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/podcastShow/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});