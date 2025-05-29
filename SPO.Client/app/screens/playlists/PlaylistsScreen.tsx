import { ArrowLeft, ArrowUpDown } from "@tamagui/lucide-icons";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Animated,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import DataList from "../../components/library/DataList";
import SortBottomSheet from "../../components/library/SortBottomSheet";
import { useAppSelector } from "../../store";
import { useGetPlaylistsByUserIdQuery } from "../../services/playlistServices";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Data = {
  id: string;
  type: string;
  name: string;
  image: string;
  artists?: { id: number; name: string }[];
  createdAt?: string;
  creator?: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PlaylistsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const {
    data: playlistData,
    isLoading,
    error,
  } = useGetPlaylistsByUserIdQuery(userId || "", { skip: !userId });
  const [sortedData, setSortedData] = useState<Data[]>([]);
  const [sortOption, setSortOption] = useState<string>("recents");
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] = useState(false);

  // Map API data to Data format
  useEffect(() => {
    if (playlistData?.data) {
      const mappedData: Data[] = playlistData.data.map((playlist) => ({
        id: playlist.id,
        type: "playlist",
        name: playlist.title,
        image:
          playlist.coverImage ||
          "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
        createdAt: playlist.createdAt,
        creator: playlist.userId,
        artists: [],
      }));
      setSortedData(mappedData);
    }
  }, [playlistData]);

  const navbarBackground = scrollY.interpolate({
    inputRange: [190, 220],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(31, 31, 31, 1)"],
    extrapolate: "clamp",
  });

  // Handlers for SortBottomSheet
  const handleOpenSortBottomSheet = () => {
    setIsSortBottomSheetOpen(true);
  };

  const handleCloseSortBottomSheet = () => {
    setIsSortBottomSheetOpen(false);
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
    }
  };

  if (!userId) {
    return (
      <YStack flex={1} bg="#121212" justify="center" items="center">
        <Text color="white">Vui lòng đăng nhập để xem danh sách phát</Text>
      </YStack>
    );
  }

  if (isLoading) {
    return (
      <YStack flex={1} bg="#121212" justify="center" items="center">
        <Text color="white">Đang tải...</Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} bg="#121212" justify="center" items="center">
        <Text color="white">Lỗi: Không thể tải danh sách phát</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="#121212">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Animated Header */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          zIndex: 1000,
          backgroundColor: navbarBackground,
        }}
      >
        <XStack
          items="center"
          justify="center"
          px={16}
          height={60}
          bg="#222"
          position="relative"
        >
          {/* Nút Back (cố định bên trái) */}
          <Button
            chromeless
            icon={<ArrowLeft size={24} />}
            size="$4"
            color="white"
            bg="transparent"
            p={0}
            position="absolute" 
            l={16}
            onPress={() => navigation.goBack()}
          />
          <Text color="white" fontSize={20} fontWeight="bold">
            Playlists
          </Text>
        </XStack>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack flex={1} mt={80}>
          {/* Sorting and Playlist Display */}
          <YStack pl={16} pr={16}>
            <XStack py="$3" justify="space-between">
              <TouchableOpacity onPress={handleOpenSortBottomSheet}>
                <XStack items="center">
                  <ArrowUpDown color="white" size={20} />
                  <Text color="white" fontWeight="bold" fontSize={20}>
                    {"    "}
                    {sortOption.charAt(0).toUpperCase() +
                      sortOption.slice(1).replace(/([A-Z])/g, " $1")}
                  </Text>
                </XStack>
              </TouchableOpacity>
            </XStack>

            <DataList data={sortedData} onItems={handleItems} />
          </YStack>
        </YStack>
      </ScrollView>
      <SortBottomSheet
        isOpen={isSortBottomSheetOpen}
        onClose={handleCloseSortBottomSheet}
        onSelectOption={handleSelectSortOption}
        selectedOption={sortOption}
      />
    </YStack>
  );
};
