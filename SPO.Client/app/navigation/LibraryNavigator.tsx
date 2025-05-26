import { createStackNavigator } from "@react-navigation/stack";
import LibraryScreen from "../screens/library/LibaryScreen";
import ArtistSelectionScreen from "../screens/library/ArtistSelectionScreen";
import SearchLibraryScreen from "../screens/library/SearchLibraryScreen";
import PodcastSelectionScreen from "../screens/library/PodcastSelectionScreen";
import { Song } from "../types/song";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import AddSongPlaylistScreen from "../screens/playlists/AddSongPlaylistScreen";
import UpdateSongPlaylistScreen from "../screens/playlists/UpdateSongPlaylistScreen";
import SearchInPlaylistScreen from "../screens/playlists/SearchInPlaylistScreen";
import { AddSongPlaylistsScreen } from "../screens/artist/AddSongPlayListsScreen";

const Stack = createStackNavigator();

export type LibraryStackParamList = {
  LibraryScreen: undefined;
  SearchLibraryScreen: undefined;
  ArtistSelection: { selectedIds: string[] };
  PodcastSelection: { selectedIds: string[] };
  SearchInPlaylist: { Items: Song[] };
  AddToPlaylist: { songId?: number; currentPlaylistId?: number };
  AddSongPlaylist: undefined;
  updateSongPlaylist: undefined;
  PlaylistNavigator: undefined;
  detailPlaylist: undefined;
};

export default function LibraryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryScreen" // Đổi tên
        component={LibraryScreen}
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
        name="PodcastSelection"
        component={PodcastSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="detailPlaylist"
        component={DetailPlaylistScreen}
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
        name="SearchInPlaylist"
        component={SearchInPlaylistScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}
