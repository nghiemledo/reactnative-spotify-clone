import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SplashNavigator from "./SplashNavigator";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";
import PlayingScreen from "../screens/PlayingScreen";
import { AddSongPlaylistsScreen } from "../screens/artist/AddSongPlayListsScreen";

const Stack = createStackNavigator();

export type RootStackParamList = {
  SplashNavigator: undefined;
  Playing: undefined;
  AddToPlaylist: undefined;
  AddSongPlaylists: undefined;
  Queue: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
