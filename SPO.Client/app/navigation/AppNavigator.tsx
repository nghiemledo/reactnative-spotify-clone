import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SplashNavigator from "./SplashNavigator";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";
import PlayingScreen from "../screens/PlayingScreen";
import { AddSongPlaylistsScreen } from "../screens/artist/AddSongPlayListsScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import { PlaylistsScreen } from "../screens/playlists/PlaylistsScreen";
import { EditProfileScreen } from "../screens/profile/EditProfileScreen";
import AlbumScreen from "../screens/AlbumScreen";
import { Artist } from "../../admin/src/types/artist.type";
import ArtistDetailScreen from "../screens/artist/ArtistDetailScreen";
import { Song } from "../types/song";
// import ShareSongScreen from "../screens/ShareSongScreen";
import SearchScreen from "../screens/search/SearchScreen";
// import ScanScreen from "../screens/ScanScreen";

const Stack = createStackNavigator();

export type RootStackParamList = {
  SplashNavigator: undefined;
  Playing: undefined;
  AddToPlaylist: undefined;
  AddSongPlaylists: undefined;
  EditProfile: undefined;
  detailPlaylist: undefined;
  Playlists: undefined;
  Album: { id: string };
  Artist: { id: string };
  shareQrSong: { song: Song };
  ScanQr: undefined;
  search: undefined;
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
          name="AddSongPlaylists"
          component={AddSongPlaylistsScreen}
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
        {/* <Stack.Screen
          name="shareQrSong"
          component={ShareSongScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanQr"
          component={ScanScreen}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
