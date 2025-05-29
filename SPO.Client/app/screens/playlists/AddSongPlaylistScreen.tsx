import { memo, useState } from "react";
import { YStack, XStack, Button, Text, View, ScrollView, Image } from "tamagui";
import { TouchableOpacity, StatusBar, FlatList } from "react-native";
import { ArrowLeft, CircleCheck, CirclePlus } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { H6 } from "tamagui";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetSongsQuery } from "../../services/SongService";
import {
  useAddPlaylistItemMutation,
  useGetPlaylistItemsQuery,
} from "../../services/playlistItemServices";

const toastConfig = {
  success: ({ text1 }: BaseToastProps) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <XStack style={{ flex: 1 }} justify="space-between">
        <Text fontSize="$3">{text1}</Text>
      </XStack>
    </View>
  ),
};

const AddSongPlaylistScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { playlistId } = route.params || {};

  const { data: songsData } = useGetSongsQuery();
  const { data: playlistItemsData } = useGetPlaylistItemsQuery({ playlistId });
  const [addPlaylistItem] = useAddPlaylistItemMutation();
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  const existingSongIds = new Set(
    playlistItemsData?.data
      ?.filter((item) => item.playlistId === playlistId)
      .map((item) => item.songId) || []
  );

  const handlePress = async (songId: string) => {
    if (!songId) {
      Toast.show({
        type: "success",
        text1: "Song ID is missing",
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    if (!playlistId) {
      Toast.show({
        type: "success",
        text1: "Playlist ID is missing",
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    if (existingSongIds.has(songId)) {
      Toast.show({
        type: "success",
        text1: "Song already in playlist",
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    setLikedItems((prev) => {
      const isLiked = prev[songId];
      if (!isLiked) {
        addPlaylistItem({ playlistId, songId, episodeId: undefined })
          .unwrap()
          .then(() => {
            Toast.show({
              type: "success",
              text1: "Added to playlist",
              position: "bottom",
              visibilityTime: 2000,
              autoHide: true,
            });
          })
          .catch((err) => {
            Toast.show({
              type: "success",
              text1: `Failed to add song: ${err.message || "Unknown error"}`,
              position: "bottom",
              visibilityTime: 2000,
              autoHide: true,
            });
          });
      }
      return { ...prev, [songId]: !isLiked };
    });
  };

  if (!songsData?.data) {
    return <Text color="white">No songs found</Text>;
  }

  return (
    <YStack flex={1} bg="#111" px={24} pt={60}>
      <XStack
        position="absolute"
        t={-30}
        l={-10}
        r={0}
        height={80}
        items="center"
        px="$3"
        bg="#000"
        z={1000}
        pt={StatusBar.currentHeight || 20}
      >
        <XStack flex={1} justify="flex-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Button
              size="$8"
              chromeless
              icon={<ArrowLeft color="white" />}
              color="white"
              p={0}
              bg="transparent"
              pressStyle={{
                bg: "transparent",
                borderBlockColor: "transparent",
              }}
            />
          </TouchableOpacity>
        </XStack>

        <XStack flex={2} justify="center">
          <Text fontSize="$4" fontWeight="bold" color="white" text="center">
            Add song to this playlist
          </Text>
        </XStack>

        <XStack flex={1} />
      </XStack>

      <YStack bg={"#333"} rounded={8} p="$3" height="85%">
        <H6 color={"white"} fontWeight={"bold"} pb={"$2"}>
          Recently played
        </H6>
        <ScrollView scrollEventThrottle={16}>
          <FlatList
            data={songsData.data}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const isInPlaylist = item.id
                ? existingSongIds.has(item.id)
                : false;
              const isLiked = likedItems[item.id ?? ""] || isInPlaylist;

              return (
                <TouchableOpacity>
                  <XStack items="center" justify="space-between" py="$2">
                    <XStack items="center" gap="$3" flex={1} pr="$2">
                      <Image
                        source={{
                          uri:
                            item.coverImage ||
                            "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
                        }}
                        width={50}
                        height={50}
                        borderRadius={8}
                      />
                      <YStack flex={1}>
                        <Text fontSize={15} fontWeight="300" color="white">
                          {item.title}
                        </Text>
                      </YStack>
                    </XStack>
                    <Button
                      bg="transparent"
                      p={0}
                      disabled={isInPlaylist} // Vô hiệu hóa nếu bài hát đã trong danh sách phát
                      icon={
                        isLiked ? (
                          <CircleCheck
                            size="$1"
                            color="white"
                            strokeWidth={1}
                            bg="#1DB954"
                            rounded="$10"
                            borderColor="#333"
                          />
                        ) : (
                          <CirclePlus size="$1" color="white" strokeWidth={1} />
                        )
                      }
                      pressStyle={{
                        bg: "transparent",
                        borderBlockColor: "transparent",
                      }}
                      onPress={() => handlePress(item.id as string)}
                    />
                  </XStack>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => item.id ?? `song-${index}`} // Cải thiện keyExtractor để tránh lỗi
          />
        </ScrollView>
      </YStack>
      <Toast config={toastConfig} />
    </YStack>
  );
};

export default memo(AddSongPlaylistScreen);
