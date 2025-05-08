import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRODUCTION_API } from "../api/axiosClient";

interface AuthState {
  user: { email: string; firstname: string; lastname: string } | null;
  token: string | null;
  refreshToken: string | null; 
  role: string | null; 
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

interface RegisterPayload {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// Định nghĩa kiểu dữ liệu cho body của API /user/login
interface LoginPayload {
  email: string;
  password: string;
}

// Định nghĩa kiểu dữ liệu trả về từ API /user/login
interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: boolean;
  role: string;
}

// Tạo thunk để gọi API đăng ký
export const register = createAsyncThunk<void, RegisterPayload>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${PRODUCTION_API}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Đăng ký thất bại. Vui lòng kiểm tra thông tin.");
      }

    } catch (error: any) {
      return rejectWithValue(error.message || "Đã có lỗi xảy ra khi đăng ký.");
    }
  }
);

// Tạo thunk để gọi API đăng nhập
export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${PRODUCTION_API}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại. Vui lòng kiểm tra email hoặc mật khẩu.");
      }

      const data: LoginResponse = await response.json();
      if (!data.status) {
        throw new Error("Đăng nhập thất bại. Trạng thái không hợp lệ.");
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Đã có lỗi xảy ra khi đăng nhập.");
    }
  }
);

// Tạo auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Hành động đăng nhập thủ công (nếu cần)
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    // Hành động đăng xuất
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    // Hành động đặt lỗi
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          email: action.payload.user.email,
          firstname: action.payload.user.firstName,
          lastname: action.payload.user.lastName,
        };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { login: loginAction, logout, setError } = authSlice.actions;

// Xuất reducer để thêm vào store
export default authSlice.reducer;