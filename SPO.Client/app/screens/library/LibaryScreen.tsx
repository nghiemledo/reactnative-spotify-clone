import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState, useEffect } from "react";
import { RootStackParamList } from "../../navigation/AppNavigator";
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

type Data = {
  id: number;
  type: string;
  name: string;
  image: string;
  artists?: { id: number; name: string }[];
  createdAt?: string;
  creator?: string;
};

const initialData: Data[] = [
  {
    id: 1,
    type: "artist",
    name: "HieuThuHai",
    image: "https://i.pravatar.cc/150?img=3",
    createdAt: "2025-05-10T11:21:00+07:00",
    creator: "UserA",
  },
  {
    id: 2,
    type: "playlist",
    name: "HieuThuHai",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
    createdAt: "2025-05-12T11:21:00+07:00",
    creator: "UserB",
  },
  {
    id: 3,
    type: "album",
    name: "Hà Nội",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
      { id: 3, name: "dangrangto" },
      { id: 4, name: "tlinh" },
      { id: 5, name: "mck" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
    createdAt: "2025-05-11T11:21:00+07:00",
    creator: "UserC",
  },
  {
    id: 4,
    type: "playlist",
    name: "playlist",
    artists: [
      { id: 1, name: "MANBO" },
      { id: 2, name: "obito" },
      { id: 3, name: "dangrangto" },
      { id: 4, name: "tlinh" },
      { id: 5, name: "mck" },
    ],
    image: "https://i.pravatar.cc/150?img=3",
    createdAt: "2025-05-13T11:21:00+07:00",
    creator: "UserA",
  },
];

const tabTypes = [
  { id: 1, name: "Playlists" },
  { id: 2, name: "Podcasts" },
  { id: 3, name: "Albums" },
  { id: 4, name: "Artists" },
];

type LibraryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Library"
>;

export default function LibraryScreen({
  navigation,
}: {
  navigation: LibraryScreenNavigationProp;
}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 160;
  const [isCreateBottomSheetOpen, setIsCreateBottomSheetOpen] = useState(false);
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] = useState(false);
  const [sortedData, setSortedData] = useState<Data[]>(initialData);
  const [sortOption, setSortOption] = useState<string>("recents");
  const [isGrid, setIsGrid] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const toggleIcon = () => {
    setIsGrid((prev) => !prev);
  };

  const handleItemPress = (item: (typeof initialData)[number]) => {
    console.log("Pressed item:", item.name);
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
        console.log("Create playlist with note");
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

    let sorted = [...initialData];
    switch (option) {
      case "recents":
        sorted.sort((a, b) => b.id - a.id);
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

  const handleClearTab = () => {
    setSelectedTab(null);
  };

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
            <TouchableOpacity  onPress={() => navigation.navigate({ name: "SearchResult", params: {} })}
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
                <X size="$1" color="white"  />
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
          <DataList data={sortedData} onItemPress={handleItemPress} />

          <YStack gap="$3" mt="$2">
            <TouchableOpacity
              onPress={() => navigation.navigate({ name: "ArtistSelection", params: {} })}
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
              onPress={() => navigation.navigate({ name: "PodcastSelection", params: {} })}
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
}