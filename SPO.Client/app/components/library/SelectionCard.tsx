import React from "react";
import { YStack, View, Image, Text, Circle } from "tamagui";
import { MotiView } from "moti";
import { TouchableOpacity } from "react-native";
import { Check } from "@tamagui/lucide-icons";

type SelectionCardProps = {
  title: string;
  image: string;
  index: number;
  selected: boolean;
  onPress: () => void;
  isCircular?: boolean;
};

export const SelectionCard = ({
  title,
  image,
  index,
  selected,
  onPress,
  isCircular = false,
}: SelectionCardProps) => (
  <MotiView
    from={{ opacity: 0, translateY: 20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: "timing", duration: 500, delay: index * 100 }}
    style={{ flex: 1, alignItems: "center", marginVertical: 10 }}
  >
    <TouchableOpacity onPress={onPress}>
      <YStack items="center" space="$2" p="$2" position="relative">
        <View rounded={isCircular ? 50 : 10} bg="#fff" overflow="hidden">
          <Image
            source={{ uri: image }}
            width={100}
            height={100}
            borderRadius={isCircular ? 50 : 10}
          />
        </View>
        {selected && (
          <Circle
            size={24}
            bg="white"
            position="absolute"
            t={0}
            r={15}
            borderWidth={2}
            borderColor="#000"
            z={10}
          >
            <Check size={16} color="#000" />
          </Circle>
        )}
        <Text color="white" fontSize={14} text="center" numberOfLines={2}>
          {title}
        </Text>
      </YStack>
    </TouchableOpacity>
  </MotiView>
);