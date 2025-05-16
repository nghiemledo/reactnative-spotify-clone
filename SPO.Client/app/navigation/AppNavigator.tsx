import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AddSongPlaylistScreen from "../screens/playlists/AddSongPlaylistScreen";
import UpdateSongPlaylistScreen from "../screens/playlists/UpdateSongPlaylistScreen";
import SplashNavigator from "./SplashNavigator";
import AlbumScreen from "../screens/AlbumScreen";

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
          name="addSongPlaylist"
          component={AddSongPlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="updateSongPlaylist"
          component={UpdateSongPlaylistScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
