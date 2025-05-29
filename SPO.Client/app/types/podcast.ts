export interface PodcastCategory {
  name: string;
  description: string;
  id: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface PodcastShow {
  title: string;
  creator: string;
  description: string;
  coverImage: string;
  categoryId: string;
  id: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface PodcastEpisode {
  title: string;
  description: string;
  duration: number;
  audioUrl: string;
  releaseDate: string;
  coverImage?: string;
  showId: string;
  id: string;
  createdAt: string;
  updatedAt: string | null;
}