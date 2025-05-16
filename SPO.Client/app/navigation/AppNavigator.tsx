import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SplashNavigator from "./SplashNavigator";
import AlbumScreen from "../screens/AlbumScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import ArtistScreen from "../screens/ArtistDetailScreen";
import AddSongPlaylistScreen from "../screens/playlists/AddSongPlaylistScreen";
import UpdateSongPlaylistScreen from "../screens/playlists/UpdateSongPlaylistScreen";
import SearchScreen from "../screens/search/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  EmailLogin: undefined;
  EmailRegister: undefined;
  detailPlaylist: undefined;
  addSongPlaylist: undefined;
  updateSongPlaylist: undefined;
  PlayerModal: undefined;
  Profile: undefined;
  Search: undefined;
  WhatsNew: undefined;
  Recents: undefined;
  Settings: undefined;
  Album: { id: string };
  Artist: { id: string };
  Podcast: { id: string };
  Library: undefined;
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
          name="Album"
          component={AlbumScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="detailPlaylist"
          component={DetailPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Artist"
          component={ArtistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addSongPlaylist"
          component={AddSongPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="updateSongPlaylist"
          component={UpdateSongPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
