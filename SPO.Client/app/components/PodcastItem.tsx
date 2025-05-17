import React from "react";
import { Text } from "tamagui";
import { XStack } from "tamagui";
import SafeImage from "./SafeImage";
import { YStack } from "tamagui";
import { Podcast } from "../types/podcast";
import { HomeStackParamList } from "../navigation/HomeNavigator";
import { Button } from "tamagui";
import { Play, PlusCircle } from "@tamagui/lucide-icons";

interface PodcastItemProps {
  item: Podcast;
  hanldeNavigation: <T extends keyof HomeStackParamList>(
    screen: T,
    params?: HomeStackParamList[T]
  ) => void;
}

export const PodcastItem = ({ item, hanldeNavigation }: PodcastItemProps) => {
  return (
    <YStack
      mr={20}
      py={20}
      px={20}
      mb={20}
      bg="gray"
      rounded={10}
      onPress={() => {
        console.log("Navigating to Podcast with id:", item.id);
        hanldeNavigation("Podcast", { id: item.id.toString() });
      }}
    >
      <XStack justify="space-between">
        <YStack>
          <Text color="white" fontSize="$5" numberOfLines={2}>
            {item.title}
          </Text>
          <Text color="white" fontSize="$3" numberOfLines={1}>
            Episode • {item.creator}
          </Text>
        </YStack>
        <Button bg="transparent" p={1}>
          <PlusCircle color="#fff" />
        </Button>
      </XStack>
      <SafeImage
        mx={90}
        my={10}
        uri={item.coverImage}
        width={150}
        height={150}
        rounded={4}
      />
      <Text color="white" fontSize="$3" mb={10} numberOfLines={2}>
        {item.description}
      </Text>
      <XStack space="$2" items="center" justify="space-between">
        <Button
          size="$4"
          chromeless
          bg="#3C2D2D"
          onPress={() => console.log("Preview episode clicked")}
          rounded={25}
          px="$3"
          py="$1"
        >
          <Text color="white" fontSize="$2">
            Preview episode
          </Text>
        </Button>
        <Button
          bg="#fff"
          rounded={100}
          width={45}
          height={45}
          icon={<Play size={25} fill="black" />}
        />
      </XStack>
    </YStack>
  );
};
