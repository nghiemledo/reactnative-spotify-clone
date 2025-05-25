import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SplashNavigator from "./SplashNavigator";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";
import { Song } from "../types/song";
import PlaylistNavigator from "./PlaylistNavigator";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import PlayingScreen from "../screens/PlayingScreen";
import { AddSongPlaylistsScreen } from "../screens/artist/AddSongPlayListsScreen";
import QueueBottomSheet from "../components/QueueBottomSheet";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import { PlaylistsScreen } from "../screens/playlists/PlaylistsScreen";
import { EditProfileScreen } from "../screens/profile/EditProfileScreen";

const Stack = createStackNavigator();

export type RootStackParamList = {
  SplashNavigator: undefined;
  Playing: undefined;
  AddToPlaylist: undefined;
  AddSongPlaylists: undefined;
  EditProfile: undefined;
  detailPlaylist: undefined;
  Playlists: undefined;
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
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        /> */}
       
        <Stack.Screen
          name="AddToPlaylist"
          component={AddToPlaylistScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
