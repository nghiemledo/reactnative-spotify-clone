import React, { useState } from "react";
import { View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, YStack, XStack, Text, Image } from "tamagui";
import { ArrowLeft, Check, Heart, Menu } from "@tamagui/lucide-icons";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface Playlist {
  id: number;
  name: string;
  image?: string;
  selected?: boolean;
}

const playlists: Playlist[] = [
  {
    id: 0,
    name: "My Playlist",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    name: "Danh sách phát thử 3 của tôi",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    name: "Danh sách phát thử 2 của tôi",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Danh sách phát thử 1 của tôi",
    image: "https://i.pravatar.cc/150?img=3",
  },
];

// Adding "Liked Songs" as a separate entity for the "Saved in" section
const likedSongs: Playlist = {
  id: 1,
  name: "Liked Songs",
  selected: true,
};

const AddToPlaylistScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "AddToPlaylist">>();
  const songId = route.params?.songId;
  const currentPlaylistId = route.params?.currentPlaylistId;
  const initialPlaylists = [likedSongs];
  const [selectedPlaylists, setSelectedPlaylists] =
    useState<Playlist[]>(initialPlaylists);

  // Filter out the current playlist only if currentPlaylistId is defined
  const filteredPlaylists =
    currentPlaylistId !== undefined
      ? playlists.filter((playlist) => playlist.id !== currentPlaylistId)
      : playlists;

  const handleSelectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylists((prev) => {
      if (prev.some((p) => p.id === playlist.id)) {
        return prev.filter((p) => p.id !== playlist.id);
      } else {
        return [...prev, playlist];
      }
    });
  };

  const handleClearAll = () => {
    setSelectedPlaylists([]);
  };

  const handleDone = () => {
    const toastMessages: string[] = [];

    const wasLikedSongsInitiallySelected = initialPlaylists.some(
      (p) => p.id === likedSongs.id
    );
    const isLikedSongsSelected = selectedPlaylists.some(
      (p) => p.id === likedSongs.id
    );
    if (wasLikedSongsInitiallySelected && !isLikedSongsSelected) {
      toastMessages.push("Removed from Liked Songs");
    }

    const newPlaylists = selectedPlaylists.filter(
      (p) =>
        p.id !== likedSongs.id &&
        !initialPlaylists.some((initial) => initial.id === p.id)
    );
    newPlaylists.forEach((playlist) => {
      toastMessages.push(`Added to ${playlist.name}`);
    });

    console.log(
      "Done with selection:",
      selectedPlaylists.map((p) => p.name)
    );

    navigation.navigate("SearchResult", { toastMessages });
  };

  const isSelected = (playlist: Playlist) =>
    selectedPlaylists.some((p) => p.id === playlist.id);

  return (
    <YStack flex={1} bg="#000" pt="$4">
      <XStack items="center" mb="$4">
        <Button
          icon={<ArrowLeft size="$1" color="white" />}
          bg="transparent"
          hoverStyle={{ bg: "transparent" }}
          pressStyle={{
            bg: "transparent",
            borderBlockColor: "transparent",
          }}
          onPress={() => navigation.goBack()}
        />
        <XStack width={"70%"} justify="center">
          <Text fontSize="$4" fontWeight="bold" color="white" text="center">
            Add to this playlist
          </Text>
        </XStack>
      </XStack>

      <YStack items="center" mb="$4">
        <Button
          bg="white"
          color="#000"
          rounded={50}
          p="$2"
          width={width * 0.4}
          onPress={() => console.log("New playlist pressed")}
        >
          <Text fontSize={16} fontWeight="bold">
            New playlist
          </Text>
        </Button>
      </YStack>

      <YStack px="$3" flex={1}>
        <YStack py="$3">
          <XStack justify="space-between" mb="$2">
            <Text color="rgba(255, 255, 255, 0.7)" fontSize={14}>
              Saved in
            </Text>
            <Text
              color="#1DB954"
              fontSize={14}
              onPress={handleClearAll}
              fontWeight="bold"
            >
              Clear all
            </Text>
          </XStack>
          <TouchableOpacity onPress={() => handleSelectPlaylist(likedSongs)}>
            <XStack
              items="center"
              justify="space-between"
              py="$2"
              borderBottomColor="rgba(255, 255, 255, 0.1)"
            >
              <XStack items="center" gap="$3">
                <Heart size="$1" color="white" />
                <Text color="white" fontSize={16}>
                  {likedSongs.name}
                </Text>
              </XStack>
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isSelected(likedSongs) && (
                  <Check size={16} rounded={8} color="white" bg="#1DB954" />
                )}
              </View>
            </XStack>
          </TouchableOpacity>
        </YStack>
        <YStack>
          <XStack items={"center"}>
            <Menu color="rgba(255, 255, 255, 0.7)" />
            <Text color="rgba(255, 255, 255, 0.7)" fontSize={14}>
              Most relevant
            </Text>
          </XStack>
        </YStack>

        <ScrollView style={{ paddingVertical: 5 }}>
          {filteredPlaylists.map((playlist) => (
            <TouchableOpacity
              key={playlist.id}
              onPress={() => handleSelectPlaylist(playlist)}
            >
              <XStack
                items="center"
                justify="space-between"
                py="$2"
                borderBottomColor="rgba(255, 255, 255, 0.1)"
              >
                <XStack items="center" gap="$2">
                  <Image
                    source={{ uri: playlist.image }}
                    width={40}
                    height={40}
                    borderRadius={4}
                  />
                  <Text color="white" fontSize={16}>
                    {playlist.name}
                  </Text>
                </XStack>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isSelected(playlist) && (
                    <Check size={16} rounded={8} color="white" bg="#1DB954" />
                  )}
                </View>
              </XStack>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </YStack>

      <YStack items="center" p="$3" bg="#000">
        <Button
          bg="#1DB954"
          color="white"
          rounded={50}
          p="$2"
          width={width * 0.4}
          onPress={handleDone}
        >
          <Text fontSize={16} fontWeight="bold">
            Done
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default AddToPlaylistScreen;
