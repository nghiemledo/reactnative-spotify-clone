import React from "react";
import { XStack } from "tamagui";
import SafeImage from "./SafeImage";
import { YStack } from "tamagui";
import { Text } from "tamagui";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Song } from "../types/song";

interface SongItemProps {
  item: Song;
  getArtistName: (id: string) => string;
}

export const SongItem = ({item, getArtistName }: SongItemProps) => {
  return (
    <XStack mr="$4" items="center" space="$3" py="$2">
      <SafeImage uri={item.coverImage} width={60} height={60} rounded={4} />
      <YStack flex={1}>
        <Text color="white" fontWeight="600" numberOfLines={1}>
          {item.title}
        </Text>
        <Text color="#666666" fontSize="$3" numberOfLines={1}>
          {getArtistName(item.id ?? '')}
        </Text>
      </YStack>
    </XStack>
  );
};
