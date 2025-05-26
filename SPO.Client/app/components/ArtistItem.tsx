import React from "react";
import { YStack, Text } from "tamagui";
import SafeImage from "./SafeImage";
import { Artist } from "../types/artist";
import { TouchableOpacity } from "react-native";

interface ArtistItemProps {
  artist: Artist;
  onPress?: (artist: Artist) => void;
}

export const ArtistItem = ({ artist, onPress }: ArtistItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress?.(artist)}>
      <YStack mr="$2" width={120} items="center">
        <SafeImage
          uri={artist?.urlAvatar}
          width={100}
          height={100}
          rounded={50}
        />
        <Text color="white" fontWeight="600" mt="$2" numberOfLines={1}>
          {artist.name || "Unknown Artist"}
        </Text>
      </YStack>
    </TouchableOpacity>
  );
};