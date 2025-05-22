import { TamaguiProvider } from "@tamagui/core";
import AppNavigator from "./navigation/AppNavigator";
import { config } from "./tamagui.config";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { playbackService, setupPlayer } from "./services/playerService";
import { PortalProvider } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  // useEffect(() => {
  //   setupPlayer();
  //   // playbackService();
  // }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TamaguiProvider config={config}>
            <PortalProvider>
              <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
                <AppNavigator />
              </SafeAreaView>
            </PortalProvider>
          </TamaguiProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
