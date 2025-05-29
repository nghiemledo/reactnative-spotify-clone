/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_PODCAST_EPISODE, GET_PODCAST_EPISODE_BY_ID, GET_PODCAST_EPISODES, POST_PODCAST_EPISODE, PUT_PODCAST_EPISODE } from "./podcast-episode.constants";
import { PodcastEpisode } from "@/types/podcast-episode.type";

export const getPodcastEpisodeData = createAsyncThunk(GET_PODCAST_EPISODES, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/podcastEpisode`, {
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

export const getPodcastEpisodeById = createAsyncThunk(
    GET_PODCAST_EPISODE_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/podcastEpisode/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postPodcastEpisodeData = createAsyncThunk(
    POST_PODCAST_EPISODE,
    async (body: Omit<PodcastEpisode, 'id' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/podcastEpisode`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putPodcastEpisodeData = createAsyncThunk(PUT_PODCAST_EPISODE, async (body: PodcastEpisode, thunkAPI) => {
    const response = await axiosClient.put(`/podcastEpisode`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deletePodcastEpisodeData = createAsyncThunk(DELETE_PODCAST_EPISODE, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/podcastEpisode/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});