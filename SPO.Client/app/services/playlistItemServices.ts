import { baseRestApi } from "./api";
import { ApiResponse } from "../types/apiResponse";
import { Song } from "../types/song";

export interface PlaylistItem {
  id: string;
  playlistId: string;
  songId: string;
  episodeId?: string;
  createdAt?: string;
}

interface PlaylistItemPayload {
  playlistId: string;
  songId: string;
  episodeId?: string;
}

const entity = "playlistItem";
const PLAYLIST_ITEM_TAG = "PlaylistItem";

export const playlistItemServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    addPlaylistItem: builder.mutation<ApiResponse<PlaylistItem>, PlaylistItemPayload>({
      query: (payload) => {
        if (!payload.playlistId || !payload.songId) {
          throw new Error("Playlist ID and Song ID are required.");
        }
        return {
          url: `${entity}`,
          method: "POST",
          body: payload,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Song added to playlist successfully:", data);
        } catch (error) {
          console.error("Failed to add song to playlist:", error);
        }
      },
      invalidatesTags: [{ type: PLAYLIST_ITEM_TAG, id: "LIST" }],
    }),
    getPlaylistItems: builder.query<{ data: PlaylistItem[]; message: string }, { playlistId?: string }>({
      query: ({ playlistId }) => ({
        url: `/${entity}`,
        method: "GET",
        params: playlistId ? { playlistId } : {},
      }),
      transformResponse: (response: ApiResponse<PlaylistItem[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: PLAYLIST_ITEM_TAG, id: "LIST" }],
    }),
    deletePlaylistItem: builder.mutation<ApiResponse<null>, string>({
      query: (id) => {
        if (!id) {
          throw new Error("Playlist Item ID is required.");
        }
        return {
          url: `/${entity}/${id}`,
          method: "DELETE",
        };
      },
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(`Playlist item with ID ${id} deleted successfully:`, data);
        } catch (error) {
          console.error(`Failed to delete playlist item with ID ${id}:`, error);
        }
      },
      invalidatesTags: [{ type: PLAYLIST_ITEM_TAG, id: "LIST" }],
    }),
  }),
});

export const {
  useAddPlaylistItemMutation,
  useGetPlaylistItemsQuery,
  useLazyGetPlaylistItemsQuery,
  useDeletePlaylistItemMutation,
  usePrefetch: playlistItemPrefetch,
} = playlistItemServices;