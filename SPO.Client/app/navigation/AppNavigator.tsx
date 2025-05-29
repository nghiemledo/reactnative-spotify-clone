import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashNavigator from "./SplashNavigator";
import PlayingScreen from "../screens/PlayingScreen";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import AlbumScreen from "../screens/AlbumScreen";
import ArtistDetailScreen from "../screens/artist/ArtistDetailScreen";
import ShareSongScreen from "../screens/ShareSongScreen";
import SearchScreen from "../screens/search/SearchScreen";
import SearchResultScreen from "../screens/search/SearchResultScreen";
import PodcastSelectionScreen from "../screens/library/PodcastSelectionScreen";
import ArtistSelectionScreen from "../screens/library/ArtistSelectionScreen";
import SearchLibraryScreen from "../screens/library/SearchLibraryScreen";
import AddSongPlaylistScreen from "../screens/playlists/AddSongPlaylistScreen";
import CreatePlaylistScreen from "../screens/playlists/CreatePlaylistScreen";
import ScanScreen from "../screens/ScanScreen";
import { Song } from "../types/song";
import { EditProfileScreen } from "../screens/profile/EditProfileScreen";
import { PlaylistsScreen } from "../screens/playlists/PlaylistsScreen";
import UpdateSongPlaylistScreen from "../screens/playlists/UpdateSongPlaylistScreen";

const Stack = createStackNavigator();

export type RootStackParamList = {
  SplashNavigator: undefined;
  Playing: undefined;
  AddToPlaylist: { songId?: string; currentPlaylistId?: string };
  EditProfile: undefined;
  DetailPlaylist: { id: string };
  Playlists: undefined;
  Album: { id: string };
  Artist: { id: string };
  shareQrSong: { song: Song };
  ScanQr: undefined;
  search: undefined;
  SearchResult: { toastMessages?: string[] };
  ArtistSelection: { selectedIds: string[] };
  PodcastSelection: { selectedIds: string[] };
  SearchLibraryScreen: { type: "artist" | "podcast"; selectedIds: string[] };
  AddSongPlaylist: { playlistId: string };
  updateSongPlaylist: { playlistId: string };
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
          name="DetailPlaylist"
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
          name="SearchResult"
          component={SearchResultScreen}
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
          name="CreatePlaylist"
          component={CreatePlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanQr"
          component={ScanScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
