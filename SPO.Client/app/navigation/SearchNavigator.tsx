import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/search/SearchScreen";
import AddToPlaylistScreen from "../screens/playlists/AddToPlaylistScreen";
import ScanScreen from "../screens/ScanScreen";
import GenreScreen from "../screens/GenreScreen";

const Stack = createStackNavigator();

export type SearchStackParamList = {
  SearchScreen: undefined;  
  AddToPlaylist: undefined;
  ScanScreen: undefined;
  Genre: { id: string };
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
      <Stack.Screen
        name="ScanScreen"
        component={ScanScreen} // Giả sử bạn có một
        options={{ headerShown: false }} // Thay thế bằng
      />
      <Stack.Screen
        name="Genre"
        component={GenreScreen} 
        options={{ headerShown: false }} // Thay thế bằng
      />
    </Stack.Navigator>
  );
}
