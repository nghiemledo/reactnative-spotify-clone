import {
  Animated,
  Dimensions,
  StatusBar,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { YStack, XStack, Text, Button, Avatar, Input } from "tamagui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/HomeNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import {
  ArrowLeft,
  ArrowDownCircle,
  PlusCircle,
  Share,
  Play,
  Pause,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import TrackPlayer from "react-native-track-player";
import Toast from "react-native-toast-message";

import SafeImage from "../../components/SafeImage";
import { useAppSelector, useAppDispatch } from "../../store";
import { setPlaying } from "../../store/playerSlice";
import { playPodcastEpisode } from "../../services/playerService";
import {
  useGetPodcastEpisodeByIdQuery,
  useGetPodcastShowByIdQuery,
} from "../../services/PodcastService";

const comments = [
  {
    id: "1",
    user: "grace hiy",
    time: "1 week ago",
    comment: "yêu cả podcast này thật sự 💙",
    likes: 17,
  },
  {
    id: "2",
    user: "TruongbaoLam",
    time: "1 week ago",
    comment:
      "mở podcast của vì sao thế nhỉ có thể nghe mọi lúc luôn tự lúc học bài, nấu cơm, đọc sách, ngủ...",
    likes: 5,
  },
];

type PodcastRouteProp = RouteProp<HomeStackParamList, "PodcastEpisodeScreen">;

export default function PodcastDetailScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<PodcastRouteProp>();
  const episodeId = route.params?.episodeId;
  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const { isPlaying, currentTrack } = useAppSelector((state) => state.player);
  const isCurrentEpisodePlaying = isPlaying && currentTrack?.id === episodeId;

  const {
    data: episodesData,
    isLoading: isEpisodesLoading,
    error: episodesError,
  } = useGetPodcastEpisodeByIdQuery(episodeId || "", { skip: !episodeId });
  const {
    data: showData,
    isLoading: isShowLoading,
    error: showError,
  } = useGetPodcastShowByIdQuery(episodesData?.data?.showId || "");

  const screenWidth = Dimensions.get("window").width;
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descMaxLength = 120;
  const desc = episodesData?.data?.description || "";
  const descToShow =
    showFullDesc || desc.length <= descMaxLength
      ? desc
      : desc.slice(0, descMaxLength) + "...";

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

  const handleScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    }),
    [scrollY]
  );
  const formatDuration = useCallback(
    (duration: number) =>
      duration >= 3600
        ? `${Math.floor(duration / 3600)}hr ${
            Math.floor(duration / 60) % 60
          }min`
        : `${Math.floor(duration / 60)}min`,
    []
  );

  const handlePlayPause = useCallback(async () => {
    if (!episodesData?.data) return;
    try {
      if (isCurrentEpisodePlaying) {
        await TrackPlayer.pause();
        dispatch(setPlaying(false));
        Toast.show({
          type: "info",
          text1: "Tạm dừng",
          text2: `Đã tạm dừng: ${episodesData.data.title}`,
        });
      } else {
        if (currentTrack?.id !== episodesData.data.id)
          await playPodcastEpisode(episodesData.data);
        else {
          await TrackPlayer.play();
          dispatch(setPlaying(true));
        }
        Toast.show({
          type: "success",
          text1: "Đang phát",
          text2: `Đang phát: ${episodesData.data.title}`,
        });
      }
    } catch (err) {
      console.error("Error playing podcast episode:", err);
      Toast.show({
        type: "error",
        text1: "Lỗi phát podcast",
        text2: "Không thể phát tập này. Vui lòng thử lại sau.",
      });
    }
  }, [episodesData, isCurrentEpisodePlaying, currentTrack, dispatch]);

  const renderCommentItem = useCallback(
    ({ item }: { item: (typeof comments)[0] }) => (
      <YStack mb="$4">
        <XStack items="center" gap="$3">
          <Avatar circular size="$3">
            <Avatar.Image src="https://via.placeholder.com/150" />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <YStack flex={1}>
            <XStack justify="space-between">
              <Text color="white" fontWeight="bold">
                {item.user}
              </Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                {item.time}
              </Text>
            </XStack>
            <Text color="white">{item.comment}</Text>
            <XStack gap="$3" mt="$2">
              <Text color="white">❤️ {item.likes}</Text>
              <Text color="white">💬</Text>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    ),
    []
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    return () => scrollY.stopAnimation();
  }, [navigation, scrollY]);

  if (isEpisodesLoading || isShowLoading)
    return (
      <YStack flex={1} justify="center" items="center" bg="black">
        <Text color="white">Loading...</Text>
      </YStack>
    );
  if (episodesError || showError || !episodeId || !episodesData?.data)
    return (
      <YStack flex={1} justify="center" items="center" bg="black">
        <Text color="white">Error loading episode or show data</Text>
      </YStack>
    );

  return (
    <LinearGradient
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
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity>
              <Button
                size="$8"
                chromeless
                icon={ArrowLeft}
                color="white"
                p={4}
                bg="transparent"
                onPress={() => navigation.goBack()}
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
              {showData?.data?.title || "Podcast Episode"}
            </Animated.Text>
          </View>
          <XStack width={40} />
        </View>
      </Animated.View>
      <ScrollView scrollEventThrottle={16} onScroll={handleScroll}>
        <YStack flex={1} mt="$6" px="$4" pb="$15">
          <XStack items="center" justify="center">
            <Animated.Image
              source={{
                uri:
                  showData?.data?.coverImage ||
                  "https://via.placeholder.com/150",
              }}
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: 18,
                marginBottom: 16,
                opacity,
              }}
              resizeMode="cover"
            />
          </XStack>
          <Text fontSize={24} fontWeight="bold" color="white" mb={4}>
            {episodesData.data.title}
          </Text>
          <XStack items="center" mb={4}>
            <XStack bg="transparent" borderWidth={2} rounded={5} borderColor="gray" my={10}><SafeImage m={3} uri={showData?.data?.coverImage} height={40} width={30} rounded={5}/></XStack>
            <Text fontSize={15} color="white" ml={10} >
              {showData?.data?.creator || "Unknown Creator"}
            </Text>
          </XStack>
          <XStack items="center" mb={8}>
            <Text color="rgba(255,255,255,0.7)" fontSize={13}>
              {new Date(episodesData.data.releaseDate).toLocaleDateString()} •{" "}
              {formatDuration(episodesData.data.duration || 0)}
            </Text>
          </XStack>
          <XStack justify="space-between" items="center" space="$2" my={8}>
            <XStack>
              <Button chromeless p={0} mr={16}>
                <PlusCircle size={28} color="rgba(255,255,255,0.7)" />
              </Button>
              <Button chromeless p={0} mr={16}>
                <ArrowDownCircle size={28} color="rgba(255,255,255,0.7)" />
              </Button>
              <Button chromeless p={0} mr={16}>
                <Share size={28} color="rgba(255,255,255,0.7)" />
              </Button>
            </XStack>
            <Button
              bg="#1DB954"
              rounded={100}
              width={40}
              height={40}
              icon={
                isCurrentEpisodePlaying ? (
                  <Pause size={20} fill="black" />
                ) : (
                  <Play size={20} fill="black" />
                )
              }
              onPress={handlePlayPause}
            />
          </XStack>
          <Text color="white" mb={8}>
            {descToShow}
            {desc.length > descMaxLength && !showFullDesc && (
              <Text color="#1DB954" onPress={() => setShowFullDesc(true)}>
                {" "}
                see more
              </Text>
            )}
          </Text>
          <YStack bg="rgba(30,30,30,0.95)" rounded={18} p={16} mt={16}>
            <XStack justify="space-between" items="center" mb={8}>
              <Text color="white" fontWeight="bold" fontSize={18}>
                Comments
              </Text>
              <TouchableOpacity>
                <Text color="#1DB954" fontWeight="bold">
                  Show all (6)
                </Text>
              </TouchableOpacity>
            </XStack>
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={renderCommentItem}
            />
            <XStack mt="$3">
              <Input
                size="$3.5"
                borderWidth={0}
                rounded="$2"
                bg="rgba(255, 255, 255, 0.2)"
                color="white"
                placeholder="Leave a comment..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                flex={1}
                m="auto"
                style={{ fontSize: 15, paddingLeft: 10, fontWeight: "bold" }}
                focusStyle={{ borderWidth: 0, bg: "rgba(255, 255, 255, 0.3)" }}
              />
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
