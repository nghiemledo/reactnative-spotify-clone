import React from "react";
import { XStack, YStack, Text, Button } from "tamagui";
import { MoreVertical } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import SafeImage from "./SafeImage";
import { Song } from "../types/song";

interface SongItemProps {
  song: Song;
  index?: number;
  showIndex?: boolean;
  showImage?: boolean;
  showArtistName?: boolean;
  imageSize?: number;
  getArtistName?: (artistId: string | undefined) => string;
  onSongPress?: (song: Song) => void;
  onMorePress: (song: Song) => void;
}

export const SongItem: React.FC<SongItemProps> = ({
  song,
  index,
  showIndex = false,
  showImage = false,
  showArtistName = false,
  imageSize = 48,
  getArtistName,
  onSongPress,
  onMorePress,
}) => {
  if (!song || !song.title || !song.audioUrl) {
    return (
      <XStack items="center" justify="space-between" py="$2">
        <Text color="white">Invalid song data</Text>
      </XStack>
    );
  }
  return (
    <XStack items="center" justify="space-between" py="$2">
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onSongPress?.(song)}>
        <XStack items="center" gap="$3" flex={1}>
          {showIndex && (
            <Text color="#b3b3b3" width={20} fontSize={16}>
              {index !== undefined ? index + 1 : ""}
            </Text>
          )}
          {showImage && (
            <SafeImage
              uri={song.coverImage || "https://via.placeholder.com/40"}
              width={imageSize}
              height={imageSize}
              rounded={2}
            />
          )}
          <YStack flex={1}>
            <Text
              fontSize={16}
              fontWeight="400"
              color="white"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {song.title || "No Title"}
            </Text>
            {showArtistName && getArtistName && (
              <Text
                fontSize={13}
                color="rgba(255,255,255,0.7)"
                numberOfLines={1}
              >
                {getArtistName(song.artistId) || "Unknown Artist"}
              </Text>
            )}
          </YStack>
        </XStack>
      </TouchableOpacity>
      <Button
        bg="transparent"
        size="$3"
        p={0}
        onPress={() => onMorePress(song)}
        icon={<MoreVertical size={20} color="#b3b3b3" />}
      />
    </XStack>
  );
};
