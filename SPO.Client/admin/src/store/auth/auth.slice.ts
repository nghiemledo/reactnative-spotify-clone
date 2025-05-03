/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '@/configs/api.config';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    dateofBirth?: string;
    gender?: boolean;
    address?: string;
    urlAvatar?: string;
    email: string;
    emailConfirmed?: boolean;
    createdAt: string;
    updatedAt?: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loginError: string | null;
    registerError: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('token'),
    loginError: null,
    registerError: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/user/login', {
                email: data.email,
                password: data.password,
            });
            const resData = response.data;

            if (resData.status) {
                localStorage.setItem('token', resData.token);
                localStorage.setItem('refreshToken', resData.refreshToken);
                localStorage.setItem('user', JSON.stringify({ ...resData.user, role: resData.role }));

                return {
                    user: { ...resData.user, role: resData.role },
                    token: resData.token,
                    refreshToken: resData.refreshToken,
                };
            } else {
                return rejectWithValue('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu');
            }
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Máy chủ đang bận. Vui lòng thử lại sau');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            await axiosClient.post('/user/register', {
                email: data.email,
                password: data.password,
            });
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'Máy chủ đang bận. Vui lòng thử lại sau');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.loginError = null;
            state.registerError = null;
        },
        loadUserFromStorage(state) {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');

            if (storedUser && token && refreshToken) {
                state.user = JSON.parse(storedUser);
                state.token = token;
                state.refreshToken = refreshToken;
                state.isAuthenticated = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload?.user || null;
                state.token = action.payload?.token || null;
                state.refreshToken = action.payload?.refreshToken || null;
                state.isAuthenticated = true;
                state.loginError = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginError = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(register.fulfilled, (state) => {
                state.registerError = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.registerError = action.payload as string;
            });
    },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export const authReducer = authSlice.reducer;