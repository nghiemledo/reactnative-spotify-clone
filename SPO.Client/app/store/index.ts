import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice"; // Nhập authReducer

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"], // Chỉ persist trạng thái auth (có thể thêm "player" nếu muốn)
};

// Kết hợp các reducer
const rootReducer = {
  player: playerReducer,
  auth: authReducer,
};

// Áp dụng persistReducer cho toàn bộ rootReducer
const persistedReducer = persistReducer(persistConfig, (state: any, action: any) => {
  // Tạo một reducer kết hợp thủ công để xử lý persistor
  return {
    player: playerReducer(state?.player, action),
    auth: authReducer(state?.auth, action),
  };
});

// Tạo store với persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra serializable vì AsyncStorage và redux-persist
    }),
});

// Tạo persistor để sử dụng với PersistGate
export const persistor = persistStore(store);

// Định nghĩa các type để sử dụng trong ứng dụng
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;