import { baseRestApi } from "./api";
import { ApiResponse } from "../types/apiResponse";
import { Song } from "../types/song";

const entity = "song";
const SONG_TAG = "Song";

export const songServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getSongs: builder.query<{ data: Song[]; message: string }, void>({
      query: () => ({
        url: `${entity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Song[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: SONG_TAG, id: "LIST" }],
    }),
    getSongById: builder.query<{ data: Song; message: string }, string>({
      query: (id = "") => ({
        url: `${entity}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Song>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, id) => [{ type: SONG_TAG, id }],
    }),
    getTrendingSongs: builder.query<{ data: Song[]; message: string }, void>({
      query: () => ({
        url: `${entity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Song[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: SONG_TAG, id: "LIST" }],
    }),
  }),

});
export const {
  useGetSongsQuery,
  useLazyGetSongsQuery,
  useGetSongByIdQuery,
  useLazyGetSongByIdQuery,
  useGetTrendingSongsQuery,
  useLazyGetTrendingSongsQuery,
  usePrefetch: songPrefetch,
} = songServices;
