import { TamaguiProvider } from "@tamagui/core";
import AppNavigator from "./navigation/AppNavigator";
import { config } from "./tamagui.config";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { playbackService, setupPlayer } from "./services/playerService";
import { PortalProvider } from "tamagui";

const App = () => {
  // useEffect(() => {
  //   setupPlayer();
  //   playbackService();
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TamaguiProvider config={config}>
           <PortalProvider>
          <AppNavigator />
          </PortalProvider>
        </TamaguiProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
