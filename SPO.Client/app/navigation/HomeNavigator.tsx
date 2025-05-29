import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AlbumScreen from "../screens/AlbumScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import PodcastEpisodeScreen from "../screens/podcast/PodcastEpisodeScreen";
import ArtistDetailScreen from "../screens/artist/ArtistDetailScreen";
import PodcastShowScreen from "../screens/podcast/PodcastShowScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { PlaylistsScreen } from "../screens/playlists/PlaylistsScreen";
import LoginScreen from "../screens/auth/login/LoginScreen";

const Stack = createStackNavigator();

export type HomeStackParamList = {
  Home: undefined;
  Album: { id: string };
  Playlist: { id: string };
  Artist: { id: string };
  PodcastShow: { showId: string };
  PodcastEpisodeScreen: { episodeId: string };
  Profile: undefined;
  Settings: undefined;
  Playlists: undefined;
  Login: undefined;
};

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
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
        component={ArtistDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PodcastShow"
        component={PodcastShowScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PodcastEpisodeScreen"
        component={PodcastEpisodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Playlists"
        component={PlaylistsScreen}
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
