/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_USER, GET_USER_BY_ID, GET_USERS, PATCH_USER_LOCK_OUT, POST_USER, PUT_USER } from "./user.constants";
import { User } from "@/types/user.type";

export const getUserData = createAsyncThunk(GET_USERS, async (_, { signal, rejectWithValue }) => {
    try {
        const response = await axiosClient.get(`/user`, {
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

export const getUserById = createAsyncThunk(
    GET_USER_BY_ID,
    async (id: string, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.get(`/user/${id}`, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const postUserData = createAsyncThunk(
    POST_USER,
    async (body: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, { signal, rejectWithValue }) => {
        try {
            const response = await axiosClient.post(`/user`, body, { signal });
            if (response.data.status === true) {
                return response.data.data;
            }
            return rejectWithValue(response.data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Unexpected error occurred');
        }
    }
);

export const putUserData = createAsyncThunk(PUT_USER, async (body: User, thunkAPI) => {
    const response = await axiosClient.put(`/user`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const patchUserLockOut = createAsyncThunk(PATCH_USER_LOCK_OUT, async (body: { id: string, lockOutEnabled: boolean }, thunkAPI) => {
    const response = await axiosClient.patch(`/user`, body, {
        signal: thunkAPI.signal
    });
    return response.data.data
});

export const deleteUserData = createAsyncThunk(DELETE_USER, async (id: string, thunkAPI) => {
    const response = await axiosClient.delete(`/user/${id}`, {
        signal: thunkAPI.signal
    });
    return response.data.message
});