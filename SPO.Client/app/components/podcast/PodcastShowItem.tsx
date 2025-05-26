import React from "react";
import { Text, YStack, XStack, Button } from "tamagui";
import SafeImage from "../SafeImage";
import { Play, PlusCircle } from "@tamagui/lucide-icons";
import { PodcastShow } from "../../types/podcast";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/HomeNavigator";

interface PodcastShowItemProps {
  item: PodcastShow;
  navigation: NativeStackNavigationProp<HomeStackParamList>;
}

export const PodcastShowItem = ({ item, navigation }: PodcastShowItemProps) => {
  return (
    <YStack
      mr={20}
      py={15}
      px={15}
      mb={20}
      bg="rgba(105, 105, 105, 0.7)"
      rounded={10}
      onPress={() => {
        navigation.navigate("PodcastShow", { showId: item.id });
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
        mx={"auto"}
        my={10}
        uri={item.coverImage}
        width={160}
        height={160}
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
          bg="$green10"
          rounded={100}
          width={45}
          height={45}
          icon={<Play size={25} fill="black" />}
        />
      </XStack>
    </YStack>
  );
};
