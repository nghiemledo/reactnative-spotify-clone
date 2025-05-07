import { TamaguiProvider } from "tamagui";
import { config } from "./tamagui.config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "react-native";
import Navigation from "navigations";
import { Provider } from "react-redux";
import { persistor, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
export default function App() {
  // console.log(tamaguiConfig);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TamaguiProvider config={config} defaultTheme="light">
          <SafeAreaProvider>
            <Navigation />
            {/* <Text>Welcome to Tamagui</Text> */}
          </SafeAreaProvider>
        </TamaguiProvider>
      </PersistGate>
    </Provider>
  );
}
