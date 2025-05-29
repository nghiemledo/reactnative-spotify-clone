import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { Image, Input, Text, View, XStack, YStack } from "tamagui";
import { ArrowLeft, X } from "@tamagui/lucide-icons";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import SongBottomSheet from "../../components/song/SongBottomSheet";
import Tabs from "../../components/search/Tabs";
import { ArtistItem } from "../../components/ArtistItem";
import { SongItem } from "../../components/song/SongItem";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSearchSongsQuery } from "../../services/SongService";
import {
  useLazyGetArtistByIdQuery,
  useSearchArtistsQuery,
} from "../../services/ArtistService";
import { useSearchPodcastShowsQuery } from "../../services/PodcastService";
import { Artist } from "../../types/artist";
import { Song } from "../../types/song";
import { PodcastShow } from "../../types/podcast";
import { HomeStackParamList } from "../../navigation/HomeNavigator";
import { PodcastShowItem } from "../../components/podcast/PodcastShowItem";

const sampleData: Item[] = [
  {
    type: "artist",
    id: "1",
    name: "HieuThuHai",
    bio: "A talented Vietnamese rapper known for his unique style.",
    urlAvatar: "https://i.pravatar.cc/150?img=3",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    type: "song",
    id: "2",
    title: "Hà Nội",
    coverImage: "https://i.pravatar.cc/150?img=4",
    artistId: "1",
    artist: "HieuThuHai",
    duration: 180,
    audioUrl: "https://example.com/audio/hanoi.mp3",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    type: "podcast",
    id: "3",
    title: "Tech Talk Vietnam",
    description: "A podcast about the latest tech trends in Vietnam.",
    coverImage: "https://i.pravatar.cc/150?img=5",
    creator: "hai long",
    categoryId: "1",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
];

interface ArtistSearch extends Artist {
  type: "artist";
}

interface SongSearch extends Song {
  type: "song";
}

interface PodcastShowSearch extends PodcastShow {
  categoryId: string;
  type: "podcast";
}

type Item = ArtistSearch | SongSearch | PodcastShowSearch;

const SearchResultScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const homeNavigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "SearchResult">>();
  const { width, height } = Dimensions.get("window");
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [toastQueue, setToastQueue] = useState<string[]>([]);
  const [isSongOptionsOpen, setIsSongOptionsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongSearch | null>(null);
  const [getArtistById] = useLazyGetArtistByIdQuery();

  const { data: songsData, isLoading: isSongsLoading } =
    useSearchSongsQuery(searchQuery);
  const { data: artistsData, isLoading: isArtistsLoading } =
    useSearchArtistsQuery(searchQuery);
  const { data: podcastsData, isLoading: isPodcastsLoading } =
    useSearchPodcastShowsQuery(searchQuery);

  console.log(searchQuery);

  const combinedData: Item[] = [];
  const [artistCache, setArtistCache] = useState<{
    [key: string]: { name: string; isLoading: boolean };
  }>({});

  useEffect(() => {
    if (!songsData?.data?.length) return;

    const fetchArtists = async () => {
      const uniqueArtistIds = [
        ...new Set(
          songsData.data
            .map((song) => song.artistId)
            .filter((id): id is string => !!id)
        ),
      ];

      for (const artistId of uniqueArtistIds) {
        if (!artistCache[artistId]) {
          setArtistCache((prev) => ({
            ...prev,
            [artistId]: { name: "Loading...", isLoading: true },
          }));

          try {
            const result = await getArtistById(artistId);
            setArtistCache((prev) => ({
              ...prev,
              [artistId]: {
                name: result.data?.data?.name || "Unknown Artist",
                isLoading: false,
              },
            }));
          } catch {
            setArtistCache((prev) => ({
              ...prev,
              [artistId]: { name: "Unknown Artist", isLoading: false },
            }));
          }
        }
      }
    };

    fetchArtists();
  }, [songsData, getArtistById]);

  if (songsData?.data?.length) {
    combinedData.push(
      ...songsData.data.map(
        (song) =>
          ({
            ...song,
            type: "song",
            artist: artistCache[song.artistId || ""]?.name || "Unknown Artist",
          } as SongSearch)
      )
    );
  }
  if (artistsData?.data?.length) {
    combinedData.push(
      ...artistsData.data.map(
        (artist) => ({ ...artist, type: "artist" } as ArtistSearch)
      )
    );
  }
  if (podcastsData?.data?.length) {
    combinedData.push(
      ...podcastsData.data.map(
        (podcast: PodcastShow) =>
          ({ ...podcast, type: "podcast" } as PodcastShowSearch)
      )
    );
  }

  if (
    combinedData.length &&
    !isSongsLoading &&
    !isArtistsLoading &&
    !isPodcastsLoading &&
    searchQuery
  ) {
    combinedData.push(...sampleData);
  }

  const normalize = (s: string) => s.trim().toLowerCase();

  const filteredData =
    searchQuery.trim() === ""
      ? []
      : combinedData.filter((item) => {
          const needle = normalize(searchQuery);

          const matchesSearch =
            normalize(
              item.type === "song"
                ? item.title || ""
                : item.type === "artist"
                ? item.name || ""
                : item.title || ""
            ).includes(needle) ||
            (item.type === "song" &&
              item.artist &&
              normalize(item.artist).includes(needle));
          const matchesTab =
            !selectedTab ||
            selectedTab === "All" ||
            (selectedTab === "Songs" && item.type === "song") ||
            (selectedTab === "Artists" && item.type === "artist") ||
            (selectedTab === "Podcasts" && item.type === "podcast");
          return matchesSearch && matchesTab;
        });

  const toastConfig = {
    success: ({ text1, text2 }: BaseToastProps) => (
      <View
        style={{
          flexDirection: "row",
          justifyItems: "center",
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
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={{ width: 24, height: 24, marginRight: 12 }}
        />
        <XStack justify="space-between" grow={1}>
          <Text fontSize="$3">{text1}</Text>
          {text1 === "Added to liked songs" && (
            <Text
              color="#1DB954"
              fontWeight="bold"
              onPress={() =>
                navigation.navigate("AddToPlaylist", {
                  songId: selectedSong?.id,
                })
              }
            >
              Change
            </Text>
          )}
        </XStack>
      </View>
    ),
  };

  const handlePress = (id: string) => {
    setLikedItems((prev) => {
      const isLiked = prev[id];
      const song = combinedData.find(
        (item) => item.id === id && item.type === "song"
      ) as SongSearch;
      if (!isLiked && song) {
        setSelectedSong(song);
        Toast.show({
          type: "success",
          text1: "Added to liked songs",
          position: "bottom",
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        setSelectedSong(null);
      }
      return { ...prev, [id]: !isLiked };
    });
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchValue);
    setIsSearch(true);
    setSelectedTab(null);
    Keyboard.dismiss();
  };

  const handleInputFocus = () => {
    if (isSearch) {
      setIsSearch(false);
      setSelectedTab(null);
      setSearchQuery("");
      setSearchValue("");
    }
  };

  const handleOpenSongOptionsBottomSheet = (song: Song) => {
    setSelectedSong({ ...song, type: "song" });
    setIsSongOptionsOpen(true);
  };

  const handleCloseSongOptionsBottomSheet = () => {
    setIsSongOptionsOpen(false);
    setSelectedSong(null);
  };

  const handleSongOptionSelect = (option: string) => {
    if (!selectedSong) return;
    switch (option) {
      case "addToLikedSongs":
        handlePress(selectedSong?.id || "");
        break;
      case "addToPlaylist":
        navigation.navigate("AddToPlaylist", { songId: selectedSong.id || "" });
        break;
      case "addToQueue":
        console.log(`Add ${selectedSong.title} to queue`); // Cập nhật console log
        break;
      case "goToArtist":
        if (selectedSong.artistId) {
          navigation.navigate("Artist", { id: selectedSong.artistId });
        } else {
          console.log(`No artist ID for ${selectedSong.artist}`);
        }
        break;
      case "showSpotifyCode":
        navigation.navigate("shareQrSong", { song: selectedSong }); // Cập nhật navigation
        break;
      default:
        console.log(`Unhandled option: ${option}`);
        break;
    }
    handleCloseSongOptionsBottomSheet();
  };

  const handleClearTab = () => {
    setSelectedTab(null);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const toastMessages = route.params?.toastMessages;
      if (toastMessages && Array.isArray(toastMessages)) {
        setToastQueue(toastMessages);
        navigation.setParams({ toastMessages: undefined });
      }
    });
    return unsubscribe;
  }, [navigation, route.params]);

  useEffect(() => {
    if (toastQueue.length > 0) {
      const message = toastQueue[0];
      Toast.show({
        type: "success",
        text1: message,
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
        onHide: () => {
          setToastQueue((prev) => prev.slice(1));
        },
      });
    }
  }, [toastQueue]);

  return (
    <YStack flex={1} bg="#000">
      <View
        style={{ position: "fixed", top: 0, width: "100%", paddingTop: 0 }}
        rounded={7}
        z={1}
        items="center"
        flexDirection="column"
      >
        <XStack py="$1" items="center" mb="$2" bg="rgba(256, 256, 256, 0.3)">
          <Input
            size="$3.5"
            borderWidth={0}
            rounded="$2"
            bg="transparent"
            color="white"
            fontWeight="bold"
            placeholder="What do you want to listen to?"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            flex={1}
            pl="$7"
            value={searchValue}
            onChangeText={setSearchValue}
            onSubmitEditing={handleSearchSubmit}
            onFocus={handleInputFocus}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 12,
              top: 12,
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size="$1" color="white" />
          </TouchableOpacity>
          {searchValue.length > 0 && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 3,
                top: 15,
                alignItems: "center",
              }}
              onPress={() => {
                setSearchValue("");
                setSearchQuery("");
                setIsSearch(false);
                setSelectedTab(null);
              }}
            >
              <X size="$1" color="white" />
            </TouchableOpacity>
          )}
        </XStack>
      </View>
      <Tabs
        isSearch={isSearch}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        handleClearTab={handleClearTab}
      />
      <YStack flex={1} bg="#000" px="$3">
        {isSongsLoading || isArtistsLoading || isPodcastsLoading ? (
          <YStack flex={1} justify="center" items="center">
            <ActivityIndicator size="large" color="#1DB954" />
          </YStack>
        ) : (
          <ScrollView scrollEventThrottle={16}>
            {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id ?? ""}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    {item.type === "song" ? (
                      <SongItem
                        song={item as Song}
                        showImage={true}
                        showArtistName={true}
                        getArtistName={() => item.artist || "Unknown Artist"}
                        onMorePress={handleOpenSongOptionsBottomSheet}
                        screen="search"
                        navigation={navigation}
                      />
                    ) : item.type === "artist" ? (
                      <ArtistItem
                        artist={item as Artist}
                        onPress={() =>
                          navigation.navigate("Artist", { id: item.id })
                        }
                      />
                    ) : item.id ? (
                      <PodcastShowItem
                        item={item as PodcastShow}
                        navigation={homeNavigation}
                      />
                    ) : null}
                  </TouchableOpacity>
                )}
                scrollEnabled={false}
              />
            ) : searchQuery.trim() !== "" ? (
              <YStack
                position="absolute"
                t={height / 2}
                l={width / 2 - 130}
                items="center"
              >
                <Text
                  fontWeight="bold"
                  color="white"
                  fontSize="$6"
                  self="center"
                >
                  No results found
                </Text>
                <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                  Try searching for something else
                </Text>
              </YStack>
            ) : (
              <YStack
                position="absolute"
                t={height / 2}
                l={width / 2 - 130}
                items="center"
              >
                <Text
                  fontWeight="bold"
                  color="white"
                  fontSize="$6"
                  self="center"
                >
                  Play what you love
                </Text>
                <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                  Search for artists, songs, podcasts and more
                </Text>
              </YStack>
            )}
          </ScrollView>
        )}
      </YStack>
      <Toast config={toastConfig} />
      {isSongOptionsOpen && (
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
          <SongBottomSheet
            isOpen={isSongOptionsOpen}
            onClose={handleCloseSongOptionsBottomSheet}
            selectedSong={selectedSong}
            navigation={navigation}
            screenType="search"
            onSelectOption={handleSongOptionSelect}
          />
        </View>
      )}
    </YStack>
  );
};

export default SearchResultScreen;