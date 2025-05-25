import { Animated, Dimensions, StatusBar, View, FlatList } from "react-native";
import { YStack, XStack, Text, Image, Button, Spinner } from "tamagui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import {
  ArrowLeft,
  ArrowDownCircle,
  EllipsisVertical,
  Play,
  PlusCircle,
  Shuffle,
  CheckCircle,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  useGetAlbumByIdQuery,
  useGetAlbumsQuery,
} from "../services/AlbumService";
import { useGetSongsQuery } from "../services/SongService";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Album } from "../types/album";
import { useGetArtistsQuery } from "../services/ArtistService";
import { Artist } from "../types/artist";
import Toast from "react-native-toast-message";
import { Song } from "../types/song";
import { SongItem } from "../components/SongItem";
import { AlbumItem } from "../components/AlbumItem";
import SongBottomSheet from "../components/SongBottomSheet";
import { playSong, setPlayerQueue } from "../services/playerService";
import { HomeStackParamList } from "../navigation/HomeNavigator";
import { store } from "../store";
import { setQueue as setReduxQueue } from "../store/playerSlice";

type AlbumRouteProp = RouteProp<HomeStackParamList, "Album">;

type AlbumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AlbumScreen() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<AlbumScreenNavigationProp>();
  const route = useRoute<AlbumRouteProp>();
  const albumId = route.params?.id;

  if (!albumId) {
    return (
      <YStack flex={1} justify="center" items="center">
        <Text color="white">Lỗi: Không tìm thấy ID album</Text>
        <Button onPress={() => navigation.goBack()} mt="$4">
          Quay lại
        </Button>
      </YStack>
    );
  }

  const { data: album, isLoading, error } = useGetAlbumByIdQuery(albumId);
  const {
    data: songs,
    isLoading: songsLoading,
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

  const filteredAlbums = albums?.data?.filter(
    (item: Album) => item.id !== albumId
  );

  const filteredSongs = useMemo(() => {
    return (
      songs?.data?.filter((item) => item.albumId === album?.data?.id) || []
    );
  }, [songs, album]);

  const navbarBackground = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [190, 220],
        outputRange: ["rgba(0, 0, 0, 0)", "rgba(51, 51, 51, 1)"],
        extrapolate: "clamp",
      }),
    [scrollY]
  );

  const titleOpacity = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [200, 230],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
    [scrollY]
  );

  const screenWidth = Dimensions.get("window").width;

  const imageSize = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [screenWidth * 0.5, screenWidth * 0.3],
        extrapolate: "clamp",
      }),
    [screenWidth]
  );

  const opacity = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [150, 300],
        outputRange: [1, 0],
        extrapolate: "clamp",
      }),
    [scrollY]
  );

  const handleScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    }),
    [scrollY]
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddButtonPress = useCallback(() => {
    setIsAdded((prev) => !prev);
    Toast.show({
      type: "success",
      text1: isAdded ? "Đã xóa khỏi Thư viện" : "Đã thêm vào Thư viện",
      position: "bottom",
      visibilityTime: 2000,
    });
  }, [isAdded]);

  const handleNavigation = <T extends keyof HomeStackParamList>(
    screen: T,
    params: HomeStackParamList[T]
  ) => {
    navigation.navigate(screen as any, params);
  };

  const getArtistName = (artistId: string | undefined) => {
    if (!artistId) return "Nghệ sĩ không xác định";
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.name || "Nghệ sĩ không xác định";
  };

  const getArtistUrlAvatar = (artistId: string | undefined) => {
    if (!artistId) return "https://via.placeholder.com/120";
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.urlAvatar || "https://via.placeholder.com/120";
  };

  const handleMorePress = (song: Song) => {
    setSelectedSong(song);
    setIsBottomSheetOpen(true);
  };

  // Hàm xử lý khi nhấn nút Play
  const handlePlayAll = async () => {
    if (!filteredSongs || filteredSongs.length === 0) {
      Toast.show({
        type: "error",
        text1: "Không có bài hát nào để phát",
        position: "bottom",
        visibilityTime: 2000,
      });
      return;
    }

    try {
      // Chuyển đổi filteredSongs thành định dạng Track
      const tracks = filteredSongs
        .filter((song) => song.audioUrl && song.title) // Lọc bài hát hợp lệ
        .map((song: Song) => ({
          id: song.id || `song-${song.title}`,
          url: song.audioUrl || "",
          title: song.title || "",
          artist: song.artistId || "Nghệ sĩ không xác định",
          artwork:
            song.coverImage ||
            "https://via.placeholder.com/300?text=Không+có+hình+ảnh",
          duration: song.duration || 0,
        }));

      // Xóa hàng đợi hiện tại và thêm danh sách mới
      store.dispatch(setReduxQueue(tracks));
      await setPlayerQueue(tracks);

      // Phát bài hát đầu tiên
      const firstSong = filteredSongs[0];
      await playSong(firstSong);

      // Điều hướng đến màn hình Playing
      navigation.navigate("Playing");
      Toast.show({
        type: "success",
        text1: `Đang phát album: ${album?.data?.title || "album"}`,
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

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <AlbumItem
      album={item}
      getArtistName={getArtistName}
      showDate={false}
      onPress={() => handleNavigation("Album", { id: item.id })}
    />
  );

  const renderInfo = () => (
    <YStack pt={16} pb={20}>
      <XStack items="center" justify="center" mb={16}>
        <View
          style={{
            borderRadius: 18,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Animated.Image
            source={{
              uri: album?.data?.coverImage || "https://via.placeholder.com/300",
            }}
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: 18,
              opacity,
            }}
            resizeMode="cover"
          />
        </View>
      </XStack>

      <Text
        fontSize={28}
        width="90%"
        fontWeight="bold"
        color="white"
        mb={4}
        numberOfLines={1}
      >
        {album?.data?.title || "Đang tải..."}
      </Text>
      <XStack>
        <Image
          source={{ uri: getArtistUrlAvatar(album?.data?.artistId) }}
          width={27}
          height={27}
          borderRadius={100}
          marginInlineEnd={10}
        />
        <Text fontSize={15} color="#fff" fontWeight="bold" mb={10}>
          {getArtistName(album?.data?.artistId)}
        </Text>
      </XStack>

      <Text fontSize={16} color="rgba(255,255,255,0.8)" mb={4}>
        Album •{" "}
        {album?.data?.createdAt
          ? new Date(album.data.createdAt).toLocaleDateString("vi-VN")
          : "Không có ngày"}
      </Text>

      <XStack items="center" justify="space-between" mb={12}>
        <XStack>
          <Button
            bg="transparent"
            mr={20}
            rounded={100}
            p={0}
            onPress={handleAddButtonPress}
            icon={
              isAdded ? (
                <CheckCircle
                  size={25}
                  color="black"
                  bg="#1DB954"
                  rounded="$10"
                />
              ) : (
                <PlusCircle size={25} color="#AAAAAA" />
              )
            }
          />
          <Button
            mr={20}
            bg="transparent"
            rounded={100}
            p={0}
            icon={<ArrowDownCircle size={25} color="#AAAAAA" />}
          />
          <Button
            bg="transparent"
            rounded={100}
            p={0}
            icon={<EllipsisVertical size={25} color="#AAAAAA" />}
          />
        </XStack>
        <XStack items="center">
          <Button bg="transparent">
            <Shuffle color="#1DB954" />
          </Button>
          <Button
            bg="#1DB954"
            rounded={100}
            width={56}
            height={56}
            icon={<Play size={28} color="black" fill="black" />}
            onPress={handlePlayAll} // Gắn hàm handlePlayAll
          />
        </XStack>
      </XStack>
    </YStack>
  );

  const renderAlbum = () => (
    <YStack mt="$6" mb={70}>
      <Text fontSize={20} fontWeight="bold" color="white" mb="$3">
        Bạn cũng có thể thích
      </Text>
      {isAlbumsLoading ? (
        <Spinner size="large" color="$green10" />
      ) : albumsError ? (
        <Text color="white">Lỗi khi tải danh sách album</Text>
      ) : !filteredAlbums || filteredAlbums.length === 0 ? (
        <Text color="rgba(255,255,255,0.7)">Không tìm thấy album khác</Text>
      ) : (
        <FlatList
          data={filteredAlbums}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderAlbumItem}
          contentContainerStyle={{ paddingRight: 16 }}
        />
      )}
    </YStack>
  );

  useEffect(() => {
    return () => {
      scrollY.stopAnimation();
    };
  }, [scrollY]);

  return (
    <LinearGradient
      p={0}
      m={0}
      flex={1}
      colors={["#3a4a5a", "#111111"]}
      start={[0, 0]}
      end={[0, 0.5]}
    >
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
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button
              onPress={handleGoBack}
              size="$8"
              chromeless
              icon={ArrowLeft}
              color="#fff"
              p={0}
              bg="transparent"
              pressStyle={{
                bg: "transparent",
                borderBlockColor: "transparent",
              }}
            />
            <Animated.Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                opacity: titleOpacity,
                marginLeft: 8,
              }}
            >
              {album?.data?.title || "Đang tải..."}
            </Animated.Text>
          </View>
        </View>
      </Animated.View>

      <FlatList
        style={{ marginHorizontal: 16 }}
        data={filteredSongs}
        keyExtractor={(item, index) => item.id || `song-${index}`}
        renderItem={({ item }) => (
          <SongItem
            song={item}
            showIndex={false}
            showImage={true}
            showArtistName={true}
            imageSize={48}
            getArtistName={getArtistName}
            onMorePress={handleMorePress}
            onSongPress={async (song) => {
              try {
                await playSong(song);
                navigation.navigate("Playing");
                console.log("Bài hát được nhấn:", song.title);
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
          />
        )}
        ListHeaderComponent={renderInfo}
        ListFooterComponent={renderAlbum}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 70 }}
        ListEmptyComponent={
          songsLoading ? (
            <Spinner size="large" color="$green10" />
          ) : (
            <Text color="rgba(255,255,255,0.7)">
              {songsLoading
                ? "Đang tải bài hát..."
                : "Không tìm thấy bài hát cho album này"}
            </Text>
          )
        }
        showsVerticalScrollIndicator={false}
      />

      <Toast />
      <SongBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
          setSelectedSong(null);
        }}
        selectedSong={selectedSong}
        navigation={navigation as any}
        screenType="album"
        onAddToOtherPlaylist={() => {
          navigation.navigate("AddToPlaylist");
        }}
        onAddToQueue={() => {
          console.log("Thêm vào hàng đợi");
        }}
        onShowSpotifyCode={() => {
          console.log("Hiển thị mã Spotify");
        }}
        onGoToAlbum={() => {}}
        onGoToArtist={() => {
          if (selectedSong?.artistId) {
            handleNavigation("Artist", { id: selectedSong.artistId });
          } else {
            Toast.show({
              type: "error",
              text1: "Không tìm thấy nghệ sĩ cho bài hát này",
              position: "bottom",
              visibilityTime: 2000,
            });
          }
        }}
      />
    </LinearGradient>
  );
}
