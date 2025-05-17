import { createStackNavigator } from "@react-navigation/stack";
import AlbumScreen from "../screens/AlbumScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import ArtistScreen from "../screens/ArtistDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import PodcastDetailScreen from "../screens/podcast/PodcastDetailScreen";
import PremiumSubscriptionScreen from "../screens/PremiumSubscriptionScreen";

const Stack = createStackNavigator();

export type HomeStackParamList = {
  Home: undefined;
  Album: { id: string };
  Playlist: { id: string };
  Artist: { id: string };
  Profile: undefined;
  WhatsNew: undefined;
  Recents: undefined;
  Settings: undefined;
  ContentAndDisplay: undefined;
  Playback: undefined;
  PrivacyAndSocial: undefined;
  Notifications: undefined;
  AppsAndDevices: undefined;
  DataSaving: undefined;
  MediaQuality: undefined;
  Advertisements: undefined;
  About: undefined;
  Premium: undefined;
  Podcast: { id: string };
};

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Playlist"
        component={DetailPlaylistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Artist"
        component={ArtistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Podcast"
        component={PodcastDetailScreen}
        options={{ headerShown: false }}/>
        <Stack.screen
        name="Premium"
        component={PremiumSubscriptionScreen}
        options={{ headerShown: false }}
        />
    </Stack.Navigator>  
  );
} 
