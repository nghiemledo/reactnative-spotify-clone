import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import EmailLoginScreen from "../screens/EmailLoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EmailRegisterScreen from "../screens/EmailRegisterScreen";

const Stack = createStackNavigator();
export type SlpashStackParamList = {
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
        component={TabNavigator}
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
