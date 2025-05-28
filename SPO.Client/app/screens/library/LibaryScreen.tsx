import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState, useEffect } from "react";
import { LibraryStackParamList } from "../../navigation/LibraryNavigator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";
import {
  ArrowUpDown,
  LayoutGrid,
  List,
  Plus,
  Search,
  X,
} from "@tamagui/lucide-icons";
import { Animated, TouchableOpacity, FlatList } from "react-native";
import DataList from "../../components/library/DataList";
import CreateBottomSheet from "../../components/library/CreateBottomSheet";
import SortBottomSheet from "../../components/library/SortBottomSheet";
import { MotiView } from "moti";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useGetPlaylistsByUserIdQuery } from "../../services/playlistServices"; // Import new API hook
import { UserInfo } from "../../types/user";
import { useSelector } from "react-redux";

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
  { id: 3, name: "Albums" },
  { id: 4, name: "Artists" },
];

const LibraryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = useSelector((state: { auth: AuthState }) => state.auth.user); // Get user from Redux
  const userId = user?.id; // Extract userId
  const {
    data: playlistData,
    isLoading,
    error,
  } = useGetPlaylistsByUserIdQuery(userId || "", { skip: !userId }); // Fetch playlists by userId

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 160;
  const [isCreateBottomSheetOpen, setIsCreateBottomSheetOpen] = useState(false);
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] = useState(false);
  const [sortedData, setSortedData] = useState<Data[]>([]);
  const [sortOption, setSortOption] = useState<string>("recents");
  const [isGrid, setIsGrid] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  // Map API data to Data format
  useEffect(() => {
    if (playlistData?.data) {
      const mappedData: Data[] = playlistData.data.map((playlist) => ({
        id: playlist.id,
        type: "playlist",
        name: playlist.title,
        image:
          playlist.coverImage ||
          "https://images.unsplash.com/photo-1507838153414-b4b713384a76", // Fallback image
        createdAt: playlist.createdAt,
        creator: playlist.userId,
        artists: [],
      }));
      setSortedData(mappedData);
    }
  }, [playlistData]);

  const toggleIcon = () => {
    setIsGrid((prev) => !prev);
  };

  // Handlers for CreateBottomSheet
  const handleOpenCreateBottomSheet = () => {
    setIsCreateBottomSheetOpen(true);
  };

  const handleCloseCreateBottomSheet = () => {
    setIsCreateBottomSheetOpen(false);
  };

  // Handlers for SortBottomSheet
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

  // Update handleItems to pass playlist id
  const handleItems = (type: string, id: string) => {
    if (type === "playlist") {
      navigation.navigate("DetailPlaylist", { id });
    }
  };

  const handleClearTab = () => {
    setSelectedTab(null);
  };

  if (!userId) {
    return <Text color="white">Please log in to view your playlists.</Text>;
  }

  if (isLoading) {
    return <Text color="white">Loading...</Text>;
  }

  if (error) {
    return (
      <Text color="white">
        Failed to load playlists: {JSON.stringify(error)}
      </Text>
    );
  }

  return (
    <YStack flex={1} bg="#000" px="$3" pt="$15">
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
              <AvatarImage src="https://i.pravatar.cc/150?img=3" />
              <AvatarFallback
                bg="pink"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontWeight="bold" color="black" fontSize="$5">
                  L
                </Text>
              </AvatarFallback>
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
      <ScrollView scrollEventThrottle={16}>
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
