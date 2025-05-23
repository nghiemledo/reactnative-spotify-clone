<<<<<<< HEAD
import 'react-native-reanimated';
import { registerRootComponent } from 'expo';

import App from './App';
=======
import { registerRootComponent } from "expo";
import "expo-dev-client";
import "react-native-gesture-handler";
import App from "./App";
>>>>>>> feature/nguyenxuantruong/playingscreen

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
