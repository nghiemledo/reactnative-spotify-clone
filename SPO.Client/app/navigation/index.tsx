import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
// import SearchScreen from '../screens/SearchScreen';
// import LibraryScreen from '../screens/LibraryScreen';
// import AlbumScreen from '../screens/AlbumScreen';
import PlayerModal from "../components/PlayerModal";
import DetailPlaylistScreen from "../screens/DetailPlaylistScreen";
import AlbumScreen from "../screens/AlbumScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EmailRegisterScreen from "../screens/EmailRegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import EmailLoginScreen from "../screens/EmailLoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Thêm dòng này để tắt header
      />
      {/* <Tab.Screen name="DetailPlaylist" component={DetailPlaylistScreen} />
      <Tab.Screen name="Album" component={AlbumScreen} /> */}
      <Tab.Screen
        name="detailplaylist"
        component={DetailPlaylistScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} /> */}
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailLogin"
          component={EmailLoginScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Player"
          component={PlayerModal}
          options={{ presentation: 'modal' }}
        /> */}
        <Stack.Screen
          name="EmailRegister"
          component={EmailRegisterScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Player"
          component={PlayerModal}
          options={{ presentation: 'modal' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
