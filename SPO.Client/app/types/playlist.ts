export interface Playlist {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  userId: string;
  createdAt: string;
  isPublic?: boolean;
}