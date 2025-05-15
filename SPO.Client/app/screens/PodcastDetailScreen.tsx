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
import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import {
  ArrowLeft,
  ArrowDownCircle,
  EllipsisVertical,
  Play,
  Plus,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";

// Dữ liệu giả lập dựa trên schema database
const podcastEpisodeData = {
  id: 1,
  title: "Vì sao thế nhỉ!",
  description:
    "Khơi lại tinh tuyền, thu về hào phượng. Từng dòng tĩnh cấu khắc khoải đôi bờ đã vượt qua khoảng cách, thời gian, và cả sự sống và cái chết, nối tinh yêu hòa cùng lý tưởng chiến đấu vì máu có sắc áo...",
  duration: 17 * 60, // 17 minutes in seconds
  audioUrl: "https://example.com/audio/episode1.mp3",
  releaseDate: "2025-04-27",
  createdAt: "2025-04-27T10:00:00Z",
  show: {
    id: 1,
    title: "Những trang thư có lửa về hào khí dân tộc Việt Nam",
    creator: "mừng ngày thông nhật Đất nước",
    description: "Podcast về lịch sử và tinh thần dân tộc Việt Nam.",
    coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2025-04-01T10:00:00Z",
    category: {
      id: 1,
      name: "Lịch sử",
      description: "Podcast về lịch sử và văn hóa.",
    },
  },
};

// Dữ liệu giả lập cho bình luận
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

type PodcastDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PodcastDetailScreen"
>;

export default function PodcastDetailScreen({
  navigation,
}: {
  navigation: PodcastDetailScreenNavigationProp;
}) {
  const scrollY = useRef(new Animated.Value(0)).current;

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

  // Memoize format duration function
  const formatDuration = useCallback((durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    return `${minutes} min left`;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    return () => {
      // Cleanup animations
      scrollY.stopAnimation();
    };
  }, [navigation, scrollY]);

  // Memoize render comment item
  const renderCommentItem = useCallback(
    ({ item }: { item: typeof comments[0] }) => (
      <YStack mb="$4">
        <XStack items="center" gap="$3">
          <Avatar circular size="$3">
            <Avatar.Image
              accessibilityLabel="User Avatar"
              src="https://via.placeholder.com/150"
            />
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
              <Button
                disabled
                bg="transparent"
                p={0}
                icon={<Text color="white">❤️ {item.likes}</Text>}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="transparent"
                p={0}
                icon={<Text color="white">💬</Text>}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    ),
    []
  );

  const [showFullDesc, setShowFullDesc] = useState(false);
  const descMaxLength = 120;
  const desc = podcastEpisodeData.description;
  const descToShow = showFullDesc || desc.length <= descMaxLength ? desc : desc.slice(0, descMaxLength) + "...";

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
              {podcastEpisodeData.show.title}
            </Animated.Text>
          </View>
          <XStack width={40} />
        </View>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <YStack flex={1} mt="$6" p="$4">
          {/* Podcast Image */}
          <XStack items="center" justify="center" mb={16}>
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
                source={{ uri: podcastEpisodeData.show.coverImage }}
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

          {/* Title & Show Info */}
          <Text fontSize={24} fontWeight="bold" color="white" mb={4}>
            {podcastEpisodeData.title}
          </Text>
          <XStack items="center" mb={4}>
            <Avatar circular size="$2">
              <Avatar.Image accessibilityLabel="Podcast Avatar" src={podcastEpisodeData.show.coverImage} />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
            <Text fontSize={15} color="white" ml={8}>
              {podcastEpisodeData.show.title}
            </Text>
          </XStack>
          <XStack items="center" mb={8}>
            <Text color="rgba(255,255,255,0.7)" fontSize={13}>
              Mon • {formatDuration(podcastEpisodeData.duration)}
            </Text>
          </XStack>

          {/* Control Buttons */}
          <XStack items="center" justify="space-between" mb={12}>
            <XStack gap={16}>
              <Button bg="rgba(255,255,255,0.05)" rounded={100} icon={<Image source={{uri: podcastEpisodeData.show.coverImage}} width={28} height={28} rounded={8}/>} />
              <Button bg="rgba(255,255,255,0.05)" rounded={100} icon={<Plus size={20} color="white" />} />
              <Button bg="rgba(255,255,255,0.05)" rounded={100} icon={<ArrowDownCircle size={20} color="white" />} />
              <Button bg="rgba(255,255,255,0.05)" rounded={100} icon={<EllipsisVertical size={20} color="white" />} />
            </XStack>
            <Button bg="#1DB954" rounded={100} width={56} height={56} icon={<Play size={28} color="black" fill="black" />} />
          </XStack>

          {/* Description with see more */}
          <Text color="white" mb={8}>
            {descToShow}
            {desc.length > descMaxLength && !showFullDesc && (
              <Text color="#1DB954" onPress={() => setShowFullDesc(true)}> see more</Text>
            )}
          </Text>

          {/* Comments Card */}
          <YStack bg="rgba(30,30,30,0.95)" rounded={18} p={16} mt={16}>
            <XStack justify="space-between" items="center" mb={8}>
              <Text color="white" fontWeight="bold" fontSize={18}>Comments</Text>
              <TouchableOpacity>
                <Text color="#1DB954" fontWeight="bold">Show all (6)</Text>
              </TouchableOpacity>
            </XStack>
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={renderCommentItem}
            />
            {/* Ô nhập bình luận */}
          <XStack mt="$3">
            <Input
              size="$3.5"
              borderWidth={0}
              borderRadius="$2"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              color="white"
              placeholder="Leave a comment..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              flex={1}
              margin="auto"
              style={{
                fontSize: 15,
                paddingLeft: 10,
                fontWeight: "bold",
              }}
              focusStyle={{
                borderWidth: 0,
                bg: "rgba(255, 255, 255, 0.3)",
              }}
            />
          </XStack>
          </YStack>

          
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}