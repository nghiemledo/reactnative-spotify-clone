import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Home, Library, Plus, Search, Slack } from "@tamagui/lucide-icons";
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
        screenOptions={({ route }) => ({
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
            // Ẩn bottom tab khi ở PlayingScreen
            display:
              getFocusedRouteNameFromRoute(route) === "Playing"
                ? "none"
                : "flex",
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeNavigator}
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
          name="Premium"
          component={PremiumNavigator}
          options={{
            headerShown: false,
            tabBarLabel: "Premium",
            tabBarIcon: ({ color }) => <Slack color={color as any} size={24} />,
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
