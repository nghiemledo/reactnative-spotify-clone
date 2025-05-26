import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { XStack, YStack, Text } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { MotiView } from "moti";

const tabTypes = [
  { id: 1, name: "All" },
  { id: 2, name: "Songs" },
  { id: 3, name: "Artists" },
  { id: 4, name: "Albums" },
  { id: 5, name: "Playlists" },
];

interface TabsProps {
  isSearch: boolean;
  selectedTab: string | null;
  setSelectedTab: (value: string | null) => void;
  handleClearTab: () => void;
}

export default function Tabs({
  isSearch,
  selectedTab,
  setSelectedTab,
  handleClearTab,
}: TabsProps) {
  return (
    <>
      {isSearch && (
        <XStack px="$3" mb="$2" items="center">
          {selectedTab && (
            <MotiView
              from={{ opacity: 0, translateX: -10 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 200 }}
            >
              <TouchableOpacity onPress={handleClearTab}>
                <X size="$1" color="white" mr="$2" />
              </TouchableOpacity>
            </MotiView>
          )}
          <FlatList
            data={
              selectedTab
                ? tabTypes.filter((tab) => tab.name === selectedTab)
                : tabTypes
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingHorizontal: 0,
              gap: 10,
              justifyContent: "flex-start",
            }}
            renderItem={({ item }) => (
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 200 }}
              >
                <TouchableOpacity onPress={() => setSelectedTab(item.name)}>
                  <YStack
                    bg={
                      selectedTab === item.name
                        ? "#1DB954"
                        : "rgba(256, 256, 256, 0.3)"
                    }
                    justify="flex-start"
                    px="$4"
                    items="center"
                    py="$1"
                    rounded="$10"
                  >
                    <Text
                      color="white"
                      fontWeight="bold"
                      fontSize={16}
                      self="center"
                    >
                      {item.name}
                    </Text>
                  </YStack>
                </TouchableOpacity>
              </MotiView>
            )}
          />
        </XStack>
      )}
    </>
  );
}