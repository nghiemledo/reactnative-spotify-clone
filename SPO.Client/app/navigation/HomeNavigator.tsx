import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/auth/login/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import EmailLoginScreen from "../screens/auth/login/EmailLoginScreen";
import RegisterScreen from "../screens/auth/register/RegisterScreen";
import EmailRegisterScreen from "../screens/auth/register/EmailRegisterScreen";
import AlbumScreen from "../screens/AlbumScreen";

const Stack = createStackNavigator();
export type HomeStackParamList = {
  Home: undefined;
  Album: { id: string };
};
export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Album"
        componet={AlbumScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
