import { baseRestApi } from "./api";
import { ApiResponse } from "../types/apiResponse";
import { Album } from "../types/album";

const entity = "album";
const ALBUM_TAG = "Album";

export const albumServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlbums: builder.query<{ data: Album[]; message: string }, void>({
      query: () => ({
        url: `${entity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Album[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: ALBUM_TAG, id: "LIST" }],
    }),
    getAlbumById: builder.query<{ data: Album; message: string }, string>({
      query: (id = "") => ({
        url: `${entity}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Album>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, id) => [{ type: ALBUM_TAG, id }],
    }),
  }),
});
export const {
  useGetAlbumsQuery,
  useLazyGetAlbumsQuery,
  useGetAlbumByIdQuery,
  useLazyGetAlbumByIdQuery,
  usePrefetch: albumPrefetch,
} = albumServices;
