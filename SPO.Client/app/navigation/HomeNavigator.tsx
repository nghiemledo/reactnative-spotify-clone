import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import AlbumScreen from "../screens/AlbumScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import ArtistScreen from "../screens/ArtistDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/auth/login/LoginScreen";

const Stack = createStackNavigator();
export type HomeStackParamList = {
  Login: undefined;
  Home: undefined;
  Album: { id: string };
  Playlist: { id: string };
  Artist: { id: string };
  Profile: undefined;
  WhatsNew: undefined;
  Recents: undefined;
  Settings: undefined;
  ContentAndDisplay: undefined;
  Playback: undefined;
  PrivacyAndSocial: undefined;
  Notifications: undefined;
  AppsAndDevices: undefined;
  DataSaving: undefined;
  MediaQuality: undefined;
  Advertisements: undefined;
  About: undefined;
  Premium: undefined;
};
export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Playlist"
        component={DetailPlaylistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Artist"
        component={ArtistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
