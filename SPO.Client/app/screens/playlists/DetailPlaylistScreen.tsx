import { Animated, Dimensions, StatusBar, View } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Image,
  Button,
  H3,
  Avatar,
  Input,
} from "tamagui";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
<<<<<<< HEAD:SPO.Client/app/screens/DetailPlaylistScreen.tsx
import { RootStackParamList } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../store/playerSlice";
import { fetchSongs } from "../store/songSlice";
import { useEffect, useRef } from "react";
=======
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
>>>>>>> feature/nguyenxuantruong/playingscreen:SPO.Client/app/screens/playlists/DetailPlaylistScreen.tsx
import {
  ArrowLeft,
  Globe,
  ArrowDownCircle,
  UserPlus,
  EllipsisVertical,
  Play,
  Plus,
  ChevronsUpDown,
  Pen,
  Share2,
  Shuffle,
  Search,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import { AppDispatch, RootState } from "../store";

type QueueScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "detailPlaylist"
>;

export default function DetailPlaylistScreen({
  navigation,
}: {
  navigation: QueueScreenNavigationProp;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);

  const scrollY = useRef(new Animated.Value(0)).current;

  const navbarBackground = scrollY.interpolate({
    inputRange: [190, 220],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(51, 51, 51, 1)"],
    extrapolate: "clamp",
  });
  const titleOpacity = scrollY.interpolate({
    inputRange: [200, 230],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const searchOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const screenWidth = Dimensions.get("window").width;

  const imageSize = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [screenWidth * 0.5, screenWidth * 0.3],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [150, 300],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    dispatch(fetchSongs());
  }, [navigation, dispatch]);

  // Log songs state for debugging
  useEffect(() => {
    console.log("Songs state:", {
      songs,
      loading,
      error,
      songCount: songs.length,
      firstSong: songs[0] || "No songs",
    });
  }, [songs, loading, error]);

  // Hàm kiểm tra URL ảnh hợp lệ
  const getValidImageUrl = (url: string | undefined): string => {
    if (url && url.startsWith("http") && /\.(jpg|jpeg|png|webp)$/i.test(url)) {
      return url;
    }
    return "https://placehold.co/150x150";
  };

  return (
    <LinearGradient
      p={0}
      m={0}
      flex={1}
      colors={["#D9F99D", "#000000"]}
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
          height: 90,
          zIndex: 1000,
          backgroundColor: navbarBackground,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: StatusBar.currentHeight || 44,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Button
                size="$8"
                chromeless
                icon={ArrowLeft}
                color="white"
                p={0}
                bg="transparent"
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
            </TouchableOpacity>
            <Animated.Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                opacity: titleOpacity,
                marginLeft: 8,
              }}
            >
              Danh sách phát của tôi
            </Animated.Text>
          </View>
          <XStack width={40} />
        </View>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack flex={1} mt="$6" p="$4">
          {/* Thanh tìm kiếm */}
          <Animated.View style={{ opacity: searchOpacity }}>
            <XStack mt="$6" mb="$6">
              <Input
                size="$3.5"
                borderWidth={0}
                rounded="$2"
                bg="rgba(255, 255, 255, 0.2)"
                color="white"
                placeholder="Tìm trong danh sách phát"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                flex={1}
                m="auto"
                style={{
                  fontSize: 15,
                  paddingLeft: 40,
                  fontWeight: "bold",
                }}
                focusStyle={{
                  borderWidth: 0,
                  bg: "rgba(255, 255, 255, 0.3)",
                }}
              />
              <XStack
                position="absolute"
                l="$3"
                t="$2.5"
                items="center"
                pointerEvents="none"
              >
                <Search size="$1" color="rgba(255, 255, 255, 0.6)" />
              </XStack>
            </XStack>
          </Animated.View>
          <XStack
            items="center"
            flex={1}
            justify="center"
            self="center"
            mb={0}
            p={0}
          >
            <Animated.Image
              source={{
                uri: getValidImageUrl(songs[0]?.coverImage),
              }}
              style={{
                width: imageSize,
                height: imageSize,
                opacity,
                borderRadius: 8,
                alignSelf: "center",
              }}
              resizeMode="stretch"
              onError={(e) => {
                console.log("Main image load error:", e.nativeEvent.error, "URL:", songs[0]?.coverImage);
              }}
            />
          </XStack>

          <H3 mt={0} mb="$3" color="white" fontWeight="bold">
            Danh sách phát của tôi
          </H3>

          <YStack>
            <XStack items="center" space="$3" mb="$3">
              <Avatar circular size="$2">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src={getValidImageUrl(songs[0]?.coverImage)}
                />
                <Avatar.Fallback backgroundColor="$blue10" />
              </Avatar>
              <YStack items="center">
                <Text
                  fontSize={13}
                  fontWeight="bold"
                  color="white"
                  text="center"
                >
                  Lương Hoàng Hải
                </Text>
              </YStack>
            </XStack>
            <XStack items="center" space="$2" mb="$3">
              <Globe size={18} color="#ffff" />
              <YStack items="center">
                <Text
                  fontSize={13}
                  fontWeight="bold"
                  color="white"
                  text="center"
                >
                  {songs.length} bài hát
                </Text>
              </YStack>
            </XStack>
          </YStack>

          <XStack space="$4" mb="$4" justify="space-between">
            <XStack gap="$4">
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={
                  <ArrowDownCircle size="$2" color="white" strokeWidth={1} />
                }
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={<UserPlus size="$2" color="white" strokeWidth={1} />}
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={<Share2 size="$2" color="white" strokeWidth={1} />}
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={
                  <EllipsisVertical size="$2" color="white" strokeWidth={1} />
                }
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
            </XStack>
            <XStack gap="$4">
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={<Shuffle size="$2" color="white" strokeWidth={1} />}
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="#1DB954"
                m={0}
                p={0}
                rounded={100}
                width="$4"
                height="$4"
                icon={
                  <Play size="$2" color="black" fill="black" strokeWidth={1} />
                }
              />
            </XStack>
          </XStack>

          <XStack space="$2" mb="$4">
            <Button
              size="$3"
              bg="rgba(255, 255, 255, 0.2)"
              rounded={50}
              onPress={() => console.log("Thêm bài hát")}
            >
              <XStack
                items="center"
                space="$1"
                onPress={() => navigation.navigate("addSongPlaylist")}
              >
                <Plus color="white" size="$1" />
                <Text color="white" fontWeight="bold" fontSize="$3">
                  Thêm
                </Text>
              </XStack>
            </Button>
            <Button
              size="$3"
              bg="rgba(255, 255, 255, 0.2)"
              rounded={50}
              onPress={() => console.log("Sắp xếp")}
            >
              <XStack items="center" space="$1">
                <ChevronsUpDown color="white" size="$1" />
                <Text fontWeight="bold" color="white" fontSize="$3">
                  Sắp xếp
                </Text>
              </XStack>
            </Button>
            <Button
              size="$3"
              bg="rgba(255, 255, 255, 0.2)"
              rounded={50}
              onPress={() => navigation.navigate("updateSongPlaylist")}
            >
              <XStack items="center" space="$1">
                <Pen color="white" size="$1" />
                <Text fontWeight="bold" color="white" fontSize="$3">
                  Chỉnh sửa
                </Text>
              </XStack>
            </Button>
          </XStack>

<<<<<<< HEAD:SPO.Client/app/screens/DetailPlaylistScreen.tsx
          {/* Danh sách bài hát */}
          {loading ? (
            <Text color="white">Đang tải...</Text>
          ) : error ? (
            <Text color="red">Lỗi: {error}</Text>
          ) : songs.length === 0 ? (
            <Text color="white">Không có bài hát nào</Text>
          ) : (
            <FlatList
              data={songs}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(playSong(item.title));
                    // navigation.navigate("PlayerModal");
                  }}
                >
                  <XStack
                    alignItems="center"
                    justifyContent="space-between"
                    paddingVertical="$2"
                  >
                    <XStack alignItems="center" gap="$3" flex={1}>
                      <Image
                        source={{
                          uri: getValidImageUrl(item.coverImage),
                        }}
                        width={50}
                        height={50}
                        borderRadius={8}
                        onError={(e) => {
                          console.log("Song image load error:", e.nativeEvent.error, "URL:", item.coverImage);
                        }}
                      />
                      <YStack flex={1}>
                        <Text fontSize={15} fontWeight="300" color="white">
                          {item.title}
                        </Text>
                      </YStack>
                    </XStack>
                    <Button
                      backgroundColor="transparent"
                      padding={0}
                      icon={
                        <EllipsisVertical
                          size="$2"
                          color="white"
                          strokeWidth={1}
                        />
                      }
                      pressStyle={{
                        backgroundColor: "transparent",
                        borderBlockColor: "transparent",
                      }}
                    />
                  </XStack>
                </TouchableOpacity>
              )}
            />
          )}
=======
          {/* Danh sách bài hát/podcast */}
          <FlatList
            data={queueItems}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PlayerModal");
                }}
              >
                <XStack items="center" justify="space-between" py="$2">
                  <XStack items="center" gap="$3" flex={1}>
                    <Image
                      source={{ uri: item.image }}
                      width={50}
                      height={50}
                      borderRadius={8}
                    />
                    <YStack flex={1}>
                      <Text fontSize={15} fontWeight="300" color="white">
                        {item.title}
                      </Text>
                      <Text fontSize={13} color="white" opacity={0.7}>
                        {item.description}
                      </Text>
                    </YStack>
                  </XStack>
                  <Button
                    bg="transparent"
                    p={0}
                    icon={
                      <EllipsisVertical
                        size="$2"
                        color="white"
                        strokeWidth={1}
                      />
                    }
                    pressStyle={{
                      bg: "transparent",
                      borderBlockColor: "transparent",
                    }}
                  />
                </XStack>
              </TouchableOpacity>
            )}
          />
>>>>>>> feature/nguyenxuantruong/playingscreen:SPO.Client/app/screens/playlists/DetailPlaylistScreen.tsx
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}