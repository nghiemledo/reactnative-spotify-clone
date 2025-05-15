import { baseRestApi } from "./api";
import { ApiResponse } from "../types/apiResponse";
import { Artist } from "../types/artist";

const entity = "artist";
const Artist_TAG = "Artist";

export const artistServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query<{ data: Artist[]; message: string }, void>({
      query: () => ({
        url: `${entity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Artist[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: Artist_TAG, id: "LIST" }],
    }),
    getArtistById: builder.query<{ data: Artist; message: string }, string>({
      query: (id = "") => ({
        url: `${entity}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Artist>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, id) => [{ type: Artist_TAG, id }],
    }),
  }),
});
export const {
  useGetArtistsQuery,
  useLazyGetArtistsQuery,
  useGetArtistByIdQuery,
  useLazyGetArtistByIdQuery,
  usePrefetch: artistPrefetch,
} = artistServices;
