import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, Animated, View, StatusBar } from "react-native";
import { YStack, XStack, Text, Image, H3, Button, Spinner } from "tamagui";
import { ArrowLeft, Play, MoreVertical } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useGetAlbumsQuery } from "../../services/AlbumService";
import { LinearGradient } from "@tamagui/linear-gradient";
import {
  useGetArtistByIdQuery,
  useGetArtistsQuery,
} from "../../services/ArtistService";
import { useGetSongsQuery } from "../../services/SongService";
import { Album } from "../../types/album";
import { Song } from "../../types/song";
import { Artist } from "../../types/artist";
import { HomeStackParamList } from "../../navigation/HomeNavigator";
import Toast from "react-native-toast-message";
import { ArtistItem } from "../../components/ArtistItem";
import { AlbumItem } from "../../components/AlbumItem";
import { SongItem } from "../../components/song/SongItem";
import SongBottomSheet from "../../components/song/SongBottomSheet";
import {
  playSong,
  addTrackToQ,
  setPlayerQueue,
} from "../../services/playerService";
import { store, useAppSelector } from "../../store";
import {
  setCurrentTrack,
  setQueue as setReduxQueue,
} from "../../store/playerSlice";
import AdComponent from "../../components/AdComponent";
import { useFollowArtistMutation } from "../../services/AuthService";

// Định nghĩa type cho navigation với RootStackParamList
type ArtistScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ArtistDetailScreen({
  navigation,
  route,
}: {
  navigation: ArtistScreenNavigationProp;
  route: { params: { id: string } };
}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showAd, setShowAd] = useState(false);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [followArtist, { isLoading: isFollowLoading }] = useFollowArtistMutation()

  const {
    data: songs,
    isLoading: isSongsLoading,
    error: songsError,
  } = useGetSongsQuery();
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
    data: artist,
    isLoading: isArtistLoading,
    error: artistError,
  } = useGetArtistByIdQuery(route.params?.id);

  const filteredArtists = artists?.data?.filter(
    (item: Artist) => item.id !== route.params.id
  );

  const handleNavigation = <T extends keyof HomeStackParamList>(
    screen: T,
    params?: HomeStackParamList[T]
  ) => {
    navigation.navigate(screen as any, params);
  };

  const navbarBackground = scrollY.interpolate({
    inputRange: [190, 220],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(31, 31, 31, 1)"],
    extrapolate: "clamp",
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [200, 230],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleAddButtonPress = useCallback(async () => {
    if (!userId) {
      Toast.show({
        type: "error",
        text1: "Vui lòng đăng nhập để theo dõi nghệ sĩ",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }

    try {
      await followArtist({ UserId: userId, ArtistId: route.params.id }).unwrap();
      setIsAdded((prev) => !prev);
      Toast.show({
        type: "success",
        text1: isAdded ? "Đã hủy theo dõi nghệ sĩ" : "Đã theo dõi nghệ sĩ",
        position: "bottom",
        visibilityTime: 2000,
      });
      console.log({ userId, artistId: route.params.id });
      
    } catch (error) {
      console.error("Follow artist failed:", error);
      Toast.show({
        type: "error",
        text1: "Không thể theo dõi/hủy theo dõi nghệ sĩ",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  }, [userId, route.params.id, isAdded, followArtist]);

  const handleMorePress = (song: Song) => {
    setSelectedSong(song);
    setIsBottomSheetOpen(true);
  };

  const artistSongs = songs?.data.filter(
    (song: Song) =>
      song.artistId !== undefined && song.artistId === route.params.id
  );

  const artistAlbums = albums?.data.filter(
    (album: Album) =>
      album.artistId !== undefined && album.artistId === route.params.id
  );

  // Hàm xử lý khi nhấn nút Play
  const handlePlayAll = async () => {
    setShowAd(true);
    if (!artistSongs || artistSongs.length === 0) {
      Toast.show({
        type: "error",
        text1: "Không có bài hát nào để phát",
        position: "bottom",
        visibilityTime: 2000,
      });

      return;
    }

    try {
      // Chuyển đổi artistSongs thành định dạng Track
      const tracks = artistSongs.map((song: Song) => ({
        id: song.id || `song-${song.title}`,
        url: song.audioUrl ?? "",
        title: song.title ?? "",
        artist: song.artistId || "Nghệ sĩ không xác định",
        artwork:
          song.coverImage ||
          "https://via.placeholder.com/300?text=Khôngcóhìnhảnh",
        duration: song.duration || 0,
      }));

      // Xóa hàng đợi hiện tại và thêm danh sách mới
      store.dispatch(setReduxQueue(tracks));
      await setPlayerQueue(tracks);

      // Phát bài hát đầu tiên
      const firstSong = artistSongs[0];
      await playSong(firstSong);

      // Điều hướng đến màn hình Playing
      navigation.navigate("Playing");
      Toast.show({
        type: "success",
        text1: `Đang phát danh sách bài hát của ${
          artist?.data?.name || "nghệ sĩ"
        }`,
        position: "bottom",
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error("Lỗi khi phát tất cả bài hát:", error);
      Toast.show({
        type: "error",
        text1: "Không thể phát danh sách bài hát",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
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
      showDate={true}
      onPress={() => (navigation as any).navigate("Album", { id: item.id })}
    />
  );

  if (isSongsLoading || isAlbumsLoading || isArtistLoading) {
    return (
      <YStack flex={1} justify="center" items="center" bg="rgba(0, 0, 0, 0.3)">
        <Spinner size="large" color="$green10" />
      </YStack>
    );
  }

  if (songsError || albumsError || artistError) {
    return (
      <YStack flex={1} justify="center" items="center" bg="#121212">
        <Text color="white">
          Lỗi:{" "}
          {(songsError as any)?.message ||
            (albumsError as any)?.message ||
            (artistError as any)?.message ||
            "Không thể tải dữ liệu"}
        </Text>
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button
              onPress={() => navigation.goBack()}
              size="$4"
              ml={10}
              chromeless
              p={8}
              rounded={100}
              icon={<ArrowLeft size={28} color="white" />}
              bg="rgba(0,0,0,0.2)"
            />
            <Animated.View style={{ opacity: titleOpacity }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 8,
                }}
              >
                {artist?.data?.name || "Nghệ sĩ không xác định"}
              </Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>

      <Animated.Image
        source={{
          uri: artist?.data.urlAvatar || "https://via.placeholder.com/400",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 390,
        }}
        resizeMode="cover"
      />

      <LinearGradient
        position="absolute"
        t={0}
        l={0}
        r={0}
        height={300}
        colors={["rgba(0, 0, 0, 0.2)", "#121212"]}
        start={[0, 0]}
        end={[0, 1]}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack height={200} />
        <LinearGradient
          flex={1}
          colors={["transparent", "#121212"]}
          start={[0, 0]}
          end={[0, 0.1]}
          p="$4"
          py={60}
        >
          <YStack mb="$4">
            <Text>
              <H3 color="white" fontSize={34} fontWeight="bold">
                {artist?.data?.name || "Unknown Artist"}
              </H3>
            </Text>
            <Text color="#b3b3b3" fontSize={16} fontWeight="400">
              {artist?.data?.bio || "No bio"}
            </Text>
          </YStack>
          <XStack justify="space-between" items="center" mt="$2" mb="$4">
            <XStack items="center" gap="$3">
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "#b3b3b3",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 2,
                  alignSelf: "flex-start",
                }}
              >
                <Image
                  source={{
                    uri:
                      artist?.data?.urlAvatar ||
                      "https://via.placeholder.com/120",
                  }}
                  width={31}
                  height={40}
                  borderRadius={5}
                  resizeMode="cover"
                />
              </View>
              <Button
                borderWidth={1}
                borderColor="#b3b3b3"
                bg="transparent"
                color="white"
                fontWeight="bold"
                fontSize={12}
                px="$4"
                onPress={handleAddButtonPress}
                disabled={isFollowLoading}
              >
                {isFollowLoading
                  ? "Loading..."
                  : isAdded
                  ? "Following"
                  : "Follow"}
              </Button>
              {/* <Button
                bg="transparent"
                size="$3"
                p={0}
                onPress={() => {
                  setIsBottomSheetOpen(true);
                }}
                icon={<MoreVertical size={20} color="#b3b3b3" />}
              /> */}
            </XStack>

            <Button
              bg="#1DB954"
              circular
              size="$5"
              icon={<Play size={24} color="#000" fill="#000" />}
              onPress={handlePlayAll}
            />
          </XStack>

          <H3 color="white" fontSize={20} fontWeight="bold" mb="$3">
            Popular
          </H3>
          {isSongsLoading ? (
            <Spinner size="large" color="$green10" />
          ) : !artistSongs || artistSongs.length === 0 ? (
            <Text color="rgba(255,255,255,0.7)">
              {artist?.data.name} has no song
            </Text>
          ) : (
            <FlatList
              data={artistSongs}
              keyExtractor={(item, index) => item.id || `song-${index}`}
              renderItem={({ item, index }) => (
                <SongItem
                  song={item}
                  index={index}
                  showIndex={true}
                  showImage={true}
                  showArtistName={false}
                  imageSize={48}
                  onMorePress={handleMorePress}
                  onSongPress={async (song) => {
                    try {
                      await playSong(song);
                      navigation.navigate("Playing");
                      console.log(
                        "Bài hát được nhấn và đang phát:",
                        song.title
                      );
                    } catch (error) {
                      console.error("Lỗi khi phát bài hát:", error);
                      Toast.show({
                        type: "error",
                        text1: "Không thể phát bài hát",
                        position: "bottom",
                        visibilityTime: 2000,
                      });
                    }
                  }}
                  screen={""}
                />
              )}
            />
          )}

          <H3 color="white" fontSize={20} fontWeight="bold" mt="$6" mb="$3">
            Album
          </H3>
          {isAlbumsLoading ? (
            <Spinner size="large" color="$green10" />
          ) : !artistAlbums || artistAlbums.length === 0 ? (
            <Text color="rgba(255,255,255,0.7)">
              {artist?.data.name} has no album
            </Text>
          ) : (
            <FlatList
              data={artistAlbums}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id || `album-${index}`}
              renderItem={renderAlbumItem}
              contentContainerStyle={{ paddingRight: 16 }}
            />
          )}

          <H3 color="white" fontSize={20} fontWeight="bold" mt="$6" mb="$3">
            Fan also like
          </H3>
          {isArtistsLoading ? (
            <Spinner size="large" color="$green10" />
          ) : artistsError ? (
            <Text color="white">Error loading Artist</Text>
          ) : !filteredArtists || filteredArtists.length === 0 ? (
            <Text color="rgba(255,255,255,0.7)">No other artists found</Text>
          ) : (
            <FlatList
              data={filteredArtists}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={renderArtistItem}
              contentContainerStyle={{ paddingRight: 16 }}
            />
          )}
        </LinearGradient>
      </ScrollView>
      <SongBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
          setSelectedSong(null);
        }}
        selectedSong={selectedSong}
        navigation={navigation as any}
        screenType="artist"
      />
      <Toast />
      {showAd && (
        <AdComponent
          onClose={() => setShowAd(false)} // Ẩn AdComponent khi quảng cáo đóng
          onReward={() => {
            console.log("🎉 Người dùng đã nhận thưởng từ quảng cáo!");
            setShowAd(false);
          }}
        />
      )}
    </YStack>
  );
}
function useFollowArtistByUserID(): [any, { isLoading: any }] {
  throw new Error("Function not implemented.");
}
