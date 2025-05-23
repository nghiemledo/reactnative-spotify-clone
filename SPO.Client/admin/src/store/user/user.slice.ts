import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/user.type";
import { deleteUserData, getUserById, getUserData, patchUserLockOut, postUserData, putUserData } from "./user.actions";

interface initialStateTypes {
    userData: User[];
    userDetail: User | null;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateTypes = {
    userData: [],
    userDetail: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.userData = action.payload
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail = action.payload;
                const id = action.payload.id;
                const existingGenre = state.userData.find((item) => item.id === id);
                if (existingGenre) {
                    const index = state.userData.indexOf(existingGenre);
                    state.userData[index] = action.payload;
                }
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(postUserData.fulfilled, (state, action) => {
                state.userData.push(action.payload)
            })
            .addCase(postUserData.rejected, (_, action) => {
                console.error('Post failed:', action.payload);
            })
            .addCase(putUserData.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.userData.some((item, index) => {
                    if (item.id === id) {
                        state.userData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(patchUserLockOut.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.userData.some((item, index) => {
                    if (item.id === id) {
                        state.userData[index] = action.payload;
                        return true;
                    }
                    return false;
                })
            })
            .addCase(deleteUserData.fulfilled, (state, action) => {
                const id = action.meta.arg;
                const itemIndex = state.userData.findIndex((i) => i.id === id);
                if (itemIndex !== -1) {
                    state.userData.splice(itemIndex, 1);
                }
            })
    },
});

export const userReducer = userSlice.reducer