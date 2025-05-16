import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PlayingScreen from "../screens/PlayingScreen";
import DetailPlaylistScreen from "../screens/playlists/DetailPlaylistScreen";
import SearchScreen from "../screens/search/SearchScreen";
import { Home, Library, Search } from "@tamagui/lucide-icons";
import LibraryScreen from "../screens/LibaryScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1DB954",
        tabBarInactiveTintColor: "#B3B3B3",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Home color={color as any} size={24} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => <Search color={color as any} size={24} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Library",
          tabBarIcon: ({ color }) => <Library color={color as any} size={24} />,
        }}
      />
      <Tab.Screen
        name="Playing"
        component={PlayingScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* <Tab.Screen name="Detail" component={DetailPlaylistScreen}  /> */}
    </Tab.Navigator>
  );
}
