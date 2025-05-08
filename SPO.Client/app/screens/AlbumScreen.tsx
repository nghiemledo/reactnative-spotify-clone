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
import { RootStackParamList } from "../types";
import { useDispatch } from "react-redux";
import { playSong } from "../store/playerSlice";
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

// Dữ liệu giả lập cho album và danh sách bài hát
const albumData = {
  id: "1",
  title: "Đánh Đổi",
  releaseDate: "10 Oct 2023",
  coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  artistName: "Obito, Shiki",
  totalSongs: 20,
  totalDuration: "56 min",
};

const songs = [
  { id: "1", title: "Còn Nợ Ba Mẹ", artist: "Obito, Shiki", duration: "3:15" },
  { id: "2", title: "Champion", artist: "Obito, Shiki", duration: "4:20" },
  { id: "3", title: "Chưa Xong", artist: "Obito, Shiki", duration: "2:10" },
  { id: "4", title: "Chúa Xong", artist: "Obito, Shiki", duration: "5:00" },
  { id: "5", title: "Tự Suong", artist: "Obito, Shiki", duration: "3:45" },
  { id: "6", title: "Outro", artist: "Obito, Shiki", duration: "5:00" },
  // Thêm các bài hát khác nếu cần để đạt 20 bài
];

const recommendedAlbums = [
  {
    id: "1",
    title: "Hip-hop Việt",
    artist: "HIEUTHUHAI, Dangrangto, Wxrdie, R...",
    coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    year: "2023",
  },
  {
    id: 2,
    title: "Best of Hip-hop Việt 2023",
    artist: "HIEUTHUHAI, tlinh, RPT MCK, Andree Right Han...",
    coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    year: "2023",
  },
  {
    id: "3",
    title: "SOOI",
    artist: "Vũ, DatKaa...",
    coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    year: "2023",
  },
];

type AlbumScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AlbumScreen"
>;

export default function AlbumScreen({
  navigation,
}: {
  navigation: AlbumScreenNavigationProp;
}) {
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState("");

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
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    ),
    [scrollY]
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    return () => {
      // Cleanup animations if needed
      scrollY.stopAnimation();
    };
  }, [navigation, scrollY]);

  return (
    <LinearGradient
      padding={0}
      margin={0}
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
            <TouchableOpacity onPress={handleGoBack}>
              <Button
                size="$8"
                chromeless
                icon={ArrowLeft}
                color="white"
                padding={0}
                backgroundColor="transparent"
                pressStyle={{
                  backgroundColor: "transparent",
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
              {albumData.title}
            </Animated.Text>
          </View>
          <XStack width={40} />
        </View>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <YStack flex={1} marginTop="$6" padding="$4">
          {/* Search Bar */}
          <Animated.View style={{ opacity: searchOpacity }}>
            <XStack marginTop={0} marginBottom={20} alignItems="center">
              <Input
                value={search}
                onChangeText={setSearch}
                size="$3.5"
                borderWidth={0}
                borderRadius={12}
                backgroundColor="#23272b"
                color="white"
                placeholder="Find in playlist"
                placeholderTextColor="rgba(255,255,255,0.7)"
                flex={1}
                margin="auto"
                style={{ fontSize: 15, paddingLeft: 40, fontWeight: "bold", height: 44 }}
                focusStyle={{ borderWidth: 0, backgroundColor: "#2d3136" }}
              />
              <View style={{ position: "absolute", left: 16, top: 12, pointerEvents: "none" }}>
                <Search size={20} color="rgba(255,255,255,0.7)" />
              </View>
              <Button backgroundColor="#23272b" borderRadius={12} marginLeft={12} paddingHorizontal={18} paddingVertical={10}>
                <Text color="white" fontWeight="bold">Sort</Text>
              </Button>
            </XStack>
          </Animated.View>

          {/* Album Image */}
          <XStack alignItems="center" justifyContent="center" marginBottom={16}>
            <View
              style={{
                borderRadius: 18,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Animated.Image
                source={{ uri: albumData.coverImage }}
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
          <Text fontSize={28} fontWeight="bold" color="white" marginBottom={4}>
            {albumData.title}
          </Text>
          <Text fontSize={16} color="rgba(255,255,255,0.8)" marginBottom={4}>
            With {albumData.artistName}
          </Text>
          <Text color="rgba(255,255,255,0.7)" fontSize={13} marginBottom={8}>
            {albumData.totalSongs} saves • {albumData.totalDuration}
          </Text>

          {/* Control Buttons */}
          <XStack alignItems="center" justifyContent="space-between" marginBottom={12}>
            <XStack gap={16}>
              <Button backgroundColor="rgba(255,255,255,0.05)" borderRadius={100} icon={<Image source={{ uri: albumData.coverImage }} width={28} height={28} borderRadius={8} />} />
              <Button backgroundColor="rgba(255,255,255,0.05)" borderRadius={100} icon={<Plus size={20} color="white" />} />
              <Button backgroundColor="rgba(255,255,255,0.05)" borderRadius={100} icon={<ArrowDownCircle size={20} color="white" />} />
              <Button backgroundColor="rgba(255,255,255,0.05)" borderRadius={100} icon={<EllipsisVertical size={20} color="white" />} />
            </XStack>
            <Button backgroundColor="#1DB954" borderRadius={100} width={56} height={56} icon={<Play size={28} color="black" fill="black" />} />
          </XStack>

          {/* Song List */}
          <YStack marginTop={8}>
            {songs.map((item) => (
              <XStack key={item.id} alignItems="center" justifyContent="space-between" paddingVertical={10}>
                <XStack alignItems="center" gap={12} flex={1}>
                  <Image source={{ uri: albumData.coverImage }} width={48} height={48} borderRadius={8} />
                  <YStack flex={1}>
                    <Text fontSize={16} fontWeight="bold" color="white">{item.title}</Text>
                    <Text fontSize={13} color="rgba(255,255,255,0.7)">{item.artist}</Text>
                  </YStack>
                </XStack>
                <Text color="rgba(255,255,255,0.7)" fontSize={13} marginRight={12}>{item.duration}</Text>
                <Button backgroundColor="transparent" padding={0} icon={<EllipsisVertical size={20} color="white" />} pressStyle={{ backgroundColor: "transparent", borderBlockColor: "transparent" }} />
              </XStack>
            ))}
          </YStack>

          {/* You might also like */}
          <Text fontSize={20} fontWeight="bold" color="white" marginTop={32} marginBottom={12}>You might also like</Text>
          <FlatList
            data={recommendedAlbums}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={160} marginRight={16}>
                  <Image source={{ uri: item.coverImage }} width={160} height={160} borderRadius={14} />
                  <Text color="white" fontWeight="bold" marginTop={8} fontSize={16}>{item.title}</Text>
                  <Text color="rgba(255,255,255,0.7)" fontSize={13}>{item.artist} {item.year && `• ${item.year}`}</Text>
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