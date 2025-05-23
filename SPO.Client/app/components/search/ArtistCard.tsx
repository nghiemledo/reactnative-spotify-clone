import React from "react";
import { Button, Image, Text, XStack, YStack } from "tamagui";

interface Artist {
  id: number;
  type: "artist";
  name: string;
  image: string;
}

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <XStack items="center" justify="space-between" py="$2">
      <XStack items="center" gap="$3" flex={1} pr="$2">
        <Image
          source={{ uri: artist.image }}
          width={50}
          height={50}
          borderRadius={100}
        />
        <YStack flex={1}>
          <Text fontSize={15} fontWeight="300" color="white">
            {artist.name}
          </Text>
          <Text
            fontSize={13}
            fontWeight="300"
            color="rgba(255, 255, 255, 0.7)"
          >
            {artist.type}
          </Text>
        </YStack>
      </XStack>
      <Button
        color="white"
        bg="transparent"
        borderColor="white"
        size="$3"
        rounded="$10"
      >
        <Text color="white">Follow</Text>
      </Button>
    </XStack>
  );
}