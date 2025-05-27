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
import { YStack, XStack, Text, Button, Avatar, Spinner } from "tamagui";
import { useGetSongsQuery, useGetTrendingSongsQuery } from "../services/SongService";
import { useGetAlbumsQuery } from "../services/AlbumService";
import { useGetArtistsQuery } from "../services/ArtistService";
import { Album } from "../types/album";
import { Artist } from "../types/artist";
import { Song } from "../types/song";
import Sidebar from "../components/Sidebar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/HomeNavigator";
import { useAppSelector } from "../store";
import { AlbumItem } from "../components/AlbumItem";
import { ArtistItem } from "../components/ArtistItem";
import { SongItem } from "../components/song/SongItem";
import Toast from "react-native-toast-message";
import SongBottomSheet from "../components/song/SongBottomSheet";
import { playSong } from "../services/playerService";
import {
  useGetPodcastCategoriesQuery,
  useGetPodcastShowsQuery,
} from "../services/PodcastService";
import { PodcastShowItem } from "../components/podcast/PodcastShowItem";
import { PodcastShow } from "../types/podcast";

const relaxationItems = [
  {
    id: 1,
    title: "#28 - người lớn và áp lực 'xây dựng hình ảnh'",
    creator: "Giang cơ Radio",
    description:
      "Dec 1, 2023 • 15min • Minh là Giang, mình là người lớn và mình muốn nói về áp lực 'xây dựng hình ảnh'.",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-12-01T00:00:00Z",
    categoryId: 1,
  },
  {
    id: 2,
    title: "'Dùng đốt, ở trong đó đã có lửa' - P8/ NHẬT KÝ ĐĂNG TH...",
    creator: "Nằm nghe đọc truyện - Hathaya",
    description: "Episode về hành trình vượt khó.",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-12-02T00:00:00Z",
    categoryId: 1,
  },
];

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<HomeStackParamList>;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedButton, setSelectedButton] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const user = useAppSelector((state) => state.auth.user);
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
  } = useGetTrendingSongsQuery();

  const {
    data: podcastShows,
    isLoading: isPodcastShowsLoading,
    error: podcastShowsError,
  } = useGetPodcastShowsQuery();

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -Dimensions.get("window").width * 0.75 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = <T extends keyof HomeStackParamList>(
    screen: T,
    params?: HomeStackParamList[T]
  ) => {
    if (params !== undefined) {
      navigation.navigate(screen as any, params);
    } else {
      navigation.navigate(screen as any);
    }
  };

  const handleButtonPress = (button: string) => {
    setSelectedButton(button);
  };

  const getArtistName = (artistId: string | undefined) => {
    if (!artistId) return "Unknown Artist";
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.name || "Unknown Artist";
  };

  const handleMorePress = (song: Song) => {
    setSelectedSong(song);
    setIsBottomSheetOpen(true);
  };

  const renderArtistItem = ({ item }: { item: Artist }) => (
    <ArtistItem
      artist={item}
      onPress={() => handleNavigation("Artist", { id: item.id })}
    />
  );

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <AlbumItem
      album={item}
      getArtistName={getArtistName}
      showDate={false}
      onPress={() => handleNavigation("Album", { id: item.id })}
    />
  );

  const renderPodcastShowItem = ({ item }: { item: PodcastShow }) => (
    <PodcastShowItem item={item} navigation={navigation} />
  );

  return (
    <YStack flex={1} bg="#111111">
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={{
          width: Dimensions.get("window").width * 0.75,
          transform: [{ translateX: sidebarAnim }],
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          navigation={navigation}
        />
      </Animated.View>

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
          zIndex: 0,
        }}
      >
        <XStack items="center" py={10} pl="$4">
          <TouchableOpacity onPress={toggleSidebar}>
            <Avatar circular size="$4">
              <Avatar.Image
                accessibilityLabel="User Avatar"
                src={user?.urlAvatar}
              />
              <Avatar.Fallback>
                <Text fontWeight="bold" color="white" fontSize="$8">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </Text>
              </Avatar.Fallback>
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

        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          pointerEvents={isSidebarOpen ? "none" : "auto"}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {(selectedButton === "All" || selectedButton === "Music") && (
            <>
              <YStack p="$4">
                <Text fontSize={20} fontWeight="bold" color="white" mb="$3">
                  Popular Artists
                </Text>
                {isArtistsLoading ? (
                  <Spinner size="large" color="$green10" />
                ) : artistsError ? (
                  <Text color="white">Error loading artists</Text>
                ) : (
                  <FlatList
                    data={artists?.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={renderArtistItem}
                    contentContainerStyle={{ paddingRight: 16 }}
                  />
                )}
              </YStack>

              <YStack p="$4">
                <Text fontSize={20} fontWeight="bold" color="white" mb="$3">
                  New Albums
                </Text>
                {isAlbumsLoading ? (
                  <Spinner size="large" color="$green10" />
                ) : albumsError ? (
                  <Text color="white">Error loading albums</Text>
                ) : (
                  <FlatList
                    data={albums?.data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAlbumItem}
                    contentContainerStyle={{ paddingRight: 16 }}
                  />
                )}
              </YStack>
            </>
          )}

          {(selectedButton === "All" || selectedButton === "Podcasts") && (
            <YStack pl="$4">
              <Text fontSize={20} fontWeight="bold" color="white" mb="$3">
                Podcasts
              </Text>
              {isPodcastShowsLoading ? (
                <Spinner size="large" color="$green10" />
              ) : podcastShowsError ? (
                <Text color="white">Error loading podcasts</Text>
              ) : !podcastShows?.data || podcastShows.data.length === 0 ? (
                <Text color="rgba(255,255,255,0.7)">No podcasts found</Text>
              ) : (
                <FlatList
                  data={podcastShows?.data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={renderPodcastShowItem}
                  scrollEnabled={false}
                />
              )}
            </YStack>
          )}
          {(selectedButton === "All" || selectedButton === "Music") && (
            <>
              <YStack py="$4" pl="$4">
                <Text fontSize={20} fontWeight="bold" color="white" mb="$3">
                  Trending Songs
                </Text>
                {isSongsLoading ? (
                  <Spinner size="large" color="$green10" />
                ) : songsError ? (
                  <Text color="white">Error loading songs</Text>
                ) : !songs?.data || songs.data.length === 0 ? (
                  <Text color="rgba(255,255,255,0.7)">
                    No trending songs found
                  </Text>
                ) : (
                  <YStack pr="$4">
                    {songs?.data.map((item: Song, index: number) => (
                      <SongItem
                        key={item.id || `song-${item.title}`}
                        song={item}
                        index={index}
                        showIndex={false}
                        showImage={true}
                        showArtistName={true}
                        imageSize={60}
                        getArtistName={getArtistName}
                        screen="home"
                        onMorePress={handleMorePress}
                      />
                    ))}
                  </YStack>
                )}
              </YStack>
            </>
          )}
        </Animated.ScrollView>

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
                zIndex: 500,
              }}
            />
          </TouchableWithoutFeedback>
        )}
      </Animated.View>

      <SongBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
          setSelectedSong(null);
        }}
        selectedSong={selectedSong}
        navigation={navigation}
        screenType="home"
      />
    </YStack>
  );
}
