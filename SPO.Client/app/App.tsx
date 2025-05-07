import { TamaguiProvider } from "tamagui";
import { config } from "./tamagui.config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "react-native";
import Navigation from "navigations";
export default function App() {
  // console.log(tamaguiConfig);
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <SafeAreaProvider>
        <Navigation />
        {/* <Text>Welcome to Tamagui</Text> */}
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
