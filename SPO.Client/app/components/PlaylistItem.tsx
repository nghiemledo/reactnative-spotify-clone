import React from "react";
import { Text, XStack } from "tamagui";
import SafeImage from "./SafeImage";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Playlist } from "../screens/profile/ProfileScreen";

interface PlaylistItemProps {
  playlist: Playlist;
  onPress?: () => void;
}
export const PlaylistItem = (data: PlaylistItemProps) => {
  const navigation = useNavigation();
  console.log(data);

  return (
    // <TouchableOpacity style={{ flex: 1 }} onPress={() => onSongPress?.(song)}>

    <TouchableOpacity onPress={() => navigation.navigate("detailPlaylist")}>
      <XStack items="center" gap={12} pt={16}>
        <SafeImage
          // onPress={() => navigation.navigate("PlaylistDetail", { playlistId: data.playlist.id })}
          uri={data.playlist.urlCoverPage}
          width={60}
          height={60}
        />
        <Text color="white" fontWeight="bold" fontSize={16}>
          {data.playlist.name}
        </Text>
      </XStack>
    </TouchableOpacity>
  );
};
