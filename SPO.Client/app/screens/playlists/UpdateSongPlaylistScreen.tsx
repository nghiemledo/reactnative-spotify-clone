import { memo, useState, useEffect } from "react";
import { YStack, XStack, Button, Text, Input, Image, Dialog } from "tamagui";
import { TouchableOpacity, StatusBar } from "react-native";
import { ArrowLeft, CircleMinus, Menu } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useGetPlaylistByIdQuery,
  useUpdatePlaylistMutation,
} from "../../services/playlistServices"; // Added useUpdatePlaylistMutation
import {
  useDeletePlaylistItemMutation,
  useGetPlaylistItemsQuery,
} from "../../services/playlistItemServices";
import { useLazyGetSongByIdQuery } from "../../services/SongService";
import { Song } from "../../types/song";
interface SongWithPlaylist extends Song {
  playlistItemId?: string;
}

const updateSongPlaylist = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { playlistId } = route.params;

  const { data: playlistData } = useGetPlaylistByIdQuery(playlistId);
  const { data: playlistItemsData } = useGetPlaylistItemsQuery({ playlistId });
  const [triggerGetSongById] = useLazyGetSongByIdQuery();
  const [updatePlaylist, { isLoading: isUpdating }] =
    useUpdatePlaylistMutation(); // Added mutation hook

  const [playlistName, setPlaylistName] = useState<string>(
    playlistData?.data?.title || "My playlist"
  );
  const [songList, setSongList] = useState<SongWithPlaylist[]>([]);
  const [description, setDescription] = useState<string>(
    playlistData?.data?.description || ""
  );
  const [isEditingDescription, setIsEditingDescription] =
    useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    playlistData?.data?.coverImage ||
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76"
  );
  const [deletePlaylistItem, { isLoading: isDeleting }] =
    useDeletePlaylistItemMutation();

  useEffect(() => {
    if (playlistItemsData?.data?.length) {
      const fetchSongs = async () => {
        const songPromises = playlistItemsData.data.map(async (item) => {
          if (item.playlistId === playlistId) {
            try {
              const result = await triggerGetSongById(item.songId).unwrap();
              return {
                ...result.data,
                createdAt: item.createdAt,
                playlistItemId: item.id,
              };
            } catch (error) {
              return null;
            }
          }
        });

        const fetchedSongs = await Promise.all(songPromises);
        setSongList(fetchedSongs.filter(Boolean) as SongWithPlaylist[]);
      };

      fetchSongs();
    }
  }, [playlistItemsData, playlistId, triggerGetSongById]);

  useEffect(() => {
    if (playlistData?.data) {
      setPlaylistName(playlistData.data.title || "My playlist");
      setDescription(playlistData.data.description || "");
      setImageUrl(
        playlistData.data.coverImage ||
          "https://images.unsplash.com/photo-1507838153414-b4b713384a76"
      );
    }
  }, [playlistData]);

  const onDragEnd = ({ data }: { data: Song[] }) => {
    const idSet = new Set(data.map((item) => item.id));
    if (idSet.size !== data.length) {
      const fixedData = data.map((item, index) => ({
        ...item,
        id: item.id ? String(item.id) : String(index + 1),
      }));
      setSongList(fixedData as Song[]);
    } else {
      setSongList(data);
    }
  };

  const handleDescriptionSubmit = () => {
    setIsEditingDescription(false);
  };

  const handleSaveImage = () => {
    if (imageUrl) {
      setImageUrl(imageUrl);
    }
    setOpenModal(false);
  };

  const handleSave = async () => {
    if (!playlistId) {
      console.error("Playlist ID is missing");
      return;
    }
    if (!playlistData?.data?.userId) {
      console.error("User ID is missing");
      return;
    }
    try {
      await updatePlaylist({
        id: playlistId,
        title: playlistName,
        description: description || null,
        coverImage: imageUrl || null,
        userId: playlistData.data.userId,
        isPublic: playlistData.data.isPublic || false,
      }).unwrap();
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save playlist:", error);
    }
  };

  return (
    <YStack flex={1} bg="#111" px={24} pt={60}>
      <XStack
        position="absolute"
        t={-30}
        l={-10}
        r={0}
        height={100}
        items="center"
        px="$3"
        z={1000}
        pt={StatusBar.currentHeight || 20}
        justify="space-between"
      >
        <XStack flex={1} justify="space-between">
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

        <XStack flex={1} justify="center">
          <Text fontSize="$4" fontWeight="bold" color="white" text="center">
            Edit Playlist
          </Text>
        </XStack>

        <XStack flex={1} justify="flex-end">
          <TouchableOpacity onPress={handleSave}>
            <Text color="white">{isUpdating ? "Saving..." : "Save"}</Text>
          </TouchableOpacity>
        </XStack>
      </XStack>

      <YStack
        items="center"
        justify="center"
        self="center"
        mb="$5"
        mt="$2"
        p={0}
        onPress={() => console.log("long")}
      >
        <Image
          source={{ uri: imageUrl }}
          width="$15"
          height="$15"
          rounded="$7"
          resizeMode="stretch"
          onPress={() => setOpenModal(true)}
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
          defaultSource={{ uri: "https://via.placeholder.com/150" }}
        />
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Text color="white" fontWeight="bold">
            Change image
          </Text>
        </TouchableOpacity>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <Dialog.Portal>
            <Dialog.Overlay
              bg="rgba(0,0,0,0.3)"
              onPress={() => setOpenModal(false)}
            />
            <Dialog.Content bordered elevate px="$4" py="$4" width="70%">
              <Dialog.Title fontSize="$5">Change Image</Dialog.Title>
              <Dialog.Description>Enter a new image URL</Dialog.Description>
              <Input
                placeholder="Enter image URL"
                value={imageUrl}
                bg="transparent"
                onChangeText={setImageUrl}
                width="100%"
                mt="$3"
              />
              {imageUrl ? (
                <Image
                  source={{ uri: imageUrl }}
                  alt="Preview"
                  width="100%"
                  height={200}
                  mt="$3"
                  resizeMode="contain"
                  onError={() => console.log("Image preview load error")}
                />
              ) : null}
              <XStack justify="flex-end" mt="$4" gap="$3">
                <Button onPress={() => setOpenModal(false)}>Cancel</Button>
                <Button onPress={handleSaveImage}>Save</Button>
              </XStack>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
        <YStack>
          <Input
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            color="white"
            fontSize={33}
            borderWidth={0}
            borderBottomWidth="$0.25"
            bg="transparent"
            fontWeight="bold"
            text="center"
            my="$4"
            height="$4"
            px="$18"
            width="100%"
            value={playlistName}
            onChangeText={setPlaylistName}
          />
        </YStack>
        <YStack>
          {isEditingDescription ? (
            <Input
              placeholder="Give your playlist a catchy description"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              color="white"
              fontSize={15}
              borderWidth={0}
              borderBottomWidth="$0.25"
              bg="transparent"
              fontWeight="bold"
              text="center"
              height="$4"
              px="$18"
              width="100%"
              value={description}
              onChangeText={setDescription}
              onSubmitEditing={handleDescriptionSubmit}
              onBlur={handleDescriptionSubmit}
              autoFocus
            />
          ) : (
            <Button
              bg="transparent"
              color="white"
              borderColor="white"
              borderWidth={1}
              rounded="$10"
              height="$2"
              px="$4"
              fontWeight="bold"
              fontSize="$2"
              onPress={() => setIsEditingDescription(true)}
            >
              Add description
            </Button>
          )}
        </YStack>
      </YStack>

      {/* Song List Section */}
      <YStack flex={1} rounded={8} p="$3">
        <DraggableFlatList
          data={songList}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : `fallback-${index}`
          }
          onDragEnd={onDragEnd}
          renderItem={({ item, drag, isActive }) => (
            <ScaleDecorator>
              <XStack
                items="center"
                justify="space-between"
                py="$2"
                opacity={isActive ? 0.7 : 1}
                disabled={isActive}
              >
                <XStack items="center" gap="$3" flex={1} pr="$2">
                  <Button
                    bg="transparent"
                    p={0}
                    icon={
                      <CircleMinus size="$1" color="white" strokeWidth={1} />
                    }
                    pressStyle={{
                      bg: "transparent",
                      borderBlockColor: "transparent",
                    }}
                    onPress={async () => {
                      try {
                        if (item.playlistItemId) {
                          await deletePlaylistItem(
                            item.playlistItemId
                          ).unwrap();
                          setSongList((prev) =>
                            prev.filter((song) => song.id !== item.id)
                          );
                        }
                      } catch (error) {
                        console.error("Failed to delete playlist item:", error);
                      }
                    }}
                    disabled={isDeleting}
                  />
                  <XStack items="center" gap="$3" flex={1}>
                    <Image
                      source={{
                        uri:
                          item.coverImage || "https://via.placeholder.com/150",
                      }}
                      width={50}
                      height={50}
                      rounded="$2"
                      resizeMode="cover"
                    />
                    <YStack flex={1}>
                      <Text fontSize={15} fontWeight="300" color="white">
                        {item.title}
                      </Text>
                      <Text
                        fontSize={13}
                        fontWeight="300"
                        color="rgba(255, 255, 255, 0.7)"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.artist}
                      </Text>
                    </YStack>
                  </XStack>
                </XStack>
                <Button
                  bg="transparent"
                  p={0}
                  icon={<Menu size="$1" color="white" strokeWidth={1} />}
                  onLongPress={drag}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
              </XStack>
            </ScaleDecorator>
          )}
        />
      </YStack>
    </YStack>
  );
};

export default memo(updateSongPlaylist);
