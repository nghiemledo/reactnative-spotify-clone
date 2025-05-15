import { getAlbumData } from "@/store/album/album.actions";
import { getArtistData } from "@/store/artist/artist.actions";
import { getGenreData } from "@/store/genre/genre.actions";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";

export const useFetchSongData = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getArtistData());
        dispatch(getGenreData());
        dispatch(getAlbumData());
    }, [dispatch]);
};