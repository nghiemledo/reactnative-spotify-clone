import { createStackNavigator } from "@react-navigation/stack";
import LibraryScreen from "../screens/library/LibaryScreen";
import ArtistSelectionScreen from "../screens/library/ArtistSelectionScreen";
import SearchLibraryScreen from "../screens/library/SearchLibraryScreen";
import PodcastSelectionScreen from "../screens/library/PodcastSelectionScreen";

const Stack = createStackNavigator();

export type LibraryStackParamList = {
  Library: undefined;
  SearchLibaryScreen: undefined;
  ArtistSelection: { selectedIds: string[] };
  PodcastSelection: { selectedIds: string[] };
};

export default function LibraryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArtistSelection"
        component={ArtistSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchLibaryScreen"
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
