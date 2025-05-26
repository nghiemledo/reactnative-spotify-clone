import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/search/SearchScreen";
import SearchResultScreen from "../screens/search/SearchResultScreen";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";

const Stack = createStackNavigator();

export type SearchStackParamList = {
  SearchScreen: undefined;
  SearchResult: { toastMessages?: string[] };
  AddToPlaylist: undefined;
};

export default function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen" // Đổi tên
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
