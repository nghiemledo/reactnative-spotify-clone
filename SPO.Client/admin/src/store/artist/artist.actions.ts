/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_ARTIST, GET_ARTIST_BY_ID, GET_ARTISTS, POST_ARTIST, PUT_ARTIST } from "./artist.constants";
import { Artist } from "@/types/artist.type";

export const getArtistData = createAsyncThunk(GET_ARTISTS, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/artist`, {
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

export const getArtistById = createAsyncThunk(
    GET_ARTIST_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/artist/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postArtistData = createAsyncThunk(
    POST_ARTIST,
    async (body: Omit<Artist, 'id' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/artist`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putArtistData = createAsyncThunk(PUT_ARTIST, async (body: Artist, thunkAPI) => {
    const response = await axiosClient.put(`/artist`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deleteArtistData = createAsyncThunk(DELETE_ARTIST, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/artist/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});