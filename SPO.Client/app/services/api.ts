import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setCredentials, logout, setToken } from "../store/authSlice";

const BASE_URL = "https://ituda.id.vn/api/";

// Cấu hình baseQuery với token xác thực
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.token?.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// Xử lý làm mới token khi nhận lỗi 401
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.token?.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "auth/refresh",
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newTokens = refreshResult.data as {
          token: string;
          refreshToken: string;
        };
        api.dispatch(
          setToken({
            token: {
              accessToken: newTokens.token,
              refreshToken: newTokens.refreshToken,
            },
          } as any)
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// Tạo API slice với RTK Query
export const baseRestApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Song", "Album", "Artist", "Genre", "PodcastShow", "PodcastEpisode", "PodcastCategory"],
  endpoints: () => ({}),
});
