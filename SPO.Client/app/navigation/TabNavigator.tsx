import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PlayingScreen from "../screens/PlayingScreen";
import SearchScreen from "../screens/search/SearchScreen";
import { Home, Library, Plus, Search, PlayCircle } from "@tamagui/lucide-icons";
import LibraryScreen from "../screens/LibaryScreen";
import CreateBottomSheet from "../components/library/CreateBottomSheet";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import SearchNavigator from "./SearchNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#1DB954",
          tabBarInactiveTintColor: "#B3B3B3",
          tabBarStyle: {
            backgroundColor: "#191414",
            borderTopWidth: 0,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Home color={color as any} size={24} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchNavigator}
          options={{
            headerShown: false,
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => (
              <Search color={color as any} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Library",
            tabBarIcon: ({ color }) => (
              <Library color={color as any} size={24} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="CreatePlaylist"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Create",
            tabBarIcon: ({ color }) => (
              <Plus color={color as any} size={24} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => setIsBottomSheetOpen(true)}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Playing"
          component={PlayingScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Playing",
            tabBarIcon: ({ color }) => (
              <PlayCircle color={color as any} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
      <CreateBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onSelectOption={(option) => {
          console.log("Selected option:", option);
          setIsBottomSheetOpen(false);
        }}
      />
    </>
  );
}
