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
import { useSearchQuery } from "../../services/AuthService";
import { Artist } from "../../types/artist";
import { Song } from "../../types/song";
import { PodcastShow } from "../../types/podcast";
import { HomeStackParamList } from "../../navigation/HomeNavigator";
import { PodcastShowItem } from "../../components/podcast/PodcastShowItem";

// Define interfaces to match SearchResponse
interface SearchArtist {
  id: string;
  name: string;
  coverImage: string;
}

interface SearchSong {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverImage: string;
}

interface SearchPodcastShow {
  id: string;
  title: string;
  creator: string;
  coverImage: string;
  categoryId?: string;
}

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
  const [selectedTab, setSelectedTab] = useState<string | null>(null); // Changed to null
  const [toastQueue, setToastQueue] = useState<string[]>([]);
  const [isSongOptionsOpen, setIsSongOptionsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const { data: searchData, isLoading: isSearchLoading } = useSearchQuery(
    { query: searchQuery, limit: 10 },
    { skip: !searchQuery }
  );

  // Debug log to check search query and data
  useEffect(() => {
    console.log("Search Query:", searchQuery);
    console.log("Search Data:", searchData);
  }, [searchQuery, searchData]);

  // Normalize string for Vietnamese text (from first code)
  const normalize = (s: string) => s?.trim().toLowerCase() || "";

  // Filter functions for each category with null-safety (from first code)
  const filterArtists = (artists: SearchArtist[]) =>
    artists.filter((artist) =>
      normalize(artist.name).includes(normalize(searchQuery))
    );

  const filterSongs = (songs: SearchSong[]) =>
    songs.filter(
      (song) =>
        normalize(song.title).includes(normalize(searchQuery)) ||
        normalize(song.artistName).includes(normalize(searchQuery))
    );

  const filterShows = (shows: SearchPodcastShow[]) =>
    shows.filter((show) => normalize(show.title).includes(normalize(searchQuery)));

  // Map and filter data for each category (from second code)
  const filteredArtists =
    !searchQuery.trim() ||
    (selectedTab && selectedTab !== "All" && selectedTab !== "Artists")
      ? []
      : filterArtists(searchData?.data?.artists || []).map(
          (artist) =>
            ({
              id: artist.id,
              name: artist.name,
              urlAvatar: artist.coverImage, // Map coverImage to urlAvatar
              bio: "",
              createdAt: "",
              updatedAt: "",
            } as Artist)
        );

  const filteredSongs =
    !searchQuery.trim() ||
    (selectedTab && selectedTab !== "All" && selectedTab !== "Songs")
      ? []
      : filterSongs(searchData?.data?.songs || []).map(
          (song) =>
            ({
              id: song.id,
              title: song.title,
              coverImage: song.coverImage,
              artistId: song.artistId,
              artist: song.artistName,
              duration: 0, // Default value since API doesn't provide
              audioUrl: "", // Default value to bypass SongItem validation
              createdAt: "",
              updatedAt: "",
            } as Song)
        );

  const filteredShows =
    !searchQuery.trim() ||
    (selectedTab && selectedTab !== "All" && selectedTab !== "Podcasts")
      ? []
      : filterShows(searchData?.data?.shows || []).map(
          (show) =>
            ({
              id: show.id,
              title: show.title,
              creator: show.creator,
              coverImage: show.coverImage,
              categoryId: show.categoryId || "",
              description: "", // Default value since API doesn't provide
              createdAt: "",
              updatedAt: "",
            } as PodcastShow)
        );

  // Debug filtered results
  useEffect(() => {
    console.log("Filtered Artists:", filteredArtists);
    console.log("Filtered Songs:", filteredSongs);
    console.log("Filtered Shows:", filteredShows);
  }, [filteredArtists, filteredSongs, filteredShows]);

  const hasResults =
    filteredArtists.length > 0 ||
    filteredSongs.length > 0 ||
    filteredShows.length > 0;


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

  const handleSearchSubmit = () => {
    console.log("Submitting Search:", searchValue);
    setSearchQuery(searchValue);
    setIsSearch(true);
    setSelectedTab(null); // Changed to null
    Keyboard.dismiss();
  };

  const handleInputFocus = () => {
    if (isSearch) {
      setIsSearch(false);
      setSelectedTab(null); // Changed to null
      setSearchQuery("");
      setSearchValue("");
    }
  };

  const handleOpenSongOptionsBottomSheet = (song: Song) => {
    setSelectedSong(song);
    setIsSongOptionsOpen(true);
  };

  const handleCloseSongOptionsBottomSheet = () => {
    setIsSongOptionsOpen(false);
    setSelectedSong(null);
  };

  const handleClearTab = () => {
    setSelectedTab(null); // Changed to null
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
        <XStack py="$1" items="center" mb="$2" bg="rgba(255, 255, 255, 0.3)">
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
                setSelectedTab(null); // Changed to null
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
        setSelectedTab={(tab) => {
          console.log("Selected Tab:", tab);
          setSelectedTab(tab);
        }}
        handleClearTab={handleClearTab}
      />
      <YStack flex={1} bg="#000" px="$3">
        {isSearchLoading ? (
          <YStack flex={1} justify="center" items="center">
            <ActivityIndicator size="large" color="#1DB954" />
          </YStack>
        ) : (
          <ScrollView scrollEventThrottle={16}>
            {isSearch && hasResults ? (
              <>
                {(selectedTab === null || selectedTab === "Artists") && // Changed "All" to null
                  filteredArtists.length > 0 && (
                    <YStack mb="$4">
                      <Text
                        color="white"
                        fontSize="$5"
                        fontWeight="bold"
                        mb="$2"
                      >
                        Artists
                      </Text>
                      <FlatList
                        data={filteredArtists}
                        keyExtractor={(item) => item.id ?? ""}
                        renderItem={({ item }) => {
                          console.log("Rendering Artist:", item);
                          return (
                            <TouchableOpacity>
                              <ArtistItem
                                artist={item}
                                onPress={() =>
                                  navigation.navigate("Artist", { id: item.id })
                                }
                              />
                            </TouchableOpacity>
                          );
                        }}
                        scrollEnabled={false}
                      />
                    </YStack>
                  )}
                {(selectedTab === null || selectedTab === "Songs") && // Changed "All" to null
                  filteredSongs.length > 0 && (
                    <YStack mb="$4">
                      <Text
                        color="white"
                        fontSize="$5"
                        fontWeight="bold"
                        mb="$2"
                      >
                        Songs
                      </Text>
                      <FlatList
                        data={filteredSongs}
                        keyExtractor={(item) => item.id || ""}
                        renderItem={({ item }) => {
                          console.log("Rendering Song:", item);
                          return (
                            <TouchableOpacity>
                              <SongItem
                                song={item}
                                showImage={true}
                                showArtistName={true}
                                getArtistName={() =>
                                  item.artist || "Unknown Artist"
                                }
                                onMorePress={handleOpenSongOptionsBottomSheet}
                                screen="search"
                                navigation={navigation}
                              />
                            </TouchableOpacity>
                          );
                        }}
                        scrollEnabled={false}
                      />
                    </YStack>
                  )}
                {(selectedTab === null || selectedTab === "Podcasts") && // Changed "All" to null
                  filteredShows.length > 0 && (
                    <YStack mb="$4">
                      <Text
                        color="white"
                        fontSize="$5"
                        fontWeight="bold"
                        mb="$2"
                      >
                        Podcasts
                      </Text>
                      <FlatList
                        data={filteredShows}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                          console.log("Rendering Show:", item);
                          return (
                            <TouchableOpacity>
                              <PodcastShowItem
                                item={item}
                                navigation={homeNavigation}
                              />
                            </TouchableOpacity>
                          );
                        }}
                        scrollEnabled={false}
                      />
                    </YStack>
                  )}
              </>
            ) : isSearch && !hasResults ? (
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
          />
        </View>
      )}
    </YStack>
  );
};

export default SearchResultScreen;