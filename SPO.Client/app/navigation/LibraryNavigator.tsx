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
  PlaylistNavigator: undefined;
};

export default function LibraryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryScreen" // Đổi tên
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      
 
    </Stack.Navigator>
  );
}
