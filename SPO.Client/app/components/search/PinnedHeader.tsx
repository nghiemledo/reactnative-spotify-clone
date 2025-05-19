import React from "react";
import { Input, View, XStack } from "tamagui";
import { Search } from "@tamagui/lucide-icons";
import { Animated } from "react-native";

interface PinnedHeaderProps {
  scrollY: Animated.Value;
  headerHeight: number;
}

export default function PinnedHeader({ scrollY, headerHeight }: PinnedHeaderProps) {
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        backgroundColor: "#000",
        padding: 12,
        paddingTop: 12,
        opacity: scrollY.interpolate({
          inputRange: [headerHeight / 2, headerHeight],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [0, headerHeight],
              outputRange: [-60, 0],
              extrapolate: "clamp",
            }),
          },
        ],
      }}
    >
      <View
        bg="white"
        rounded={7}
        flexDirection="row"
        items="center"
        px="$1"
        py="$1.5"
      >
        <Input
          disabled
          size="$3.5"
          borderWidth={0}
          rounded="$2"
          bg="white"
          color="black"
          fontWeight="bold"
          placeholder="What do you want to listen to?"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          pointerEvents="none"
          flex={1}
          m="auto"
          pl="$7"
        />
        <XStack
          position="absolute"
          l="$3"
          t="$3"
          items="center"
          pointerEvents="none"
        >
          <Search size="$1" color="rgba(0, 0, 0, 0.7)" />
        </XStack>
      </View>
    </Animated.View>
  );
}