import React from "react";
import { Button, Image, Text, XStack, YStack } from "tamagui";
import { CircleCheck, CirclePlus, EllipsisVertical } from "@tamagui/lucide-icons";

interface Song {
  id: number;
  type: "song";
  name: string;
  artists: { id: number; name: string }[];
  image: string;
}

interface SongCardProps {
  item: Song;
  likedItems: { [key: number]: boolean };
  handlePress: (id: number) => void;
  handleOpenSongOptionsBottomSheet: (song: Song) => void;
}

export default function SongCard({
  item,
  likedItems,
  handlePress,
  handleOpenSongOptionsBottomSheet,
}: SongCardProps) {
  return (
    <XStack items="center" justify="space-between" py="$2">
      <XStack items="center" gap="$3" flex={1} pr="$2">
        <Image
          source={{ uri: item.image }}
          width={50}
          height={50}
          borderRadius={8}
        />
        <YStack flex={1}>
          <Text fontSize={15} fontWeight="300" color="white">
            {item.name}
          </Text>
          <Text
            fontSize={13}
            fontWeight="300"
            color="rgba(255, 255, 255, 0.7)"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.type} •{" "}
            {item.artists?.map((artist) => artist.name).join(", ")}
          </Text>
        </YStack>
      </XStack>
      <XStack gap="$3">
        <Button
          bg="transparent"
          p={0}
          icon={
            <EllipsisVertical
              size="$1"
              color="white"
              strokeWidth={1}
            />
          }
          pressStyle={{
            bg: "transparent",
            borderBlockColor: "transparent",
          }}
          onPress={() => handleOpenSongOptionsBottomSheet(item)}
        />
        <Button
          bg="transparent"
          p={0}
          icon={
            likedItems[item.id] ? (
              <CircleCheck
                size="$1"
                color="white"
                strokeWidth={1}
                bg="#1DB954"
                rounded="$10"
                borderColor="#333"
              />
            ) : (
              <CirclePlus
                size="$1"
                color="white"
                strokeWidth={1}
              />
            )
          }
          pressStyle={{
            bg: "transparent",
            borderBlockColor: "transparent",
          }}
          onPress={() => handlePress(item.id)}
        />
      </XStack>
    </XStack>
  );
}