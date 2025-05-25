import { memo, useState } from "react";
import {
  YStack,
  XStack,
  Button,
  Text,
  View,
  Input,
  Image,
  Dialog,
} from "tamagui";
import { TouchableOpacity, StatusBar } from "react-native";
import { ArrowLeft, CircleMinus, Menu } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Toast, { BaseToastProps } from "react-native-toast-message";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { LibraryStackParamList } from "../../navigation/LibraryNavigator";

const songs = [
  {
    id: 1,
    type: "artist",
    name: "HieuThuHai",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    type: "song",
    name: "HieuThuHai",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    type: "song",
    name: "Hà Nội",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
      { id: 3, name: "dangrangto" },
      { id: 4, name: "tlinh" },
      { id: 5, name: "mck" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    type: "song",
    name: "Hà Nội",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
      { id: 3, name: "dangrangto" },
      { id: 4, name: "tlinh" },
      { id: 5, name: "mck" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 5,
    type: "song",
    name: "Hà Nội",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
      { id: 3, name: "dangrangto" },
      { id: 4, name: "tlinh" },
      { id: 5, name: "mck" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 6,
    type: "song",
    name: "Hà Nội",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
      { id: 3, name: "dangrangto" },
      { id: 4, name: "tlinh" },
      { id: 5, name: "mck" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 7,
    type: "song",
    name: "Hà Nội",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
      { id: 3, name: "dangrangto" },
      { id: 4, name: "tlinh" },
      { id: 5, name: "mck" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 8,
    type: "song",
    name: "Hà Nội",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
      { id: 3, name: "dangrangto" },
      { id: 4, name: "tlinh" },
      { id: 5, name: "mck" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
];

type updateSongPlaylistNavigationProp = NativeStackNavigationProp<
  LibraryStackParamList,
  "updateSongPlaylist"
>;

const updateSongPlaylist = ({
  navigation,
}: {
  navigation: updateSongPlaylistNavigationProp;
}) => {
  const [playlistName, setPlaylistName] = useState<string>("My playlist");
  const [songList, setSongList] = useState(songs);
  const [description, setDescription] = useState<string>("");
  const [isEditingDescription, setIsEditingDescription] =
    useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg"
  );

  const onDragEnd = ({ data }: { data: typeof songs }) => {
    console.log("onDragEnd data:", JSON.stringify(data, null, 2));
    const idSet = new Set(data.map((item) => item.id));
    if (idSet.size !== data.length) {
      console.warn("Duplicate IDs detected in songList:", data);
      const fixedData = data.map((item, index) => ({
        ...item,
        id: item.id ?? index + 1,
      }));
      setSongList(fixedData);
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text color="white">Save</Text>
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
                      {item.type}
                      {item.artists
                        ? " • " +
                          item.artists.map((artist) => artist.name).join(", ")
                        : ""}
                    </Text>
                  </YStack>
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
