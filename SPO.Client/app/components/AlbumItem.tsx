import React from "react";
import { YStack } from "tamagui";
import SafeImage from "./SafeImage";
import { Text } from "tamagui";
import { Album } from "../types/album";
import { RootStackParamList } from "../navigation/AppNavigator";
import { HomeStackParamList } from "../navigation/HomeNavigator";

interface AlbumItemProps {
  hanldeNavigation: <T extends keyof HomeStackParamList>(
    screen: T,
    params?: HomeStackParamList[T]
  ) => void;
  item: Album;
  getArtistName: (id: string) => string;
}

export const AlbumItem = ({
  hanldeNavigation,
  item,
  getArtistName,
}: AlbumItemProps) => {
  return (
    <YStack
      mr="$4"
      width={150}
      onPress={() => hanldeNavigation("Album", { id: item.id })}
    >
      <SafeImage uri={item.coverImage} width={150} height={150} rounded={8} />
      <Text color="white" fontWeight="600" mt="$2" numberOfLines={1}>
        {item.title}
      </Text>
      <Text color="#666666" fontSize="$3" numberOfLines={1}>
        {getArtistName(item.id)}
      </Text>
    </YStack>
  );
};
