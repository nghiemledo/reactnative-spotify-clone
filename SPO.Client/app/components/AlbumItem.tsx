import React from "react";
import { YStack, Text } from "tamagui";
import SafeImage from "./SafeImage";
import { Album } from "../types/album";
import { TouchableOpacity } from "react-native";

interface AlbumItemProps {
  album: Album;
  getArtistName?: (artistId: string | undefined) => string;
  showDate?: boolean;
  onPress?: (album: Album) => void;
}

export const AlbumItem = ({
  album,
  getArtistName,
  showDate = false,
  onPress,
}: AlbumItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress?.(album)}>
      <YStack mr="$4" width={150}>
        <SafeImage
          uri={album?.coverImage}
          width={150}
          height={150}
          rounded={8}
        />
        <Text color="white" fontWeight="600" mt="$2" numberOfLines={1}>
          {album.title || "No Title"}
        </Text>
        <Text
          color={showDate ? "#b3b3b3" : "#666666"}
          fontSize="$3"
          numberOfLines={1}
        >
          {showDate
            ? album.createdAt
              ? new Date(album.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "No Date"
            : getArtistName
            ? getArtistName(album.artistId) || "Unknown Artist"
            : "Unknown Artist"}
        </Text>
      </YStack>
    </TouchableOpacity>
  );
};
