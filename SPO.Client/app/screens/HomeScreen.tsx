import React, { useState, useRef } from "react";
import {
  FlatList,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { YStack, XStack, Text, Button, Avatar } from "tamagui";
import { useGetSongsQuery } from "../services/SongService";
import { useGetAlbumsQuery } from "../services/AlbumService";
import { useGetArtistsQuery } from "../services/ArtistService";
import { Album } from "../types/album";
import { Artist } from "../types/artist";
import { Song } from "../types/song";
import Sidebar from "../components/Sidebar";
import { SectionHelper } from "../components/SectionHelper";
import SafeImage from "../components/SafeImage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Section } from "../types/section";

// Dữ liệu mẫu cho Podcasts
const relaxationItems = [
  {
    id: "1",
    title: "#28 - người lớn và áp lực 'xây dựng hình ảnh'",
    creator: "Giang cơ Radio",
    description:
      "Dec 1, 2023 • 15min • Minh là Giang, mình là người lớn và mình muốn nói về áp lực 'xây dựng hình ảnh'.",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-12-01T00:00:00Z",
    type: "podcast",
  },
  {
    id: "2",
    title: "'Dùng đốt, ở trong đó đã có lửa' - P8/ NHẬT KÝ ĐĂNG TH...",
    creator: "Nằm nghe đọc truyện - Hathaya",
    description: "Episode về hành trình vượt khó.",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-12-02T00:00:00Z",
    type: "podcast",
  },
];

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedButton, setSelectedButton] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarAnim = useRef(
    new Animated.Value(-Dimensions.get("window").width * 0.75)
  ).current;

  const {
    data: albums,
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useGetAlbumsQuery();

  const {
    data: artists,
    isLoading: isArtistsLoading,
    error: artistsError,
  } = useGetArtistsQuery();

  const {
    data: songs,
    isLoading: isSongsLoading,
    error: songsError,
  } = useGetSongsQuery();

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -Dimensions.get("window").width * 0.75 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonPress = (button: string) => {
    setSelectedButton(button);
  };

  const getArtistName = (artistId: string | undefined) => {
    if (!artistId) return "Unknown Artist";
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.name || "Unknown Artist";
  };

  // Render item cho Podcasts
 

  const renderArtistItem = ({ item }: { item: Artist }) => (
    <YStack mr="$4" width={120} items="center">
      <SafeImage uri={item.urlAvatar} width={100} height={100} rounded={50} />
      <Text color="white" fontWeight="600" mt="$2" numberOfLines={1}>
        {item.name}
      </Text>
    </YStack>
  );

  // Render item cho Albums
  const renderAlbumItem = ({ item }: { item: Album }) => (
    <YStack mr="$4" width={150}>
      <SafeImage uri={item.coverImage} width={150} height={150} rounded={8} />
      <Text color="white" fontWeight="600" mt="$2" numberOfLines={1}>
        {item.title}
      </Text>
      <Text color="#666666" fontSize="$3" numberOfLines={1}>
        {getArtistName(item.artistId)}
      </Text>
    </YStack>
  );

  // Render item cho Songs
  const renderSongItem = ({ item }: { item: Song }) => (
    <XStack mr="$4" items="center" space="$3" py="$2">
      <SafeImage uri={item.coverImage} width={60} height={60} rounded={4} />
      <YStack flex={1}>
        <Text color="white" fontWeight="600" numberOfLines={1}>
          {item.title}
        </Text>
        <Text color="#666666" fontSize="$3" numberOfLines={1}>
          {getArtistName(item.artistId)}
        </Text>
      </YStack>
    </XStack>
  );

   const renderRelaxationItem = ({ item }: { item: any }) => (
    <XStack mr="$4" space="$3" py="$2" items="flex-start">
      <SafeImage uri={item.coverImage} width={80} height={80} rounded={8} />
      <YStack flex={1} space="$1">
        <Text color="white" fontWeight="600" fontSize="$5" numberOfLines={2}>
          {item.title}
        </Text>
        <Text color="gray" fontSize="$3" numberOfLines={1}>
          Episode • {item.creator}
        </Text>
        {item.type === "podcast" && (
          <>
            <XStack items="center" space="$2">
              <Text color="gray" fontSize="$2">
                {item.description.split("•")[0]}
              </Text>
              <Text color="gray" fontSize="$2">
                •
              </Text>
              <Text color="gray" fontSize="$2">
                {item.description.split("•")[1]}
              </Text>
            </XStack>
            <Text color="gray" fontSize="$2" numberOfLines={2}>
              {item.description.split("•").slice(2).join("•")}
            </Text>
          </>
        )}
      </YStack>
    </XStack>
  );

  // Tạo sections cho FlatList
  const sections: Section[] = [
    {
      id: "artists",
      type: "horizontal",
      title: "Popular Artists",
      data: artists?.data,
      loading: isArtistsLoading,
      error: artistsError ? "Error loading artists" : null,
      renderItem: renderArtistItem,
    },
    {
      id: "albums",
      type: "horizontal",
      title: "New Albums",
      data: albums?.data,
      loading: isAlbumsLoading,
      error: albumsError ? "Error loading albums" : null,
      renderItem: renderAlbumItem,
    },
    {
      id: "songs",
      type: "vertical",
      title: "Trending Songs",
      data: songs?.data,
      loading: isSongsLoading,
      error: songsError ? "Error loading songs" : null,
      renderItem: renderSongItem,
    },
    {
      id: "relaxation",
      type: "vertical",
      title: "Podcasts",
      data: relaxationItems,
      renderItem: renderRelaxationItem,
    },
  ];

  const filteredSections = sections.filter((section) => {
    if (selectedButton === "All") return true;
    if (selectedButton === "Music" && section.id !== "relaxation") return true;
    if (selectedButton === "Podcasts" && section.id === "relaxation")
      return true;
    return false;
  });

  return (
    <YStack flex={1} bg="rgb(25, 27, 31)" pl={20}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Sidebar */}
      <Animated.View
        style={{
          width: Dimensions.get("window").width * 0.75,
          transform: [{ translateX: sidebarAnim }],
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          navigation={navigation}
        />
      </Animated.View>

      {/* Nội dung chính */}
      <Animated.View
        style={{
          flex: 1,
          transform: [
            {
              translateX: sidebarAnim.interpolate({
                inputRange: [-Dimensions.get("window").width * 0.75, 0],
                outputRange: [0, Dimensions.get("window").width * 0.75],
              }),
            },
          ],
        }}
      >
        {/* Header */}
        <XStack
          items="center"
          space="$2"
          py={10}
          mt={StatusBar.currentHeight || 0}
          z={1}
        >
          <TouchableOpacity onPress={toggleSidebar}>
            <Avatar circular size="$4">
              <Avatar.Image
                accessibilityLabel="User Avatar"
                src="https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg"
              />
              <Avatar.Fallback />
            </Avatar>
          </TouchableOpacity>

          {["All", "Music", "Podcasts"].map((button) => (
            <Button
              ml={7}
              key={button}
              size="$3"
              bg={
                selectedButton === button
                  ? "#1DB954"
                  : "rgba(255, 255, 255, 0.2)"
              }
              rounded={50}
              onPress={() => handleButtonPress(button)}
            >
              <Text color={selectedButton === button ? "black" : "white"}>
                {button}
              </Text>
            </Button>
          ))}
        </XStack>

        {/* Danh sách nội dung */}
        <Animated.View
          style={{
            flex: 1,
            opacity: sidebarAnim.interpolate({
              inputRange: [-Dimensions.get("window").width * 0.75, 0],
              outputRange: [1, 0.5],
            }),
          }}
        >
          <FlatList
            data={filteredSections}
            renderItem={({ item }) => <SectionHelper item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            pointerEvents={isSidebarOpen ? "none" : "auto"}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </Animated.View>

        {/* Overlay khi sidebar mở */}
        {isSidebarOpen && (
          <TouchableWithoutFeedback onPress={toggleSidebar}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
          </TouchableWithoutFeedback>
        )}
      </Animated.View>
    </YStack>
  );
}
