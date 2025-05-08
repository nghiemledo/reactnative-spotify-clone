import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice"; 
import songReducer from "./songSlice";


// Cấu hình persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"], // Chỉ persist trạng thái auth (có thể thêm "player" nếu muốn)
};


const persistedReducer = persistReducer(persistConfig, (state: any, action: any) => {
  return {
    player: playerReducer(state?.player, action),
    auth: authReducer(state?.auth, action),
    songs: songReducer(state?.songs, action),
  };
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra serializable vì AsyncStorage và redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;