import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
// import SearchScreen from '../screens/SearchScreen';
// import LibraryScreen from '../screens/LibraryScreen';
// import AlbumScreen from '../screens/AlbumScreen';
import PlayerModal from '../components/PlayerModal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
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
        {/* <Stack.Screen name="Album" component={AlbumScreen} />
        <Stack.Screen
          name="Player"
          component={PlayerModal}
          options={{ presentation: 'modal' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}