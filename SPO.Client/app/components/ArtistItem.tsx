import React from "react";
import { Text, YStack } from "tamagui";
import SafeImage from "./SafeImage";
import { Artist } from "../types/artist";
interface ArtistItemProps {
    item: Artist
}
export const ArtistItem = ({item}: ArtistItemProps) => {
  return (
    <YStack mr="$4" width={120} items="center">
      <SafeImage uri={item?.urlAvatar} width={100} height={100} rounded={50} />
      <Text color="white" fontWeight="600" mt="$2" numberOfLines={1}>
        {item.name}
      </Text>
    </YStack>
  );
};
