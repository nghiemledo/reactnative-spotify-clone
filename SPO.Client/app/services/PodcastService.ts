import { baseRestApi } from "./api";
import { ApiResponse } from "../types/apiResponse";
import { PodcastCategory, PodcastEpisode, PodcastShow } from "../types/podcast";

// Podcast Category Service
const categoryEntity = "podcastCategory";
const PODCAST_CATEGORY_TAG = "PodcastCategory";

export const podcastCategoryServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getPodcastCategories: builder.query<{ data: PodcastCategory[]; message: string }, void>({
      query: () => ({
        url: `${categoryEntity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PodcastCategory[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: PODCAST_CATEGORY_TAG, id: "LIST" }],
    }),
    getPodcastCategoryById: builder.query<{ data: PodcastCategory; message: string }, string>({
      query: (id = "") => ({
        url: `${categoryEntity}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PodcastCategory>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, id) => [{ type: PODCAST_CATEGORY_TAG, id }],
    }),
  }),
});

// Podcast Show Service
const showEntity = "podcastShow";
const PODCAST_SHOW_TAG = "PodcastShow";

export const podcastShowServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getPodcastShows: builder.query<{ data: PodcastShow[]; message: string }, void>({
      query: () => ({
        url: `${showEntity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PodcastShow[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: PODCAST_SHOW_TAG, id: "LIST" }],
    }),
    getPodcastShowById: builder.query<{ data: PodcastShow; message: string }, string>({
      query: (id = "") => ({
        url: `${showEntity}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PodcastShow>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, id) => [{ type: PODCAST_SHOW_TAG, id }],
    }),
    getPodcastShowsByCategory: builder.query<{ data: PodcastShow[]; message: string }, string>({
      query: (categoryId = "") => ({
        url: `${showEntity}?categoryId=${categoryId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PodcastShow[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, categoryId) => [
        { type: PODCAST_SHOW_TAG, id: `category-${categoryId}` }
      ],
    }),
  }),
});

// Podcast Episode Service
const episodeEntity = "podcastEpisode";
const PODCAST_EPISODE_TAG = "PodcastEpisode";

export const podcastEpisodeServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getPodcastEpisodes: builder.query<{ data: PodcastEpisode[]; message: string }, void>({
      query: () => ({
        url: `${episodeEntity}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PodcastEpisode[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: [{ type: PODCAST_EPISODE_TAG, id: "LIST" }],
    }),
    getPodcastEpisodeById: builder.query<{ data: PodcastEpisode; message: string }, string>({
      query: (id = "") => ({
        url: `${episodeEntity}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PodcastEpisode>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, id) => [{ type: PODCAST_EPISODE_TAG, id }],
    }),
    getPodcastEpisodesByShow: builder.query<{ data: PodcastEpisode[]; message: string }, string>({
      query: (showId = "") => ({
        url: `${episodeEntity}?showId=${showId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PodcastEpisode[]>) => ({
        data: response.data,
        message: response.message,
      }),
      providesTags: (result, error, showId) => [
        { type: PODCAST_EPISODE_TAG, id: `show-${showId}` }
      ],
    }),
  }),
});

// Export hooks cho Podcast Categories
export const {
  useGetPodcastCategoriesQuery,
  useLazyGetPodcastCategoriesQuery,
  useGetPodcastCategoryByIdQuery,
  useLazyGetPodcastCategoryByIdQuery,
  usePrefetch: podcastCategoryPrefetch,
} = podcastCategoryServices;

// Export hooks cho Podcast Shows
export const {
  useGetPodcastShowsQuery,
  useLazyGetPodcastShowsQuery,
  useGetPodcastShowByIdQuery,
  useLazyGetPodcastShowByIdQuery,
  useGetPodcastShowsByCategoryQuery,
  useLazyGetPodcastShowsByCategoryQuery,
  usePrefetch: podcastShowPrefetch,
} = podcastShowServices;

// Export hooks cho Podcast Episodes
export const {
  useGetPodcastEpisodesQuery,
  useLazyGetPodcastEpisodesQuery,
  useGetPodcastEpisodeByIdQuery,
  useLazyGetPodcastEpisodeByIdQuery,
  useGetPodcastEpisodesByShowQuery,
  useLazyGetPodcastEpisodesByShowQuery,
  usePrefetch: podcastEpisodePrefetch,
} = podcastEpisodeServices;