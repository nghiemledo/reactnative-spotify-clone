import { Animated, Dimensions, StatusBar, View, FlatList } from "react-native";
import { YStack, XStack, Text, Button, Spinner, Input } from "tamagui";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/HomeNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import {
  ArrowLeft,
  ArrowDownCircle,
  EllipsisVertical,
  Play,
  Plus,
  Share,
  Bell,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import {
  useGetPodcastShowByIdQuery,
  useGetPodcastEpisodesByShowQuery,
  useGetPodcastCategoryByIdQuery,
} from "../../services/PodcastService";
import { PodcastEpisode, PodcastShow } from "../../types/podcast";
import SafeImage from "../../components/SafeImage";
import { PodcastEpisodeItem } from "../../components/podcast/PodcastEpisodeItem";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useAppSelector } from "../../store";
import { useFollowPodcastMutation } from "../../services/AuthService";

type PodcastShowRouteProp = RouteProp<HomeStackParamList, "PodcastShow">;

export default function PodcastShowScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PodcastShowRouteProp>();
  const { showId } = route.params || {};
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isAdded, setIsAdded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<"Episodes" | "About">("Episodes");
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [followPodcast, { isLoading: isFollowLoading }] =
    useFollowPodcastMutation();

  const {
    data: showData,
    isLoading: isShowLoading,
    error: showError,
  } = useGetPodcastShowByIdQuery(showId || "");
  const {
    data: episodesData,
    isLoading: isEpisodesLoading,
    error: episodesError,
  } = useGetPodcastEpisodesByShowQuery(showId || "");
  const { data: categoryData } = useGetPodcastCategoryByIdQuery(
    showData?.data?.categoryId || ""
  );

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

  const handleAddButtonPress = useCallback(async () => {
    if (!userId) {
      console.log("");

      return;
    }

    try {
      await followPodcast({
        UserId: userId,
        ShowId: route.params.showId,
      }).unwrap();
      setIsAdded((prev) => !prev);
      console.log({ UserId: userId, ShowId: route.params.showId });
    } catch (error) {
      console.error("Follow artist failed:", error);
    }
  }, [userId, route.params.showId, isAdded, followPodcast]);

  const handleScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    }),
    [scrollY]
  );

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    return () => {
      scrollY.stopAnimation();
    };
  }, [navigation, scrollY]);

  if (isShowLoading || isEpisodesLoading) {
    return (
      <YStack flex={1} bg="#111111" justify="center" items="center">
        <Spinner size="large" color="$green10" />
      </YStack>
    );
  }

  if (showError || episodesError || !showData?.data) {
    return (
      <YStack flex={1} bg="#111111" justify="center" items="center">
        <Text color="white">Lỗi khi tải dữ liệu podcast</Text>
      </YStack>
    );
  }

  const show = showData.data as PodcastShow;
  const episodes = episodesData?.data || [];
  const categoryName = categoryData?.data?.name || "Unknown Category";

  return (
    <LinearGradient
      p={0}
      m={0}
      flex={1}
      colors={["gray", "#000000"]}
      start={[0, 0]}
      end={[0, 0.1]}
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
                {show.title}
              </Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <YStack flex={1} mt="$8" mb={30} p="$4">
          {/* Thông tin Show */}
          <YStack mb="$4">
            <XStack items="center" mb="$4">
              <SafeImage
                uri={show.coverImage}
                width={130}
                height={130}
                borderRadius={10}
                mr="$4"
              />
              <YStack flex={1}>
                <Text fontSize={24} fontWeight="bold" color="white" mb="$2">
                  {show.title}
                </Text>
                <Text fontSize={15} color="white" mb="$2">
                  {show.creator}
                </Text>
              </YStack>
            </XStack>
            <Text fontSize={13} color="rgba(255,255,255,0.7)">
              Category • {categoryName}
            </Text>
          </YStack>

          {/* Nút điều khiển */}
          <XStack items="center" mb="$4">
            <Button
              mr={15}
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
            <Button chromeless p={0} mr="$3">
              <Bell size={24} color="white" />
            </Button>
            <Button chromeless p={0} mr="$3">
              <Share size={24} color="white" />
            </Button>
            <Button chromeless p={0}>
              <EllipsisVertical size={24} color="white" />
            </Button>
          </XStack>

          {/* Tabs */}
          <XStack mb="$4">
            <YStack mr="$3">
              <Text
                fontSize={18}
                fontWeight={activeTab === "Episodes" ? "bold" : "normal"}
                color={
                  activeTab === "Episodes" ? "white" : "rgba(255,255,255,0.7)"
                }
                onPress={() => setActiveTab("Episodes")}
              >
                Episodes
              </Text>
              {activeTab === "Episodes" && (
                <XStack
                  borderBottomWidth={2}
                  borderBottomColor="#1DB954"
                  mt="$2"
                  width={50}
                />
              )}
            </YStack>
            <YStack>
              <Text
                fontSize={18}
                fontWeight={activeTab === "About" ? "bold" : "normal"}
                color={
                  activeTab === "About" ? "white" : "rgba(255,255,255,0.7)"
                }
                onPress={() => setActiveTab("About")}
              >
                About
              </Text>
              {activeTab === "About" && (
                <XStack
                  borderBottomWidth={2}
                  borderBottomColor="#1DB954"
                  mt="$2"
                  width={50}
                />
              )}
            </YStack>
          </XStack>

          {/* Nội dung theo tab */}
          {activeTab === "Episodes" && (
            <>
              {/* Danh sách tập */}
              {episodes.length === 0 ? (
                <Text color="rgba(255,255,255,0.7)">
                  No Episodes available.
                </Text>
              ) : (
                <FlatList
                  data={episodes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <PodcastEpisodeItem
                      episode={item}
                      navigation={navigation}
                    />
                  )}
                  scrollEnabled={false}
                />
              )}
            </>
          )}

          {activeTab === "About" && (
            <YStack>
              <Text fontSize={18} fontWeight="bold" color="white" mb="$2">
                About {show.title}
              </Text>
              <Text fontSize={14} color="rgba(255,255,255,0.7)" mb="$2">
                Creator: {show.creator}
              </Text>
              <Text fontSize={14} color="rgba(255,255,255,0.7)" mb="$2">
                Category: {categoryName}
              </Text>
              <Text fontSize={14} color="rgba(255,255,255,0.7)" mb="$2">
                Created At:{" "}
                {show.createdAt
                  ? new Date(show.createdAt).toLocaleDateString()
                  : "Unknown"}
              </Text>
              <Text fontSize={14} color="rgba(255,255,255,0.7)" mb="$2">
                Description: {show.description || "No description available."}
              </Text>
            </YStack>
          )}
        </YStack>
      </Animated.ScrollView>
    </LinearGradient>
  );
}
