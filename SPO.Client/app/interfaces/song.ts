interface Song {
  id?: number;
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
  releaseDate?: Date;
  duration?: number; // in seconds
  AudioUrl?: string; // path to the song file
  coverImagePath?: string; // path to the cover image
}
