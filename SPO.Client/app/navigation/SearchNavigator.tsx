import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/search/SearchScreen";
import ScanScreen from "../screens/ScanScreen";
import GenreScreen from "../screens/GenreScreen";
import SearchResultScreen from "../screens/search/SearchResultScreen";

const Stack = createStackNavigator();

export type SearchStackParamList = {
  SearchScreen: undefined;
  ScanScreen: undefined;
  Genre: { id: string };
  SearchResult: { toastMessages?: string[] };
};

export default function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Genre"
        component={GenreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
