import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { songReducer } from "./song/song.slice";
import { genreReducer } from "./genre/genre.slice";
import { artistReducer } from "./artist/artist.slice";
import { albumReducer } from "./album/album.slice";
import { userReducer } from "./user/user.slice";
import { playlistReducer } from "./playlist/playlist.slice";
import { podcastCategoryReducer } from "./podcast-category/podcast-category.slice";
import { podcastShowReducer } from "./podcast-show/podcast-show.slice";
import { podcastEpisodeReducer } from "./podcast-episode/podcast-episode.slice";

export const store = configureStore({
    reducer: {
        song: songReducer,
        genre: genreReducer,
        artist: artistReducer,
        album: albumReducer,
        user: userReducer,
        playlist: playlistReducer,
        podcastCategory: podcastCategoryReducer,
        podcastShow: podcastShowReducer,
        podcastEpisode: podcastEpisodeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;