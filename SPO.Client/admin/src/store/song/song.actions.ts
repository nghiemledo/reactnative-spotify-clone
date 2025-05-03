/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_SONGS, DELETE_SONG, GET_SONG_BY_ID, GET_SONG_BY_SLUG, POST_SONG, PUT_SONG } from "./song.constants";
import { Song } from "@/types/song.type";

export const getSongData = createAsyncThunk(GET_SONGS, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/songs`, {
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

export const getSongById = createAsyncThunk(
    GET_SONG_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/songs/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const getSongBySlug = createAsyncThunk(
    GET_SONG_BY_SLUG,
    async (slug: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/songs/${slug}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postSongData = createAsyncThunk(
    POST_SONG,
    async (body: Omit<Song, 'id' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/songs`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putSongData = createAsyncThunk(PUT_SONG, async (body: Song, thunkAPI) => {
    const response = await axiosClient.put(`/songs`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deleteSongData = createAsyncThunk(DELETE_SONG, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/song/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});