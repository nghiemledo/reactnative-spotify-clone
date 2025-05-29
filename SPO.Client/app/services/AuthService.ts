import { baseRestApi } from "./api";
import { setCredentials, logout } from "../store/authSlice";
import { FollowArtistRequest, FollowPodcastRequest, UpdateUserProfile, UserCredential, UserInfo } from "../types/user";
import { useAppSelector, RootState } from "../store";
import { ApiResponse } from "../types/apiResponse";

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: any;
  status: boolean;
  role: string;
}

const entity = "user";

export const authServices = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, UserCredential>({
      query: (credentials) => ({
        url: `${entity}/login`,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              token: {
                accessToken: data.token,
                refreshToken: data.refreshToken,
              },
              user: data.user,
              role: data.role,
            } as any)
          );
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    register: builder.mutation<ApiResponse<UserInfo>, UserCredential>({
      query: (credentials) => ({
        url: `${entity}/register`,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Register failed:", error);
        }
      },
    }),
    refreshToken: builder.mutation<ApiResponse<AuthResponse>, void>({
      query: () => ({
        url: `${entity}/refresh`,
        method: "POST",
        body: {
          refresh: useAppSelector(
            (state: RootState) => state.auth.token?.refreshToken
          ),
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              token: {
                accessToken: data.data.token,
                refreshToken: data.data.refreshToken,
              },
              user: data.data.user,
              role: data.data.role,
            } as any)
          );
        } catch (error) {
          console.error("Refresh token failed:", error);
        }
      },
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: `${entity}/logout`,
        method: "POST",
        body: {
          refreshToken: useAppSelector(
            (state: RootState) => state.auth.token?.refreshToken
          ),
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
    getUserById: builder.query<ApiResponse<UserInfo>, string>({
      query: (id) => ({
        url: `${entity}/${id}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Get user by ID failed:", error);
        }
      },
    }),

    updateUserProfile: builder.mutation<ApiResponse<UserInfo>, UpdateUserProfile>({
      query: (user) => ({
        url: `${entity}`,
        method: "PUT",
        body: user,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {          
          await queryFulfilled;
        } catch (error) {
          console.error("Update user profile failed:", error);
        }
      },
    }),
    followArtist: builder.mutation<ApiResponse<null>, FollowArtistRequest>({
      query: (request) => ({
        url: `${entity}/follow-artist`,
        method: "POST",
        body: request,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Follow artist failed:", error);
        }
      },
    }),
    followPodcast: builder.mutation<ApiResponse<null>, FollowPodcastRequest>({
      query: (request) => ({
        url: `${entity}/follow-podcast`,
        method: "POST",
        body: request,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Follow Podcast failed:", error);
        }
      },
    }),
    // getFollowedArtists: builder.query<ApiResponse<FollowedArtistResponse[]>, string>({
    //   query: (userId) => ({
    //     url: `${entity}/followed-artists`,
    //     method: "GET",
    //     params: { userId },
    //   }),
    //   async onQueryStarted(_, { queryFulfilled }) {
    //     try {
    //       await queryFulfilled;
    //     } catch (error) {
    //       console.error("Get followed artists failed:", error);
    //     }
    //   },
    // }),
  }),
  overrideExisting: true, 
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
  useFollowArtistMutation,
  useFollowPodcastMutation,
} = authServices;