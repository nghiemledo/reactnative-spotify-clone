export interface Song {
    id: string;
    title: string;
    genreId: string;
    duration: number;
    audioUrl: string;
    artistId: string;
    albumId: string;
    createdAt?: string,
    updatedAt?: string
};