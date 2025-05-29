import { baseRestApi } from "./api";
import { ApiResponse } from "../types/apiResponse";

// Define Playlist type
export interface Playlist {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  userId: string;
  createdAt: string;
  isPublic?: boolean; // Added to match previous schema
}

interface PlaylistPayload {
  id?: string; // Added for update payload
  title: string;
  description: string | null;
  coverImage: string | null;
  userId: string;
  isPublic?: boolean; // Added to match previous schema
}

const entity = "playlist";
const PLAYLIST_TAG = "Playlist";

export const playlistServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlaylist: builder.mutation<ApiResponse<Playlist>, { title: string; userId: string }>({
      query: (payload) => {
        if (!payload.userId) {
          throw new Error("User ID is not available. Please log in.");
        }
        return {
          url: `${entity}`,
          method: "POST",
          body: {
            title: payload.title,
            description: null,
            coverImage: null,
            userId: payload.userId,
          } as PlaylistPayload,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Playlist created successfully:", data);
        } catch (error) {
          console.error("Failed to create playlist:", error);
        }
      },
      invalidatesTags: [{ type: PLAYLIST_TAG, id: "LIST" }],
    }),
    getPlaylists: builder.query<{ data: Playlist[]; message: string }, void>({
      query: () => ({
        url: `${entity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Playlist[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: PLAYLIST_TAG, id: "LIST" }],
    }),
    getPlaylistById: builder.query<{ data: Playlist; message: string }, string>({
      query: (id = "") => ({
        url: `${entity}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Playlist>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, id) => [{ type: PLAYLIST_TAG, id }],
    }),
    getPlaylistsByUserId: builder.query<{ data: Playlist[]; message: string }, string>({
      query: (userId = "") => {
        if (!userId) {
          throw new Error("User ID is required to fetch playlists.");
        }
        return {
          url: `user/playlists`,
          method: "GET",
          params: { userId },
        };
      },
      transformResponse: (response: ApiResponse<Playlist[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: PLAYLIST_TAG, id: "LIST" }],
    }),
    updatePlaylist: builder.mutation<
      ApiResponse<Playlist>,
      { id: string; title?: string; description?: string | null; coverImage?: string | null; userId: string; isPublic?: boolean }
    >({
      query: (payload) => ({
        url: `${entity}`,
        method: "PUT",
        body: {
          id: payload.id,
          title: payload.title,
          description: payload.description || null,
          coverImage: payload.coverImage || null,
          userId: payload.userId,
          isPublic: payload.isPublic,
        } as PlaylistPayload,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Playlist updated successfully:", data);
        } catch (error) {
          console.error("Failed to update playlist:", error);
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: PLAYLIST_TAG, id },
        { type: PLAYLIST_TAG, id: "LIST" },
      ],
    }),
    deletePlaylist: builder.mutation<ApiResponse<null>, { playlistId: string }>({
      query: (payload) => {
        if (!payload.playlistId) {
          throw new Error("Playlist ID is required to delete a playlist.");
        }
        return {
          url: `${entity}/${payload.playlistId}`,
          method: "DELETE",
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Playlist deleted successfully:", data);
        } catch (error) {
          console.error("Failed to delete playlist:", error);
        }
      },
      invalidatesTags: (result, error, { playlistId }) => [
        { type: PLAYLIST_TAG, playlistId },
        { type: PLAYLIST_TAG, id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePlaylistMutation,
  useGetPlaylistsQuery,
  useLazyGetPlaylistsQuery,
  useGetPlaylistByIdQuery,
  useLazyGetPlaylistByIdQuery,
  useGetPlaylistsByUserIdQuery,
  useLazyGetPlaylistsByUserIdQuery,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  usePrefetch: playlistPrefetch,
} = playlistServices;