import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/login/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import EmailLoginScreen from "../screens/auth/login/EmailLoginScreen";
import RegisterScreen from "../screens/auth/register/RegisterScreen";
import EmailRegisterScreen from "../screens/auth/register/EmailRegisterScreen";
import HomeNavigator from "./HomeNavigator";

const Stack = createStackNavigator();

export type SplashStackParamList = {
  Splash: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  EmailLogin: undefined;
  EmailRegister: undefined;
};

export default function SplashNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={HomeNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailLogin"
        component={EmailLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailRegister"
        component={EmailRegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
