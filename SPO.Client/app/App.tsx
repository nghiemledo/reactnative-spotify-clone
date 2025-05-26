import AppNavigator from "./navigation/AppNavigator";
import { TamaguiProvider } from "@tamagui/core";
import { config } from "./tamagui.config";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { setupPlayer } from "./services/playerService";
import { PortalProvider } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MobileAds } from "react-native-google-mobile-ads";

const App = () => {
  useEffect(() => {
    // Khởi tạo Google Mobile Ads SDK
    MobileAds()
      .initialize()
      .then(() => {
        console.log("✅ Khởi tạo Mobile Ads SDK thành công");
      })
      .catch((error: Error) => {
        console.error("❌ Lỗi khởi tạo Mobile Ads SDK:", error);
      });

    // Khởi tạo player
    setupPlayer();
    // playbackService();
  }, []);
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
