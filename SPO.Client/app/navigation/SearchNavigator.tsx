import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/search/SearchScreen";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";

const Stack = createStackNavigator();

export type SearchStackParamList = {
  SearchScreen: undefined;  
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
        name="AddToPlaylist"
        component={AddToPlaylistScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
