import { baseRestApi } from "./api";
import { setCredentials, logout } from "../store/authSlice";
import { UserCredential, UserInfo } from "../types/user";
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authServices;
