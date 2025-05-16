import { Animated, Dimensions, StatusBar, View } from "react-native";
import { YStack, XStack, Text, Image, Button } from "tamagui";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import {
  ArrowLeft,
  Globe,
  ArrowDownCircle,
  EllipsisVertical,
  Play,
  Plus,
  Search,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import { RootStackParamList } from "../navigation/AppNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useGetAlbumByIdQuery } from "../services/AlbumService";
import { useGetSongsQuery } from "../services/SongService";
import { HomeStackParamList } from "../navigation/HomeNavigator";

// Dữ liệu giả lập cho album và danh sách bài hát
const albumData = {
  id: "1",
  title: "Đánh Đổi",
  releaseDate: "10 Oct 2023",
  coverImage:
    "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  artistName: "Obito, Shiki",
  totalSongs: 20,
  totalDuration: "56 min",
};

const recommendedAlbums = [
  {
    id: "1",
    title: "Hip-hop Việt",
    artist: "HIEUTHUHAI, Dangrangto, Wxrdie, R...",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    year: "2023",
  },
  {
    id: 2,
    title: "Best of Hip-hop Việt 2023",
    artist: "HIEUTHUHAI, tlinh, RPT MCK, Andree Right Han...",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    year: "2023",
  },
  {
    id: "3",
    title: "SOOI",
    artist: "Vũ, DatKaa...",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    year: "2023",
  },
];

type AlbumRouteProp = RouteProp<HomeStackParamList, "Album">;

export default function AlbumScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<AlbumRouteProp>();
  const {
    data: album,
    isLoading,
    error,
  } = useGetAlbumByIdQuery(route.params.id);
  const {
    data: songs,
    isLoading: songsLoading,
    error: songsError,
  } = useGetSongsQuery();

  useEffect(() => {
    songs?.data.filter((item) => {
      if (item.artistId === album?.data?.artistId) {
        return item;
      }
    });
  }, [songs]);

  // Memoize interpolated values
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

  const searchOpacity = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
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
    [scrollY, screenWidth]
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

  // Memoize handlers
  const handleScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    }),
    [scrollY]
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    // navigation.setOptions({
    //   headerShown: false,
    // });

    return () => {
      // Cleanup animations if needed
      scrollY.stopAnimation();
    };
  }, [scrollY]);

  return (
    <LinearGradient
      p={0}
      m={0}
      flex={1}
      colors={["#3a4a5a", "#000000"]}
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
            // paddingTop: StatusBar.currentHeight || 44,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={handleGoBack}>
              <Button
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
              {album?.data?.title}
            </Animated.Text>
          </View>
          {/* <XStack width={40} /> */}
        </View>
      </Animated.View>

      <ScrollView scrollEventThrottle={16} onScroll={handleScroll}>
        <YStack flex={1} p="$4">
          {/* Search Bar */}
          {/* <Animated.View style={{ opacity: searchOpacity }}>
            <XStack mt={0} mb={20} items="center">
              <Input
                value={search}
                onChangeText={setSearch}
                size="$3.5"
                borderWidth={0}
                rounded={12}
                bg="#23272b"
                color="white"
                placeholder="Find in playlist"
                placeholderTextColor="rgba(255,255,255,0.7)"
                flex={1}
                m="auto"
                style={{
                  fontSize: 15,
                  paddingLeft: 40,
                  fontWeight: "bold",
                  height: 44,
                }}
                focusStyle={{ borderWidth: 0, bg: "#2d3136" }}
              />
              <View
                style={{
                  position: "absolute",
                  left: 16,
                  top: 12,
                  pointerEvents: "none",
                }}
              >
                <Search size={20} color="rgba(255,255,255,0.7)" />
              </View>
              <Button bg="#23272b" rounded={12} ml={12} px={18} py={10}>
                <Text color="white" fontWeight="bold">
                  Sort
                </Text>
              </Button>
            </XStack>
          </Animated.View> */}

          {/* Album Image */}
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
                source={{ uri: album?.data?.coverImage }}
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

          {/* Title & Info */}
          <Text
            fontSize={28}
            width="90%"
            fontWeight="bold"
            color="white"
            mb={4}
            numberOfLines={1}
          >
            {album?.data?.title}
          </Text>
          <Text fontSize={16} color="rgba(255,255,255,0.8)" mb={4}>
            With {albumData.artistName}
          </Text>
          <Text color="rgba(255,255,255,0.7)" fontSize={13} mb={8}>
            {albumData.totalSongs} saves • {albumData.totalDuration}
          </Text>

          {/* Control Buttons */}
          <XStack items="center" justify="space-between" mb={12}>
            <XStack gap={16}>
              <Button
                bg="rgba(255,255,255,0.05)"
                rounded={100}
                icon={
                  <Image
                    source={{ uri: albumData.coverImage }}
                    width={28}
                    height={28}
                    borderRadius={8}
                  />
                }
              />
              <Button
                bg="rgba(255,255,255,0.05)"
                rounded={100}
                icon={<Plus size={20} color="white" />}
              />
              <Button
                bg="rgba(255,255,255,0.05)"
                rounded={100}
                icon={<ArrowDownCircle size={20} color="white" />}
              />
              <Button
                bg="rgba(255,255,255,0.05)"
                rounded={100}
                icon={<EllipsisVertical size={20} color="white" />}
              />
            </XStack>
            <Button
              bg="#1DB954"
              rounded={100}
              width={56}
              height={56}
              icon={<Play size={28} color="black" fill="black" />}
            />
          </XStack>

          {/* Song List */}
          <YStack mt={8}>
            {songs?.data?.map((item) => (
              <XStack
                key={item.id}
                items="center"
                justify="space-between"
                py={10}
              >
                <XStack items="center" gap={12} flex={1}>
                  <Image
                    source={{ uri: item.coverImage }}
                    width={48}
                    height={48}
                    borderRadius={8}
                  />
                  <YStack flex={1}>
                    <Text fontSize={16} fontWeight="bold" color="white">
                      {item.title}
                    </Text>
                    <Text fontSize={13} color="rgba(255,255,255,0.7)">
                      {item?.artist || "Obito, Shiki"}
                    </Text>
                  </YStack>
                </XStack>
                <Text color="rgba(255,255,255,0.7)" fontSize={13} mr={12}>
                  {item.duration}
                </Text>
                <Button
                  bg="transparent"
                  p={0}
                  icon={<EllipsisVertical size={20} color="white" />}
                  pressStyle={{
                    bg: "transparent",
                    borderBlockColor: "transparent",
                  }}
                />
              </XStack>
            ))}
          </YStack>

          {/* You might also like */}
          <Text fontSize={20} fontWeight="bold" color="white" mt={32} mb={12}>
            You might also like
          </Text>
          <FlatList
            data={recommendedAlbums}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={160} mr={16}>
                  <Image
                    source={{ uri: item.coverImage }}
                    width={160}
                    height={160}
                    borderRadius={14}
                  />
                  <Text color="white" fontWeight="bold" mr={8} fontSize={16}>
                    {item.title}
                  </Text>
                  <Text color="rgba(255,255,255,0.7)" fontSize={13}>
                    {item.artist} {item.year && `• ${item.year}`}
                  </Text>
                </YStack>
              </TouchableOpacity>
            )}
            scrollEnabled={true}
          />
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
