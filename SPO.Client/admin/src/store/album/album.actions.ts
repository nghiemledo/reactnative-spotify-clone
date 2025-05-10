/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_ALBUM, GET_ALBUM_BY_ID, GET_ALBUMS, POST_ALBUM, PUT_ALBUM } from "./album.constants";
import { Album } from "@/types/album.type";

export const getAlbumData = createAsyncThunk(GET_ALBUMS, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/album`, {
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

export const getAlbumById = createAsyncThunk(
    GET_ALBUM_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/album/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postAlbumData = createAsyncThunk(
    POST_ALBUM,
    async (body: Omit<Album, 'id' | 'releaseDate' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/album`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putAlbumData = createAsyncThunk(PUT_ALBUM, async (body: Album, thunkAPI) => {
    const response = await axiosClient.put(`/album`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deleteAlbumData = createAsyncThunk(DELETE_ALBUM, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/album/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});