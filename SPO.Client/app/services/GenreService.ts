import { baseRestApi } from "./api";
import { ApiResponse } from "../types/apiResponse";
import { Genre } from "../types/genre";

const entity = "genre";
const GENRE_TAG = "Genre";

export const genreServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query<{ data: Genre[]; message: string }, void>({
      query: () => ({
        url: `${entity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Genre[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: GENRE_TAG, id: "LIST" }],
    }),
    getGenreById: builder.query<{ data: Genre; message: string }, string>({
      query: (id = "") => ({
        url: `${entity}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Genre>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, id) => [{ type: GENRE_TAG, id }],
    }),
  }),
});
export const {
  useGetGenresQuery,
  useLazyGetGenresQuery,
  useGetGenreByIdQuery,
  useLazyGetGenreByIdQuery,
  usePrefetch: genrePrefetch,
} = genreServices;
