import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import AlbumScreen from "../screens/AlbumScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import ArtistScreen from "../screens/ArtistDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SearchScreen from "../screens/search/SearchScreen";
import SearchResultScreen from "../screens/search/SearchResultScreen";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";

const Stack = createStackNavigator();
export type SearchStackParamList = {
  Search: undefined;
  SearchResult: { toastMessages?: string[] };
  AddToPlaylist: { songId: number };

};
export default function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddToPlaylist"
        component={AddToPlaylistScreen}
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>
  );
}
