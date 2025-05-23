/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_GENRE, GET_GENRE_BY_ID, GET_GENRES, POST_GENRE, PUT_GENRE } from "./genre.constants";
import { Genre } from "@/types/genre.type";

export const getGenreData = createAsyncThunk(GET_GENRES, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/genre`, {
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

export const getGenreById = createAsyncThunk(
    GET_GENRE_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/genre/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postGenreData = createAsyncThunk(
    POST_GENRE,
    async (body: Omit<Genre, 'id' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/genre`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putGenreData = createAsyncThunk(PUT_GENRE, async (body: Genre, thunkAPI) => {
    const response = await axiosClient.put(`/genre`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deleteGenreData = createAsyncThunk(DELETE_GENRE, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/genre/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});