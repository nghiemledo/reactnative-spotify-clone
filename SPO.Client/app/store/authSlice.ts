import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../types/user";

interface AuthState {
  token: { accessToken: string; refreshToken: string } | null;
  user: UserInfo | null;
  role: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = {
        accessToken: action.payload.token?.accessToken ?? " ",
        refreshToken: action.payload.token?.refreshToken ?? "",
      };
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    setUser: (state, action: PayloadAction<{user: UserInfo}>) => {
      state.user = action.payload.user;
    },
    setToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.token = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
    },
  },
});

export const { setCredentials,setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
