import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import AlbumScreen from "../screens/AlbumScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import ArtistScreen from "../screens/artist/ArtistDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PodcastDetailScreen from "../screens/podcast/PodcastDetailScreen";
import PremiumSubscriptionScreen from "../screens/PremiumScriptionScreen";

const Stack = createStackNavigator();

export type PremiumStackParamList = {
  Premium: undefined;
};

export default function PremiumNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Premium"
        component={PremiumSubscriptionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}