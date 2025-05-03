export interface Song {
    id: string;
    title: string;
    slug: string;
    artist: string;
    album: string;
    duration: string;
    releaseDate: string;
    genre: string;
    status: "Published" | "Draft";
    createdAt?: string,
    updatedAt?: string
};