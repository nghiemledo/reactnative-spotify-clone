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
import { SearchStackParamList } from "../../navigation/SearchNavigator";
import SongOptionsBottomSheet from "../../components/search/SongOptionsBottomSheet";
import Tabs from "../../components/search/Tabs";
import ArtistCard from "../../components/search/ArtistCard";
import SongCard from "../../components/search/SongCard";
import { LibraryStackParamList } from "../../navigation/LibraryNavigator";

interface Artist {
  id: number;
  type: "artist";
  name: string;
  image: string;
}

interface Song {
  id: number;
  type: "song";
  name: string;
  artists: { id: number; name: string }[];
  image: string;
}

type Item = Artist | Song;
const data = [
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
      {
        id: 1,
        name: "MANBO",
      },
      {
        id: 2,
        name: "obito",
      },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    type: "song",
    name: "Hà Nội",
    artists: [
      {
        id: 1,
        name: "MANBO",
      },
      {
        id: 2,
        name: "obito",
      },
      {
        id: 3,
        name: "dangrangto",
      },
      {
        id: 4,
        name: "tlinh",
      },
      {
        id: 5,
        name: "mck",
      },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
];

type SearchResultScreenNavigationProp = NativeStackNavigationProp<
  SearchStackParamList & LibraryStackParamList,
  "SearchResult"
>;

export default function SearchResultScreen({
  navigation,
  route,
}: {
  navigation: SearchResultScreenNavigationProp;
  route: { params?: { toastMessages?: string[] } };
}) {
  const { width, height } = Dimensions.get("window");
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isSongOptionsOpen, setIsSongOptionsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [toastQueue, setToastQueue] = useState<string[]>([]);

  const normalize = (s: string) => s.trim().toLowerCase();

  const filteredData =
    searchQuery.trim() === ""
      ? []
      : data.filter((item) => {
          const needle = normalize(searchQuery);
          const matchesSearch =
            normalize(item.name).includes(needle) ||
            (item.type === "song" &&
              item.artists?.some((artist) =>
                normalize(artist.name).includes(needle)
              ));
          const matchesTab =
            !selectedTab ||
            selectedTab === "All" ||
            (selectedTab === "Songs" && item.type === "song") ||
            (selectedTab === "Artists" && item.type === "artist");
          const matchesType = artist ? item.type === "song" : true;
          return matchesSearch && matchesTab && matchesType;
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
                  songId: data.find((item) => item.id === selectedSong?.id)!.id,
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

  const handlePress = (id: number) => {
    setLikedItems((prev) => {
      const isLiked = prev[id];
      const song = data.find((item) => item.id === id) as Song;
      if (!isLiked) {
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
    setIsLoading(true);
    setTimeout(() => {
      setSearchQuery(searchValue);
      const needle = normalize(searchValue);

      const matchedArtist = data.find(
        (item) =>
          item.type === "artist" && normalize(item.name).includes(needle)
      );

      if (matchedArtist) {
        setArtist(matchedArtist as Artist);
      } else {
        setArtist(null);
      }
      setIsSearch(true);
      setSelectedTab(null);
      setIsLoading(false);
    }, 1500);

    Keyboard.dismiss();
  };

  const handleInputFocus = () => {
    if (isSearch) {
      setIsLoading(true);
      setIsSearch(false);
      setArtist(null);
      setSelectedTab(null);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
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

  const handleSongOptionSelect = (option: string) => {
    if (selectedSong) {
      Toast.show({
        type: "success",
        text1: `${option} - ${selectedSong.name}`,
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });
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
            returnKeyType="search"
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
                setArtist(null);
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
        {isLoading ? (
          <YStack flex={1} justify="center" items="center">
            <ActivityIndicator size="large" color="#1DB954" />
          </YStack>
        ) : (
          <ScrollView scrollEventThrottle={16}>
            {artist && selectedTab !== "Songs" && (
              <ArtistCard artist={artist} />
            )}
            {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    {item.type === "song" ? (
                      <SongCard
                        item={item as Song}
                        likedItems={likedItems}
                        handlePress={handlePress}
                        handleOpenSongOptionsBottomSheet={
                          handleOpenSongOptionsBottomSheet
                        }
                      />
                    ) : (
                      <ArtistCard artist={item as Artist} />
                    )}
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
          <SongOptionsBottomSheet
            isOpen={isSongOptionsOpen}
            onClose={handleCloseSongOptionsBottomSheet}
            onSelectOption={handleSongOptionSelect}
            songName={selectedSong?.name || ""}
            urlAvatar={selectedSong?.image || ""}
            type={selectedSong?.type || ""}
            artists={selectedSong?.artists || []}
          />
        </View>
      )}
    </YStack>
  );
}
