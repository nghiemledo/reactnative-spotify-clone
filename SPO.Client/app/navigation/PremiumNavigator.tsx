import { createStackNavigator } from "@react-navigation/stack";
import PremiumSubscriptionScreen from "../screens/PremiumScriptionScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";

const Stack = createStackNavigator();

export type PremiumStackParamList = {
  PremiumScreen: undefined;
  OrderSuccess: {
    plan: string;
    amount: string;
    currency: string;
    createTime: string;
  };
};

export default function PremiumNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PremiumScreen"
        component={PremiumSubscriptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
