import React from "react";
import { Text, YStack } from "tamagui";
import SafeImage from "./SafeImage";
import { Artist } from "../types/artist";
import { HomeStackParamList } from "../navigation/HomeNavigator";
interface ArtistItemProps {
  item: Artist;
  hanldeNavigation: <T extends keyof HomeStackParamList>(
    screen: T,
    params?: HomeStackParamList[T]
  ) => void;
}
export const ArtistItem = ({ item, hanldeNavigation }: ArtistItemProps) => {
  return (
    <YStack
      mr="$4"
      width={120}
      items="center"
      onPress={() => hanldeNavigation("Artist", { id: item.id })}
    >
      <SafeImage uri={item?.urlAvatar} width={100} height={100} rounded={50} />
      <Text color="white" fontWeight="600" mt="$2" numberOfLines={1}>
        {item.name}
      </Text>
    </YStack>
  );
};
