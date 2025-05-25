import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AlbumScreen from "../screens/AlbumScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import PodcastDetailScreen from "../screens/podcast/PodcastDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { AddSongPlaylistsScreen } from "../screens/artist/AddSongPlayListsScreen";
import ArtistDetailScreen from "../screens/artist/ArtistDetailScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";

const Stack = createStackNavigator();

export type HomeStackParamList = {
  Home: undefined;
  Album: { id: string };
  Playlist: { id: string };
  Artist: { id: string };
  Podcast: { id: string };
  AddSongPlaylists: undefined;
  Settings: undefined;
  Profile: undefined;
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
        name="Podcast"
        component={PodcastDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddSongPlaylists"
        component={AddSongPlaylistsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
