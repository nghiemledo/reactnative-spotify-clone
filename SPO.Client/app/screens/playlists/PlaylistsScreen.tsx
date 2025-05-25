import { LinearGradient } from "@tamagui/linear-gradient";
import {
  ArrowDownCircle,
  ArrowLeft,
  EllipsisVertical,
  MoreVertical,
  Shuffle,
} from "@tamagui/lucide-icons";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import { PlaylistItem } from "../../components/PlaylistItem";

interface user {
  id: string;
  name: string;
  image: string;
  follwers: number;
  following: number;
}
const User = {
  id: "1",
  name: "Nguyễn Văn A",
  image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  follwers: 100,
  following: 200,
};
export interface Playlist {
  id: string;
  urlCoverPage: string;
  name: string;
}
const data: Playlist[] = [
  {
    id: "1",
    urlCoverPage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    name: "Playlist 1",
  },
  {
    id: "2",
    urlCoverPage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    name: "Playlist 2",
  },
  {
    id: "3",
    urlCoverPage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    name: "Playlist 3",
  },
  {
    id: "4",
    urlCoverPage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    name: "Playlist 4",
  },
];

type RootStackParamList = {
  EditProfile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const PlaylistsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const scrollY = useRef(new Animated.Value(0)).current;

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

  return (
    <YStack flex={1} bg="#121212">
      <XStack
        items="center" // Căn giữa theo chiều dọc
        justify="center" // Căn giữa theo chiều ngang
        px={16}
        height={60}
        bg="#222"
        position="relative" // Cần thiết nếu dùng Button absolute
      >
        {/* Nút Back (cố định bên trái) */}
        <Button
          chromeless
          icon={<ArrowLeft size={24} />}
          size="$4"
          color="white"
          bg="transparent"
          p={0}
          position="absolute" // Đặt vị trí tuyệt đối
          l={16} // Cách lề trái 16px
          onPress={() => navigation.goBack()}
        />

        {/* Tiêu đề căn giữa */}
        <Text color="white" fontSize={20} fontWeight="bold">
          Playlists
        </Text>
      </XStack>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack flex={1}>
          <YStack pl={16}>
            {data.reverse().map((item) => (
              <PlaylistItem key={item.id} playlist={item} />
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
