import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { YStack, View, Image, Text, XStack } from "tamagui";

type GreatPicksProps = {
  selectedItems: { id: string; image: string }[];
  isCircular?: boolean;
};

export const GreatPicks = ({
  selectedItems,
  isCircular = false,
}: GreatPicksProps) => (
  <LinearGradient colors={["#191414", "#000000"]} style={{ flex: 1 }}>
    <YStack flex={1} justify="center" items="center" space="$4">
      <XStack>
        {selectedItems.map((item, index) => (
          <View
            key={item.id}
            rounded={isCircular ? 50 : 10}
            overflow="hidden"
            style={{ marginLeft: index === 0 ? 0 : -20 }}
          >
            <Image
              source={{ uri: item.image }}
              width={60}
              height={60}
              borderRadius={isCircular ? 50 : 10}
            />
          </View>
        ))}
      </XStack>
      <Text fontSize={24} fontWeight="bold" color="white">
        Great picks!
      </Text>
    </YStack>
  </LinearGradient>
);