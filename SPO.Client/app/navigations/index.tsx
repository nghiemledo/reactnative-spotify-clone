import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "screens/HomeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
