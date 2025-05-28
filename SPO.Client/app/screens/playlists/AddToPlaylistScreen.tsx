import React, { useState } from "react";
import { View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, YStack, XStack, Text, Image } from "tamagui";
import { ArrowLeft, Check, Heart, Menu } from "@tamagui/lucide-icons";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Playlist } from "../../services/playlistServices"; // Import từ playlistServices
import { PlaylistItem } from "../../services/playlistItemServices"; // Import PlaylistItem
import { useGetPlaylistsByUserIdQuery } from "../../services/playlistServices";
import {
  useAddPlaylistItemMutation,
  useGetPlaylistItemsQuery,
} from "../../services/playlistItemServices";
import { useSelector } from "react-redux";
import { UserInfo } from "../../types/user";

const { width } = Dimensions.get("window");

// Define the Liked Songs playlist
const likedSongs: Playlist = {
  id: "liked-songs",
  title: "Liked Songs",
  description: null,
  coverImage: null,
  userId: "",
  createdAt: new Date().toISOString(),
  isPublic: false,
};

interface AuthState {
  token: { accessToken: string; refreshToken: string } | null;
  user: UserInfo | null;
  role: string | null;
}

const AddToPlaylistScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "AddToPlaylist">>();
  const user = useSelector((state: { auth: AuthState }) => state.auth.user); // Get user from Redux

  const { songId, currentPlaylistId } = route.params || {};

  // Fetch playlists for the user
  const { data: playlistsData, isLoading: isPlaylistsLoading } =
    useGetPlaylistsByUserIdQuery(user?.id || "");

  // Fetch playlist items to check which playlists already contain the song
  const { data: playlistItemsData, isLoading: isItemsLoading } =
    useGetPlaylistItemsQuery({});

  // Mutation to add songs to playlists
  const [addPlaylistItem] = useAddPlaylistItemMutation();

  const playlists: Playlist[] = playlistsData?.data || [];
  const playlistItems: PlaylistItem[] = playlistItemsData?.data || [];

  // Initialize selected playlists with Liked Songs if the song is already in it
  const initialPlaylists = [likedSongs].filter((p) =>
    playlistItems.some(
      (item) => item.playlistId === p.id && item.songId === songId
    )
  );
  const [selectedPlaylists, setSelectedPlaylists] =
    useState<Playlist[]>(initialPlaylists);

  // Filter out the current playlist and playlists that already contain the song
  const filteredPlaylists = playlists.filter(
    (playlist) =>
      playlist.id !== currentPlaylistId &&
      !playlistItems.some(
        (item) => item.playlistId === playlist.id && item.songId === songId
      )
  );

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

  const handleDone = async () => {
    const toastMessages: string[] = [];

    // Handle Liked Songs
    const wasLikedSongsInitiallySelected = initialPlaylists.some(
      (p) => p.id === likedSongs.id
    );
    const isLikedSongsSelected = selectedPlaylists.some(
      (p) => p.id === likedSongs.id
    );
    if (wasLikedSongsInitiallySelected && !isLikedSongsSelected) {
      toastMessages.push("Removed from Liked Songs");
      // Note: You may need a delete mutation for Liked Songs if it's a separate entity
    } else if (!wasLikedSongsInitiallySelected && isLikedSongsSelected) {
      try {
        if (!songId) {
          throw new Error("songId is undefined");
        }
        await addPlaylistItem({ playlistId: likedSongs.id, songId }).unwrap();
        toastMessages.push("Added to Liked Songs");
      } catch (error) {
        toastMessages.push("Failed to add to Liked Songs");
      }
    }

    // Handle other playlists
    const newPlaylists = selectedPlaylists.filter(
      (p) => p.id !== likedSongs.id
    );
    for (const playlist of newPlaylists) {
      if (!initialPlaylists.some((initial) => initial.id === playlist.id)) {
        try {
          if (!songId) {
            throw new Error("songId is undefined");
          }
          await addPlaylistItem({ playlistId: playlist.id, songId }).unwrap();
          toastMessages.push(`Added to ${playlist.title}`);
        } catch (error) {
          toastMessages.push(`Failed to add to ${playlist.title}`);
        }
      }
    }

    console.log(
      "Done with selection:",
      selectedPlaylists.map((p) => p.title)
    );
    navigation.goBack()
  };

  const isSelected = (playlist: Playlist) =>
    selectedPlaylists.some((p) => p.id === playlist.id);

  const isSongInPlaylist = (playlist: Playlist) =>
    playlistItems.some(
      (item) => item.playlistId === playlist.id && item.songId === songId
    );

  if (isPlaylistsLoading || isItemsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <YStack flex={1} bg="#000" pt="$4">
      <XStack items="center" mb="$4">
        <Button
          icon={<ArrowLeft size="$1" color="white" />}
          bg="transparent"
          hoverStyle={{ bg: "transparent" }}
          pressStyle={{ bg: "transparent", borderBlockColor: "transparent" }}
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
          onPress={() => navigation.navigate("CreatePlaylist")}
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
          <TouchableOpacity
            onPress={() => handleSelectPlaylist(likedSongs)}
            disabled={isSongInPlaylist(likedSongs)}
          >
            <XStack
              items="center"
              justify="space-between"
              py="$2"
              borderBottomColor="rgba(255, 255, 255, 0.1)"
              opacity={isSongInPlaylist(likedSongs) ? 0.5 : 1}
            >
              <XStack items="center" gap="$3">
                <Heart size="$1" color="white" />
                <Text color="white" fontSize={16}>
                  {likedSongs.title}
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
          <XStack items="center">
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
              disabled={isSongInPlaylist(playlist)}
            >
              <XStack
                items="center"
                justify="space-between"
                py="$2"
                borderBottomColor="rgba(255, 255, 255, 0.1)"
                opacity={isSongInPlaylist(playlist) ? 0.5 : 1}
              >
                <XStack items="center" gap="$2">
                  <Image
                    source={{
                      uri:
                        playlist.coverImage ||
                        "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
                    }}
                    width={40}
                    height={40}
                    borderRadius={4}
                  />
                  <Text color="white" fontSize={16}>
                    {playlist.title}
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
