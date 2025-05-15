import { getArtistData } from "@/store/artist/artist.actions";
import { getGenreData } from "@/store/genre/genre.actions";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";

export const useFetchAlbumData = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getArtistData());
        dispatch(getGenreData());
    }, [dispatch]);
};