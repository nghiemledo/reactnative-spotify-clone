import { createStackNavigator } from "@react-navigation/stack";
import PremiumSubscriptionScreen from "../screens/PremiumScriptionScreen";

const Stack = createStackNavigator();

export type PremiumStackParamList = {
  PremiumScreen: undefined;
};

export default function PremiumNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PremiumScreen" // Đổi tên
        component={PremiumSubscriptionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
