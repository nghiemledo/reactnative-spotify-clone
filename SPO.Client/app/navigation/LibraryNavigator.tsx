import { createStackNavigator } from "@react-navigation/stack";
import LibraryScreen from "../screens/library/LibaryScreen";
import ArtistSelectionScreen from "../screens/library/ArtistSelectionScreen";
import SearchLibraryScreen from "../screens/library/SearchLibraryScreen";
import PodcastSelectionScreen from "../screens/library/PodcastSelectionScreen";

const Stack = createStackNavigator();

export type LibraryStackParamList = {
  LibraryScreen: undefined;
  SearchLibraryScreen: undefined;
  ArtistSelection: { selectedIds: string[] };
  PodcastSelection: { selectedIds: string[] };
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
    </Stack.Navigator>
  );
}
