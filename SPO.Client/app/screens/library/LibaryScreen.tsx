import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  AvatarImage,
  Button,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { ArrowUpDown, Plus, Search, X } from "@tamagui/lucide-icons";
import { Animated, TouchableOpacity, FlatList } from "react-native";
import DataList from "../../components/library/DataList";
import CreateBottomSheet from "../../components/library/CreateBottomSheet";
import SortBottomSheet from "../../components/library/SortBottomSheet";
import { MotiView } from "moti";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useGetPlaylistsByUserIdQuery } from "../../services/playlistServices";
import {
  FollowedArtistResponse,
  FollowedPodcastResponse,
  useGetFollowedArtistsQuery,
  useGetFollowedPodcastsQuery,
} from "../../services/AuthService";
import { UserInfo } from "../../types/user";
import { useSelector } from "react-redux";

// Dữ liệu mẫu khớp với DTO từ backend
const mockFollowedArtists: FollowedArtistResponse[] = [
  {
    id: "artist_1",
    name: "The Weeknd",
    followedAt: "2023-10-01T10:00:00Z",
    errorCode: null,
    errorMessage: null,
  },
  {
    id: "artist_2",
    name: "Billie Eilish",
    followedAt: "2023-09-15T12:00:00Z",
    errorCode: null,
    errorMessage: null,
  },
];

const mockFollowedPodcasts: FollowedPodcastResponse[] = [
  {
    id: "podcast_1",
    title: "The Joe Rogan Experience",
    creator: "Joe Rogan",
    followedAt: "2023-08-01T08:00:00Z",
    errorCode: 0,
    errorMessage: null,
  },
  {
    id: "podcast_2",
    title: "My Favorite Murder",
    creator: "Karen Kilgariff & Georgia Hardstark",
    followedAt: "2023-07-20T09:00:00Z",
    errorCode: 0,
    errorMessage: null,
  },
];

type Data = {
  id: string;
  type: string;
  name: string;
  image: string;
  artists?: { id: number; name: string }[];
  createdAt?: string;
  creator?: string;
};

interface AuthState {
  token: { accessToken: string; refreshToken: string } | null;
  user: UserInfo | null;
  role: string | null;
}

const tabTypes = [
  { id: 1, name: "Playlists" },
  { id: 2, name: "Podcasts" },
  { id: 3, name: "Artists" },
];

const LibraryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = useSelector((state: { auth: AuthState }) => state.auth.user);
  const userId = user?.id;

  // Lấy dữ liệu từ API
  const { data: playlistData } = useGetPlaylistsByUserIdQuery(userId || "");
  const { data: followedArtistsData } = useGetFollowedArtistsQuery(
    userId || ""
  );
  const { data: followedPodcastsData } = useGetFollowedPodcastsQuery(
    userId || ""
  );

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 160;
  const [isCreateBottomSheetOpen, setIsCreateBottomSheetOpen] = useState(false);
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] = useState(false);
  const [sortedData, setSortedData] = useState<Data[]>([]);
  const [sortOption, setSortOption] = useState<string>("recents");
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  useEffect(() => {
    let combinedData: Data[] = [];

    // Map playlist data
    if (selectedTab === null || selectedTab === "Playlists") {
      if (playlistData?.data) {
        const mappedPlaylists = playlistData.data.map((playlist) => ({
          id: playlist.id,
          type: "playlist",
          name: playlist.title,
          image:
            playlist.coverImage ||
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
          createdAt: playlist.createdAt,
          creator: playlist.userId,
          artists: [],
        }));
        combinedData = [...combinedData, ...mappedPlaylists];
      }
    }

    // Map followed artists (sử dụng mock data nếu API chưa sẵn sàng)
    if (selectedTab === null || selectedTab === "Artists") {
      const artistsData = followedArtistsData?.data || mockFollowedArtists;
      const mappedArtists = artistsData
        .filter((artist) => artist.id && artist.name)
        .map((artist) => ({
          id: artist.id!,
          type: "artist",
          name: artist.name!,
          image: "https://i.pravatar.cc/150?img=3",
          createdAt: artist.followedAt || "",
          creator: "",
          artists: [],
        }));
      combinedData = [...combinedData, ...mappedArtists];
    }

    // Map followed podcasts (sử dụng mock data nếu API chưa sẵn sàng)
    if (selectedTab === null || selectedTab === "Podcasts") {
      const podcastsData = followedPodcastsData?.data || mockFollowedPodcasts;
      const mappedPodcasts = podcastsData
        .filter((podcast) => podcast.id && podcast.title) // Lọc các podcast hợp lệ
        .map((podcast) => ({
          id: podcast.id!,
          type: "podcast",
          name: podcast.title!,
          image: "https://i.pravatar.cc/150?img=5", // Hình ảnh mặc định vì backend không trả về coverImage
          createdAt: podcast.followedAt || "",
          creator: podcast.creator || "",
          artists: [],
        }));
      combinedData = [...combinedData, ...mappedPodcasts];
    }

    // Áp dụng sắp xếp ban đầu
    setSortedData(combinedData);
  }, [playlistData, followedArtistsData, followedPodcastsData, selectedTab]);

  const handleOpenCreateBottomSheet = () => {
    setIsCreateBottomSheetOpen(true);
  };

  const handleCloseCreateBottomSheet = () => {
    setIsCreateBottomSheetOpen(false);
  };

  const handleOpenSortBottomSheet = () => {
    setIsSortBottomSheetOpen(true);
  };

  const handleCloseSortBottomSheet = () => {
    setIsSortBottomSheetOpen(false);
  };

  const handleSelectCreateOption = (option: string) => {
    console.log("Selected create option:", option);
    handleCloseCreateBottomSheet();
    switch (option) {
      case "playlist_note":
        navigation.navigate("CreatePlaylist");
        break;
      case "collaborative_note":
        console.log("Create collaborative playlist");
        break;
      case "shared_melody":
        console.log("Create shared melody");
        break;
      default:
        break;
    }
  };

  const handleSelectSortOption = (option: string) => {
    setSortOption(option);
    handleCloseSortBottomSheet();

    let sorted = [...sortedData];
    switch (option) {
      case "recents":
        sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "recentlyAdded":
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "alphabetical":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "creator":
        sorted.sort((a, b) => (a.creator || "").localeCompare(b.creator || ""));
        break;
      default:
        break;
    }
    setSortedData(sorted);
  };

  const handleItems = (type: string, id: string) => {
    if (type === "playlist") {
      navigation.navigate("DetailPlaylist", { id });
    } else if (type === "artist") {
      // navigation.navigate("ArtistDetail", { id });
    } else if (type === "podcast") {
      // navigation.navigate("PodcastDetail", { id });
    }
  };

  const handleClearTab = () => {
    setSelectedTab(null);
  };

  return (
    <YStack flex={1} bg="#000" px="$3" pt="$15" pb="$15">
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: "#000",
          paddingHorizontal: 12,
          paddingTop: 24,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, headerHeight],
                outputRange: [0, -headerHeight],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <XStack items="center" justify="space-between" mt="$5">
          <XStack items="center">
            <Avatar circular size="$3">
              <AvatarImage src={user?.urlAvatar} />
              <Avatar.Fallback>
                <Text fontWeight="bold" color="white" fontSize="$8">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </Text>
              </Avatar.Fallback>
            </Avatar>
            <Text fontWeight="bold" px="$4" color="white" fontSize="$8">
              Your Library
            </Text>
          </XStack>
          <XStack gap="$4">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SearchResult", { toastMessages: [] })
              }
            >
              <Search color="white" size="$1.5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenCreateBottomSheet}>
              <Plus color="white" size="$1.5" />
            </TouchableOpacity>
          </XStack>
        </XStack>
        <XStack flex={1} gap="$3" mt="$3" items="center">
          {selectedTab && (
            <MotiView
              from={{ opacity: 0, translateX: -10 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 200 }}
            >
              <TouchableOpacity onPress={handleClearTab}>
                <X size="$1" color="white" />
              </TouchableOpacity>
            </MotiView>
          )}
          <FlatList
            data={
              selectedTab
                ? tabTypes.filter((tab) => tab.name === selectedTab)
                : tabTypes
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingHorizontal: 0,
              gap: 10,
              justifyContent: "flex-start",
            }}
            renderItem={({ item }) => (
              <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 200 }}
              >
                <TouchableOpacity onPress={() => setSelectedTab(item.name)}>
                  <Text
                    fontSize="$2"
                    fontWeight="bold"
                    bg={selectedTab === item.name ? "#1DB954" : "#444"}
                    color="white"
                    p="$2"
                    rounded="$10"
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            )}
          />
        </XStack>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        //   { useNativeDriver: true }
        // )}
      >
        <XStack py="$3" justify="space-between">
          <TouchableOpacity onPress={handleOpenSortBottomSheet}>
            <XStack>
              <ArrowUpDown color="white" size={15} />
              <Text color="white" fontWeight="bold">
                {" "}
                {sortOption.charAt(0).toUpperCase() +
                  sortOption.slice(1).replace(/([A-Z])/g, " $1")}
              </Text>
            </XStack>
          </TouchableOpacity>
        </XStack>

        <YStack>
          <DataList data={sortedData} onItems={handleItems} />

          <YStack gap="$3" mt="$2">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate({
                  name: "ArtistSelection",
                  params: { selectedIds: [] },
                })
              }
            >
              <XStack items="center" gap="$2">
                <Button
                  bg="#444"
                  width={50}
                  height={50}
                  rounded="$10"
                  icon={<Plus size="$2" color="white" strokeWidth={1} />}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
                <Text color="white">Add artists</Text>
              </XStack>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate({
                  name: "PodcastSelection",
                  params: { selectedIds: [] },
                })
              }
            >
              <XStack items="center" gap="$2">
                <Button
                  bg="#444"
                  width={50}
                  height={50}
                  icon={<Plus size="$2" color="white" strokeWidth={1} />}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
                <Text color="white">Add podcasts</Text>
              </XStack>
            </TouchableOpacity>
          </YStack>
        </YStack>
      </ScrollView>

      <CreateBottomSheet
        isOpen={isCreateBottomSheetOpen}
        onClose={handleCloseCreateBottomSheet}
        onSelectOption={handleSelectCreateOption}
      />
      <SortBottomSheet
        isOpen={isSortBottomSheetOpen}
        onClose={handleCloseSortBottomSheet}
        onSelectOption={handleSelectSortOption}
        selectedOption={sortOption}
      />
    </YStack>
  );
};

export default LibraryScreen;
