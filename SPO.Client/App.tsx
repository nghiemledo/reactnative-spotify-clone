import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';
export default function App() {
  const [fontsLoaded] = useFonts({
    'CircularStd': require('./assets/fonts/CircularStd-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const DefaultText = ({ children }: { children: React.ReactNode }) => (
    <Text style={{ fontFamily: 'CircularStd' }}>{children}</Text>
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
