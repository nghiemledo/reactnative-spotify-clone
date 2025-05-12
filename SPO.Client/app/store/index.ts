import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import playerReducer from "./playerSlice";
import authReducer from "./authSlice";
import { baseRestApi } from "../services/api";

// Cấu hình Redux Persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["player", "auth"],
};

const persistedPlayerReducer = persistReducer(persistConfig, playerReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Cấu hình store
export const store = configureStore({
  reducer: {
    player: persistedPlayerReducer,
    auth: persistedAuthReducer,
    [baseRestApi.reducerPath]: baseRestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseRestApi.middleware),
});

// Tạo persistor cho Redux Persist
export const persistor = persistStore(store);

// Định nghĩa types cho Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks cho dispatch và selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
