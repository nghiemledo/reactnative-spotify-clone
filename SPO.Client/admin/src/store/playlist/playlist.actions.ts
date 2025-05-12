/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_PLAYLIST, GET_PLAYLIST_BY_ID, GET_PLAYLISTS, POST_PLAYLIST, PUT_PLAYLIST } from "./playlist.constants";
import { Playlist } from "@/types/playlist.type";

export const getPlaylistData = createAsyncThunk(GET_PLAYLISTS, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/playlist`, {
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

export const getPlaylistById = createAsyncThunk(
    GET_PLAYLIST_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/playlist/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postPlaylistData = createAsyncThunk(
    POST_PLAYLIST,
    async (body: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/playlist`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putPlaylistData = createAsyncThunk(PUT_PLAYLIST, async (body: Playlist, thunkAPI) => {
    const response = await axiosClient.put(`/playlist`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deletePlaylistData = createAsyncThunk(DELETE_PLAYLIST, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/playlist/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});