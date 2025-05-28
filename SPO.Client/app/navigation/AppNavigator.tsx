import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SplashNavigator from "./SplashNavigator";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";
import PlayingScreen from "../screens/PlayingScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import { PlaylistsScreen } from "../screens/playlists/PlaylistsScreen";
import { EditProfileScreen } from "../screens/profile/EditProfileScreen";
import AlbumScreen from "../screens/AlbumScreen";
import { Artist } from "../../admin/src/types/artist.type";
import ArtistDetailScreen from "../screens/artist/ArtistDetailScreen";
import { Song } from "../types/song";
// import ShareSongScreen from "../screens/ShareSongScreen";
import SearchScreen from "../screens/search/SearchScreen";
import SearchResultScreen from "../screens/search/SearchResultScreen";
import PodcastSelectionScreen from "../screens/library/PodcastSelectionScreen";
import ArtistSelectionScreen from "../screens/library/ArtistSelectionScreen";
import SearchLibraryScreen from "../screens/library/SearchLibraryScreen";
import AddSongPlaylistScreen from "../screens/playlists/AddSongPlaylistScreen";
import UpdateSongPlaylistScreen from "../screens/playlists/UpdateSongPlaylistScreen";
import SearchInPlaylistScreen from "../screens/playlists/SearchInPlaylistScreen";
import ShareSongScreen from "../screens/ShareSongScreen";
import CreatePlaylistScreen from "../screens/playlists/CreatePlaylistScreen";
// import ScanScreen from "../screens/ScanScreen";

const Stack = createStackNavigator();

export type RootStackParamList = {
  SplashNavigator: undefined;
  Playing: undefined;
  AddSongPlaylists: undefined;
  EditProfile: undefined;
  detailPlaylist: undefined;
  Playlists: undefined;
  Album: { id: string };
  Artist: { id: string };
  shareQrSong: { song: Song };
  ScanQr: undefined;
  search: undefined;
  SearchResult: { toastMessages?: string[] };
  ArtistSelection: { selectedIds: string[] };
  PodcastSelection: { selectedIds: string[] };
  SearchLibraryScreen: {
    type: "artist" | "podcast";
    selectedIds: string[];
  };
  DetailPlaylist: { id: string };
  AddToPlaylist: { songId?: string; currentPlaylistId?: string };
  AddSongPlaylist: {playlistId: string };
  updateSongPlaylist: {playlistId: string };
  SearchInPlaylist: { Items: Song[] };
  CreatePlaylist: undefined;
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashNavigator"
          component={SplashNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Playing"
          component={PlayingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddToPlaylist"
          component={AddToPlaylistScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="detailPlaylist"
          component={DetailPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Playlists"
          component={PlaylistsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Album"
          component={AlbumScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Artist"
          component={ArtistDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailPlaylist"
          component={DetailPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PodcastSelection"
          component={PodcastSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArtistSelection"
          component={ArtistSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchLibraryScreen"
          component={SearchLibraryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddSongPlaylist"
          component={AddSongPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="updateSongPlaylist"
          component={UpdateSongPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchInPlaylist"
          component={SearchInPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="shareQrSong"
          component={ShareSongScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePlaylist"
          component={CreatePlaylistScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
