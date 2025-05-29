export interface UserCredential {
  email: string;
  password: string;
  lastName?: string;
  firstName?: string;
  phoneNumber?: string;
}

export interface UserInfo {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  dateofBirth?: string;
  gender?: boolean;
  email?: string;
  phoneNumber?: string;
  address?: string;
  urlAvatar?: string;
}

export interface UpdateUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  urlAvatar: string
  email: string;
}

export interface FollowArtistRequest {
  ArtistId: string;
  UserId: string;
}

export interface FollowPodcastRequest {
  ShowId: string;
  UserId: string;
}