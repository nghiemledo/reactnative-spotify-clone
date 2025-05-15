import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PlayingScreen from "../screens/PlayingScreen";
import DetailPlaylistScreen from "../screens/DetailPlaylistScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Search" component={SearchScreen} />
      {/* <Tab.Screen name="Playing" component={PlayingScreen} />
      <Tab.Screen name="Detail" component={DetailPlaylistScreen}  /> */}
    </Tab.Navigator>
  );
}
