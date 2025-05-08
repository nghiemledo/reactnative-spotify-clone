import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRODUCTION_API } from "../api/axiosClient";

// Định nghĩa kiểu dữ liệu cho bài hát từ API response
interface Song {
  id: string;
  title: string;
  coverImage: string;
  genreId: string;
  duration: number;
  counter: number;
  audioUrl: string;
  artistId: string;
  albumId: string;
  createdAt: string;
  updatedAt: string | null;
}

// Định nghĩa cấu trúc response của API
interface SongResponse {
  data: Song[];
  messages: string[];
  status: boolean;
}

// Định nghĩa trạng thái cho songSlice
interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

// Trạng thái ban đầu
const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
};

// Tạo thunk để gọi API lấy danh sách bài hát
export const fetchSongs = createAsyncThunk<Song[], void>(
  "songs/fetchSongs",
  async (_, { rejectWithValue }) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      const response = await fetch(`${PRODUCTION_API}/song`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Không thể tải danh sách bài hát.");
      }

      const data: SongResponse = await response.json();
      return data.data; 
    } catch (error: any) {
      return rejectWithValue(error.message || "Đã có lỗi xảy ra khi tải bài hát.");
    }
  }
);

// Tạo songSlice
const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.songs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Xuất reducer để thêm vào store
export default songSlice.reducer;