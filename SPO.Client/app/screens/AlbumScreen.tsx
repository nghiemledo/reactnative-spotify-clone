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
import { useEffect, useRef } from "react";
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

// Dữ liệu giả lập cho album và danh sách bài hát
const albumData = {
  id: "1",
  title: "Đánh Đổi",
  releaseDate: "10 Oct 2023",
  coverImage:
    "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  artistName: "Obito, Shiki", // Lấy từ Albums.ArtistId -> Artists.Name
};

const songs = [
  { id: "1", title: "Intro", artist: "Obito, Shiki", duration: "3:15" },
  {
    id: "2",
    title: "Xuất Phát Diễm",
    artist: "Obito, Shiki",
    duration: "4:20",
  },
  {
    id: "3",
    title: "CL5 (interlude)",
    artist: "Obito, Shiki",
    duration: "2:10",
  },
  {
    id: "4",
    title: "Đầu Đường Xó Chợ",
    artist: "Obito, Shiki, Lăng LD",
    duration: "5:00",
  },
  {
    id: "5",
    title: "Đầu Đường Xó Chợ",
    artist: "Obito, Shiki, Lăng LD",
    duration: "5:00",
  },
  {
    id: "6",
    title: "Đầu Đường Xó Chợ",
    artist: "Obito, Shiki, Lăng LD",
    duration: "5:00",
  },
  {
    id: "7",
    title: "Đầu Đường Xó Chợ",
    artist: "Obito, Shiki, Lăng LD",
    duration: "5:00",
  },
  {
    id: "8",
    title: "Đầu Đường Xó Chợ",
    artist: "Obito, Shiki, Lăng LD",
    duration: "5:00",
  },
  {
    id: "9",
    title: "Đầu Đường Xó Chợ",
    artist: "Obito, Shiki, Lăng LD",
    duration: "5:00",
  },
  {
    id: "10",
    title: "Đầu Đường Xó Chợ",
    artist: "Obito, Shiki, Lăng LD",
    duration: "5:00",
  },
  {
    id: "11",
    title: "Đầu Đường Xó Chợ",
    artist: "Obito, Shiki, Lăng LD",
    duration: "5:00",
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
  }, [navigation]);

  return (
    <LinearGradient
      padding={0}
      margin={0}
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
                marginLeft: 20,
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack flex={1} marginTop="$6" padding="$4">
          {/* Hình ảnh album */}
          <XStack
            alignItems="center"
            flex={1}
            justifyContent="center"
            alignSelf="center"
            marginBottom={0}
            padding={0}
          >
            <Animated.Image
              source={{ uri: albumData.coverImage }}
              style={{
                width: imageSize,
                height: imageSize,
                opacity,
                borderRadius: 8,
                alignSelf: "center",
              }}
              resizeMode="stretch"
              onError={(e) =>
                console.log("Image load error:", e.nativeEvent.error)
              }
              defaultSource={{ uri: "https://via.placeholder.com/150" }}
            />
          </XStack>

          {/* Thông tin album */}
          <H3 marginTop={0} marginBottom="$3" color="white" fontWeight="bold">
            {albumData.title}
          </H3>
          <YStack>
            <XStack alignItems="center" space="$3" marginBottom="$3">
              <Avatar circular size="$2">
                <Avatar.Image
                  accessibilityLabel="Artist Avatar"
                  src={albumData.coverImage}
                />
                <Avatar.Fallback backgroundColor="$blue10" />
              </Avatar>
              <YStack alignItems="center">
                <Text
                  fontSize={13}
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  {albumData.artistName}
                </Text>
              </YStack>
            </XStack>
            <XStack alignItems="center" space="$2" marginBottom="$3">
              <Globe size={18} color="#fff" />
              <YStack alignItems="center">
                <Text
                  fontSize={13}
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  {albumData.releaseDate}
                </Text>
              </YStack>
            </XStack>
          </YStack>

          {/* Nút điều khiển */}
          <XStack space="$4" marginBottom="$4" justifyContent="space-between">
            <XStack gap="$4">
              <Button
                disabled
                backgroundColor="transparent"
                color="white"
                margin={0}
                padding={0}
                icon={<Plus size="$2" color="white" strokeWidth={1} />}
                hoverStyle={{ backgroundColor: "transparent" }}
                pressStyle={{
                  backgroundColor: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                backgroundColor="transparent"
                color="white"
                margin={0}
                padding={0}
                icon={
                  <ArrowDownCircle size="$2" color="white" strokeWidth={1} />
                }
                hoverStyle={{ backgroundColor: "transparent" }}
                pressStyle={{
                  backgroundColor: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                backgroundColor="transparent"
                color="white"
                margin={0}
                padding={0}
                icon={
                  <EllipsisVertical size="$2" color="white" strokeWidth={1} />
                }
                hoverStyle={{ backgroundColor: "transparent" }}
                pressStyle={{
                  backgroundColor: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
            </XStack>
            <Button
              backgroundColor="#1DB954"
              margin={0}
              padding={0}
              borderRadius={100}
              width="$4"
              height="$4"
              icon={
                <Play size="$2" color="black" fill="black" strokeWidth={1} />
              }
            />
          </XStack>

          {/* Danh sách bài hát */}
          <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(playSong(item.title));
                  navigation.navigate("PlayerModal");
                }}
              >
                <XStack
                  alignItems="center"
                  justifyContent="space-between"
                  paddingVertical="$2"
                >
                  <XStack alignItems="center" gap="$3" flex={1}>
                    <Text fontSize={15} fontWeight="300" color="white">
                      {item.title}
                    </Text>
                    <YStack flex={1}>
                      <Text fontSize={13} color="white" opacity={0.7}>
                        {item.artist}
                      </Text>
                      <Text fontSize={12} color="white" opacity={0.5}>
                        {item.duration}
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
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
