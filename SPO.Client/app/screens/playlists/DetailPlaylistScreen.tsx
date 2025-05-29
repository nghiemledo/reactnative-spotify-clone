import { Animated, Dimensions, StatusBar, View } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Button,
  H3,
  Input,
  Avatar,
} from "tamagui";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Globe,
  ArrowDownCircle,
  UserPlus,
  Share2,
  Shuffle,
  Search,
  EllipsisVertical,
  Play,
  Plus,
  ChevronsUpDown,
  Pen,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import { Song } from "../../types/song";
import SortBottomSheet from "../../components/library/SortBottomSheet";
import SongOptionsBottomSheet from "../../components/search/SongOptionsBottomSheet";
import PlaylistOptionsBottomSheet from "../../components/playlist/PlaylistOptionsBottomSheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import {
  useDeletePlaylistMutation,
  useGetPlaylistByIdQuery,
} from "../../services/playlistServices";
import {
  useDeletePlaylistItemMutation,
  useGetPlaylistItemsQuery,
} from "../../services/playlistItemServices";
import { useLazyGetSongByIdQuery } from "../../services/SongService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetUserByIdQuery } from "../../services/AuthService";
import { useLazyGetArtistByIdQuery } from "../../services/ArtistService";
import { SongItem } from "../../components/song/SongItem";

interface SongWithPlaylist extends Song {
  playlistItemId?: string;
}

const DetailPlaylistScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { id } = route.params;

  const { data: playlistData } = useGetPlaylistByIdQuery(id);

  const { data: playlistItemsData } = useGetPlaylistItemsQuery({
    playlistId: id,
  });

  const { data: userData } = useGetUserByIdQuery(
    playlistData?.data?.userId || ""
  );

  const [songs, setSongs] = useState<SongWithPlaylist[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("customerOrder");
  const [sortedItems, setSortedItems] = useState<SongWithPlaylist[]>([]);
  const [isSongOptionsOpen, setIsSongOptionsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongWithPlaylist | null>(
    null
  );
  const [isPlaylistOptionsOpen, setIsPlaylistOptionsOpen] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const [triggerGetSongById] = useLazyGetSongByIdQuery();
  const [triggerGetArtistById] = useLazyGetArtistByIdQuery();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [deletePlaylistItem] = useDeletePlaylistItemMutation();
  dayjs.extend(relativeTime);

  useEffect(() => {
    if (playlistItemsData?.data?.length) {
      const fetchSongs = async () => {
        const songPromises = playlistItemsData.data.map(async (item) => {
          if (item.playlistId === id) {
            try {
              const result = await triggerGetSongById(item.songId).unwrap();
              if (!result.data.artistId) {
                throw new Error("artistId is undefined");
              }
              const artist = await triggerGetArtistById(result.data.artistId);
              return {
                ...result.data,
                createdAt: item.createdAt,
                artist: artist.data?.data.name,
                playlistItemId: item.id,
              };
            } catch (error) {
              console.error(
                "Failed to fetch song with ID:",
                item.songId,
                error
              );
              return null;
            }
          }
        });

        const fetchedSongs = await Promise.all(songPromises);
        setSongs(fetchedSongs.filter(Boolean) as Song[]);
      };

      fetchSongs();
    }
  }, [playlistItemsData]);

  const navbarBackground = scrollY.interpolate({
    inputRange: [190, 220],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(51, 51, 51, 1)"],
    extrapolate: "clamp",
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [200, 230],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const searchOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const imageSize = {
    width: scrollY.interpolate({
      inputRange: [0, 150],
      outputRange: [screenWidth * 0.5, screenWidth * 0.3],
      extrapolate: "clamp",
    }),
    height: scrollY.interpolate({
      inputRange: [0, 150],
      outputRange: [screenWidth * 0.5, screenWidth * 0.3],
      extrapolate: "clamp",
    }),
  };

  const opacity = scrollY.interpolate({
    inputRange: [150, 300],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (songs.length > 0) {
      let sorted = [...songs];
      switch (selectedSortOption) {
        case "customerOrder":
        case "recentlyAdded":
          sorted.sort(
            (a, b) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
          );
          break;
        case "title":
          sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
          break;
        case "artist":
          sorted.sort((a, b) => (a.artist || "").localeCompare(b.artist || ""));
          break;
        default:
          break;
      }
      setSortedItems(sorted);
    }
  }, [selectedSortOption, songs]);

  const handleSelectSortOption = (option: string) => {
    setSelectedSortOption(option);
    setIsSortSheetOpen(false);
  };

  const handleSelectSongOption = async (option: string) => {
    if (!selectedSong) return;
    switch (option) {
      case "addToOtherPlaylist":
        navigation.navigate("AddToPlaylist", {
          songId: selectedSong.id,
          currentPlaylistId: id,
        });
        break;
      case "removeFromThisPlaylist":
        setSortedItems(
          sortedItems.filter((item) => item.id !== selectedSong.id)
        );
        if (selectedSong.playlistItemId) {
          await deletePlaylistItem(selectedSong.playlistItemId).unwrap();
        }
        break;
      case "goToAlbum":
        console.log(`Navigate to album for ${selectedSong.title}`);
        break;
      case "goToArtist":
        console.log(`Navigate to artist ${selectedSong.artist}`);
        break;
      case "share":
        console.log(`Share ${selectedSong.title}`);
        break;
      case "goToSongRadio":
        console.log(`Go to song radio for ${selectedSong.title}`);
        break;
      case "viewSongCredits":
        console.log(`View credits for ${selectedSong.title}`);
        break;
      case "showSpotifyCode":
        console.log(`Show Spotify code for ${selectedSong.title}`);
        break;
      default:
        break;
    }
    setIsSongOptionsOpen(false);
    setSelectedSong(null);
  };

  const handleSelectPlaylistOption = async (option: string) => {
    switch (option) {
      case "addToThisPlaylist":
        navigation.navigate("AddSongPlaylist", { playlistId: id });
        break;
      case "editPlaylist":
        navigation.navigate("updateSongPlaylist", { playlistId: id });
        break;
      case "deletePlaylist":
        await deletePlaylist({ playlistId: id }).unwrap();
        navigation.goBack();
        break;
      case "share":
        console.log("Share this playlist");
        break;
      case "showSpotifyCode":
        console.log("Show Spotify code for this playlist");
        break;
      default:
        break;
    }
    setIsPlaylistOptionsOpen(false);
  };

  if (!playlistData?.data) {
    return <Text color="white">Playlist not found</Text>;
  }

  const playlist = playlistData.data;

  return (
    <LinearGradient
      p={0}
      m={0}
      flex={1}
      colors={["#D9F99D", "#000000"]}
      start={[0, 0]}
      end={[0, 0.5]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Animated.View
        style={{
          position: "absolute",
          top: -35,
          left: 0,
          right: 0,
          height: 90,
          zIndex: 1000,
          backgroundColor: navbarBackground,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: StatusBar.currentHeight || 44,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Button
                size="$8"
                chromeless
                icon={ArrowLeft}
                color="white"
                p={0}
                bg="transparent"
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
            </TouchableOpacity>
            <Animated.Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                opacity: titleOpacity,
                marginLeft: 8,
              }}
            >
              {playlist.title}
            </Animated.Text>
          </View>
          <XStack width={40} />
        </View>
      </Animated.View>

      {songs.length === 0 ? (
        <YStack flex={1} mt="$0" p="$4" justify="center" items="center">
          <Animated.Image
            source={{
              uri:
                playlist.coverImage ||
                "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
            }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
              opacity,
              borderRadius: 8,
              alignSelf: "center",
              marginBottom: 16,
            }}
            resizeMode="cover"
            defaultSource={{
              uri: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
            }}
          />
          <H3 mb="$3" color="white" fontWeight="bold">
            {playlist.title}
          </H3>
          <Text fontSize={13} fontWeight="bold" color="white" mb="$4">
            Created by: {userData?.data.fullName}
          </Text>
          <Button
            size="$4"
            bg="rgba(255, 255, 255, 0.2)"
            rounded={50}
            onPress={() =>
              navigation.navigate("AddSongPlaylist", { playlistId: id })
            }
          >
            <XStack items="center" space="$2">
              <Plus color="white" size="$2" />
              <Text color="white" fontWeight="bold" fontSize="$4">
                Add to this playlist
              </Text>
            </XStack>
          </Button>
        </YStack>
      ) : (
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          <YStack flex={1} mt="$0" p="$4">
            <Animated.View style={{ opacity: searchOpacity }}>
              <XStack mt="$6" mb="$6">
                <Input
                  size="$3.5"
                  borderWidth={0}
                  rounded="$2"
                  bg="rgba(255, 255, 255, 0.2)"
                  color="white"
                  placeholder="Search in playlist"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  flex={1}
                  m="auto"
                  style={{
                    fontSize: 15,
                    paddingLeft: 40,
                    fontWeight: "bold",
                  }}
                  focusStyle={{
                    borderWidth: 0,
                    bg: "rgba(255, 255, 255, 0.3)",
                  }}
                  onFocus={() =>
                    navigation.navigate("SearchInPlaylist", {
                      Items: sortedItems,
                    })
                  }
                />
                <XStack
                  position="absolute"
                  l="$3"
                  t="$2.5"
                  items="center"
                  pointerEvents="none"
                >
                  <Search size="$1" color="rgba(255, 255, 255, 0.6)" />
                </XStack>
              </XStack>
            </Animated.View>
            <XStack
              items="center"
              flex={1}
              justify="center"
              self="center"
              mb={0}
              p={0}
            >
              <Animated.Image
                source={{
                  uri:
                    playlist.coverImage ||
                    "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
                }}
                style={{
                  width: imageSize.width,
                  height: imageSize.height,
                  opacity,
                  borderRadius: 8,
                  alignSelf: "center",
                }}
                resizeMode="cover"
                defaultSource={{
                  uri: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
                }}
              />
            </XStack>

            <H3 mt={0} mb="$3" color="white" fontWeight="bold">
              {playlist.title}
            </H3>

            <YStack>
              <XStack items="center" space="$3" mb="$3">
                <Avatar circular size="$2">
                  <Avatar.Image
                    accessibilityLabel="Cam"
                    src={
                      playlist.coverImage ||
                      "https://images.unsplash.com/photo-1507838153414-b4b713384a76"
                    }
                  />
                  <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
                <YStack items="center">
                  <Text
                    fontSize={13}
                    fontWeight="bold"
                    color="white"
                    text="center"
                  >
                    {userData?.data.fullName}
                  </Text>
                </YStack>
              </XStack>
              <XStack items="center" space="$2" mb="$3">
                <Globe size={18} color="#ffff" />
                <YStack items="center">
                  <Text
                    fontSize={13}
                    fontWeight="bold"
                    color="white"
                    text="center"
                  >
                    {dayjs(playlist.createdAt).fromNow()}
                  </Text>
                </YStack>
              </XStack>
            </YStack>

            <XStack space="$4" mb="$4" justify="space-between">
              <XStack gap="$4">
                <Button
                  disabled
                  bg="transparent"
                  color="white"
                  m={0}
                  p={0}
                  icon={
                    <ArrowDownCircle size="$2" color="white" strokeWidth={1} />
                  }
                  hoverStyle={{ bg: "transparent" }}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
                <Button
                  disabled
                  bg="transparent"
                  color="white"
                  m={0}
                  p={0}
                  icon={<UserPlus size="$2" color="white" strokeWidth={1} />}
                  hoverStyle={{ bg: "transparent" }}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
                <Button
                  disabled
                  bg="transparent"
                  color="white"
                  m={0}
                  p={0}
                  icon={<Share2 size="$2" color="white" strokeWidth={1} />}
                  hoverStyle={{ bg: "transparent" }}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
                <Button
                  bg="transparent"
                  color="white"
                  m={0}
                  p={0}
                  onPress={() => setIsPlaylistOptionsOpen(true)}
                  icon={
                    <EllipsisVertical size="$2" color="white" strokeWidth={1} />
                  }
                  hoverStyle={{ bg: "transparent" }}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
              </XStack>
              <XStack gap="$4">
                <Button
                  disabled
                  bg="transparent"
                  color="white"
                  m={0}
                  p={0}
                  icon={<Shuffle size="$2" color="white" strokeWidth={1} />}
                  hoverStyle={{ bg: "transparent" }}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
                <Button
                  disabled
                  bg="#1DB954"
                  m={0}
                  p={0}
                  rounded={100}
                  width="$4"
                  height="$4"
                  icon={
                    <Play
                      size="$2"
                      color="black"
                      fill="black"
                      strokeWidth={1}
                    />
                  }
                />
              </XStack>
            </XStack>

            <XStack space="$2" mb="$4">
              <Button
                size="$3"
                bg="rgba(255, 255, 255, 0.2)"
                rounded={50}
                onPress={() =>
                  navigation.navigate("AddSongPlaylist", { playlistId: id })
                }
              >
                <XStack items="center" space="$1">
                  <Plus color="white" size="$1" />
                  <Text fontWeight="bold" color="white" fontSize="$3">
                    Add
                  </Text>
                </XStack>
              </Button>
              <Button
                size="$3"
                bg="rgba(255, 255, 255, 0.2)"
                rounded={50}
                onPress={() => setIsSortSheetOpen(true)}
              >
                <XStack items="center" space="$1">
                  <ChevronsUpDown color="white" size="$1" />
                  <Text fontWeight="bold" color="white" fontSize="$3">
                    Sort
                  </Text>
                </XStack>
              </Button>
              <Button
                size="$3"
                bg="rgba(255, 255, 255, 0.2)"
                rounded={50}
                onPress={() =>
                  navigation.navigate("updateSongPlaylist", { playlistId: id })
                }
              >
                <XStack items="center" space="$1">
                  <Pen color="white" size="$1" />
                  <Text fontWeight="bold" color="white" fontSize="$3">
                    Edit
                  </Text>
                </XStack>
              </Button>
            </XStack>
            {sortedItems?.map((item: Song, index: number) => (
              <SongItem
                key={item.id || `song-${item.title}`}
                song={item}
                index={index}
                showIndex={false}
                showImage={true}
                showArtistName={true}
                imageSize={60}
                getArtistName={() => item.artist || ""}
                screen="home"
                onMorePress={() => {
                  setSelectedSong(item);
                  setIsSongOptionsOpen(true);
                }}
              />
            ))}
          </YStack>
        </ScrollView>
      )}

      {songs.length > 0 && (
        <>
          <SortBottomSheet
            isOpen={isSortSheetOpen}
            onClose={() => setIsSortSheetOpen(false)}
            onSelectOption={handleSelectSortOption}
            selectedOption={selectedSortOption}
            context="detailPlaylist"
          />

          {selectedSong && (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                height: "100%",
              }}
            >
              <SongOptionsBottomSheet
                isOpen={isSongOptionsOpen}
                onClose={() => {
                  setIsSongOptionsOpen(false);
                  setSelectedSong(null);
                }}
                onSelectOption={handleSelectSongOption}
                songName={selectedSong.title || ""}
                urlAvatar={
                  selectedSong.coverImage ||
                  "https://images.unsplash.com/photo-1507838153414-b4b713384a76"
                }
                type="Song"
                artists={[
                  {
                    id: parseInt(selectedSong.id || "0"),
                    name: selectedSong.artist || "",
                  },
                ]}
                context="detailPlaylist"
              />
            </View>
          )}

          {isPlaylistOptionsOpen && (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                height: "100%",
              }}
            >
              <PlaylistOptionsBottomSheet
                isOpen={isPlaylistOptionsOpen}
                onClose={() => setIsPlaylistOptionsOpen(false)}
                onSelectOption={handleSelectPlaylistOption}
                playlistName={playlist.title}
                urlAvatar={
                  playlist.coverImage ||
                  "https://images.unsplash.com/photo-1507838153414-b4b713384a76"
                }
                creator={userData?.data.fullName || ""}
              />
            </View>
          )}
        </>
      )}
    </LinearGradient>
  );
};

export default DetailPlaylistScreen;
