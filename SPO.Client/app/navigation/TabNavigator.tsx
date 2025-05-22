import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayingScreen from "../screens/PlayingScreen";
import {
  Home,
  Library,
  Plus,
  Search,
  PlayCircle,
  Snowflake,
  House,
  Slack,
} from "@tamagui/lucide-icons";
import CreateBottomSheet from "../components/library/CreateBottomSheet";
import React, { useState } from "react";
import SearchNavigator from "./SearchNavigator";
import HomeNavigator from "./HomeNavigator";
import LibraryNavigator from "./LibraryNavigator";
import PremiumNavigator from "./PremiumNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#B3B3B3",
          tabBarStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderTopWidth: 0,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeNavigator}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <House color={color as any} size={24} />,
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
          component={LibraryNavigator}
          options={{
            headerShown: false,
            tabBarLabel: "Library",
            tabBarIcon: ({ color }) => (
              <Library color={color as any} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Preminum"
          component={PremiumNavigator}
          options={{
            headerShown: false,
            tabBarLabel: "Premium",
            tabBarIcon: ({ color }) => <Slack color={color as any} size={24} />,
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
