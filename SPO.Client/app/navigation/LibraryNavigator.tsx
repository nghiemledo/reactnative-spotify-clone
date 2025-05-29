import { createStackNavigator } from "@react-navigation/stack";
import LibraryScreen from "../screens/library/LibaryScreen";
import ArtistSelectionScreen from "../screens/library/ArtistSelectionScreen";
import SearchLibraryScreen from "../screens/library/SearchLibraryScreen";
import PodcastSelectionScreen from "../screens/library/PodcastSelectionScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import AddSongPlaylistScreen from "../screens/playlists/AddSongPlaylistScreen";
import CreatePlaylistScreen from "../screens/playlists/CreatePlaylistScreen";
import ArtistDetailScreen from "../screens/artist/ArtistDetailScreen";
import PodcastShowScreen from "../screens/podcast/PodcastShowScreen";

const Stack = createStackNavigator();

export type LibraryStackParamList = {
  LibraryScreen: undefined;
  Artist: { id: string };
  PodcastShow: { showId: string };
  ArtistSelection: { selectedIds: string[] };
  PodcastSelection: { selectedIds: string[] };
  SearchLibraryScreen: { type: "artist" | "podcast"; selectedIds: string[] };
  DetailPlaylist: { id: string };
  AddSongPlaylist: { playlistId: string };
  CreatePlaylist: undefined;
};

export default function LibraryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
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
        name="ArtistSelection"
        component={ArtistSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PodcastSelection"
        component={PodcastSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchLibraryScreen"
        component={SearchLibraryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailPlaylist"
        component={DetailPlaylistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddSongPlaylist"
        component={AddSongPlaylistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePlaylist"
        component={CreatePlaylistScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
