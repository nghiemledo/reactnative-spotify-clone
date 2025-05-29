import { Animated, Dimensions, StatusBar, View } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Button,
  H3,
  Input,
  Image,
  Avatar,
} from "tamagui";
import { FlatList, TouchableOpacity } from "react-native";
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
import {
  useGetArtistsQuery,
  useLazyGetArtistByIdQuery,
} from "../../services/ArtistService";
import { store, useAppSelector } from "../../store";
import { playSong, setPlayerQueue } from "../../services/playerService";
import { SongItem } from "../../components/song/SongItem";
import SongBottomSheet from "../../components/song/SongBottomSheet";
import { Artist } from "../../types/artist";
import { setQueue as setReduxQueue } from "../../store/playerSlice";
import Toast from "react-native-toast-message";

interface SongWithPlaylist extends Song {
  playlistItemId?: string;
  playlistId?: string;
}

const DetailPlaylistScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const user = useAppSelector((state) => state.auth.user);

  const { id } = route.params;

  const { data: playlistData } = useGetPlaylistByIdQuery(id);
  const { data: playlistItemsData } = useGetPlaylistItemsQuery({
    playlistId: id,
  });
  const { data: userData } = useGetUserByIdQuery(
    playlistData?.data?.userId || ""
  );
  const { data: artists } = useGetArtistsQuery();

  const getArtistName = (artistId: string | undefined) => {
    if (!artistId) return "Unknown Artist";
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.name || "Unknown Artist";
  };

  const [songs, setSongs] = useState<SongWithPlaylist[]>([]);
  const [sortedItems, setSortedItems] = useState<SongWithPlaylist[]>([]);
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("customerOrder");
  const [isSongOptionsOpen, setIsSongOptionsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongWithPlaylist | null>(
    null
  );
  const [isPlaylistOptionsOpen, setIsPlaylistOptionsOpen] = useState(false);
  dayjs.extend(relativeTime);

  const [triggerGetSongById] = useLazyGetSongByIdQuery();
  const [triggerGetArtistById] = useLazyGetArtistByIdQuery();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [deletePlaylistItem] = useDeletePlaylistItemMutation();

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (playlistItemsData?.data?.length) {
      const fetchSongs = async () => {
        try {
          const songPromises = playlistItemsData.data.map(async (item) => {
            if (item.playlistId === id) {
              try {
                const result = await triggerGetSongById(item.songId).unwrap();
                if (!result.data.artistId) {
                  console.error(
                    `artistId is undefined for song ${item.songId}`
                  );
                  return null;
                }
                const artist = await triggerGetArtistById(
                  result.data.artistId
                ).unwrap();
                return {
                  ...result.data,
                  createdAt: item.createdAt,
                  artist: artist.data?.name || "Unknown Artist",
                  playlistItemId: item.id,
                  playlistId: item.playlistId,
                };
              } catch (error) {
                console.error(`Failed to fetch song ${item.songId}:`, error);
                return null;
              }
            }
            return null;
          });
          const fetchedSongs = await Promise.all(songPromises);
          const validSongs = fetchedSongs.filter(Boolean) as SongWithPlaylist[];
          setSongs(validSongs);
          setSortedItems(validSongs);
        } catch (error) {
          console.error("Error fetching songs:", error);
          Toast.show({
            type: "error",
            text1: "Failed to load songs",
            position: "bottom",
          });
        }
      };
      fetchSongs();
    }
  }, [playlistItemsData, id, triggerGetSongById, triggerGetArtistById]);

  // Animation interpolations
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

  const screenWidth = Dimensions.get("window").width;

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
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
      }
      setSortedItems(sorted);
    }
  }, [selectedSortOption, songs]);

  const handleSelectSortOption = (option: string) => {
    setSelectedSortOption(option);
    setIsSortSheetOpen(false);
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
    }
    setIsPlaylistOptionsOpen(false);
  };

  const handleSongPress = async (song: Song) => {
    try {
      await playSong(song);
      navigation.navigate("Playing");
    } catch (error) {
      console.error("Error playing song:", error);
      Toast.show({
        type: "error",
        text1: "Failed to play song",
        position: "bottom",
      });
    }
  };

  const handlePlayAll = async () => {
    if (!sortedItems || sortedItems.length === 0) {
      Toast.show({
        type: "error",
        text1: "No songs available to play",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }
    try {
      const tracks = sortedItems.map((song: SongWithPlaylist) => ({
        id: song.id || `song-${song.title}`,
        url: song.audioUrl ?? "",
        title: song.title ?? "Unknown Title",
        artist: getArtistName(song.artistId) || "Unknown Artist",
        artwork:
          song.coverImage || "https://via.placeholder.com/300?text=No+Image",
        duration: song.duration || 0,
      }));
      store.dispatch(setReduxQueue(tracks));
      await setPlayerQueue(tracks);
      await playSong(sortedItems[0]);
      navigation.navigate("Playing");
      Toast.show({
        type: "success",
        text1: `Playing playlist: ${playlistData?.data?.title}`,
        position: "bottom",
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error("Error playing playlist:", error);
      Toast.show({
        type: "error",
        text1: "Unable to play playlist",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
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

      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id || `song-${item.title}`}
        ListHeaderComponent={
          <YStack mt="$0" p="$4">
            <Animated.View style={{ opacity: searchOpacity }}>
              <XStack mt="$6" mb="$6">
                <Input
                  size="$3.5"
                  borderWidth={0}
                  rounded="$2"
                  bg="rgba(255, 255, 255, 0.2)"
                  color="white"
                  placeholder="Search"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  flex={1}
                  style={{ fontSize: 15, paddingLeft: 40, fontWeight: "bold" }}
                  focusStyle={{
                    borderWidth: 0,
                    bg: "rgba(255, 255, 255, 0.3)",
                  }}
                  onFocus={() => navigation.navigate("SearchResult", {})}
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
            <XStack items="center" justify="center" mb={0} p={0}>
              <Animated.Image
                source={{
                  uri:
                    user?.urlAvatar ||
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
                <Text fontSize={13} fontWeight="bold" color="white">
                  {userData?.data.fullName}
                </Text>
              </XStack>
              <XStack items="center" space="$2" mb="$3">
                <Globe size={18} color="#ffff" />
                <Text fontSize={13} fontWeight="bold" color="white">
                  {dayjs(playlist.createdAt).fromNow()}
                </Text>
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
                  bg="#1DB954"
                  m={0}
                  p={0}
                  rounded={100}
                  width="$4"
                  height="$4"
                  onPress={handlePlayAll}
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
          </YStack>
        }
        renderItem={({ item, index }) => (
          <View style={{ paddingHorizontal: 16}}>
            <SongItem
              key={item.id || `song-${item.title}`}
              song={item}
              index={index}
              showIndex={false}
              showImage={true}
              showArtistName={true}
              imageSize={60}
              getArtistName={() => item.artist || ""}
              screen="detailPlaylist"
              onMorePress={() => {
                console.log("Opening SongBottomSheet for song:", item.title);
                setSelectedSong(item);
                setIsSongOptionsOpen(true);

              }}
            />
          </View>
        )}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />

      <SortBottomSheet
        isOpen={isSortSheetOpen}
        onClose={() => setIsSortSheetOpen(false)}
        onSelectOption={handleSelectSortOption}
        selectedOption={selectedSortOption}
        context="detailPlaylist"
      />
      <SongBottomSheet
        isOpen={isSongOptionsOpen}
        onClose={() => {
          console.log("Closing SongBottomSheet");
          setIsSongOptionsOpen(false);
          setSelectedSong(null);
        }}
        selectedSong={selectedSong}
        navigation={navigation}
        screenType="detailPlaylist"
        sortedItems={sortedItems}
        setSortedItems={setSortedItems}
        deletePlaylistItem={async (id: string) => {
          console.log("Deleting playlist item:", id);
          await deletePlaylistItem(id).unwrap();
        }}
      />
      {isPlaylistOptionsOpen && (
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
      )}
    </LinearGradient>
  );
};

export default DetailPlaylistScreen;
