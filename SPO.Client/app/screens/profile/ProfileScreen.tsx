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
export const ProfileScreen = () => {
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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Animated Header */}
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
                {User.name || "Người dùng"}
              </Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack flex={1}>
          <LinearGradient
            flex={1}
            colors={["transparent", "#333333"]}
            start={[1, 1]}
            end={[1, 0.4]}
            p="$4"
            height={270}
          >
            <XStack items="center" mb={20} mt={40}>
              <TouchableOpacity>
                <Animated.Image
                  source={{
                    uri: User.image || "https://via.placeholder.com/300",
                  }}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 100,
                    marginRight: 20,
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <YStack>
                <Text
                  fontSize={25}
                  width="100%"
                  fontWeight="bold"
                  color="white"
                  mb={4}
                  numberOfLines={1}
                >
                  {User.name || "Đang tải..."}
                </Text>
                <XStack>
                  <Text fontSize={14} color="#fff" mr={3}>
                    {User.follwers}
                  </Text>
                  <Text fontSize={14} color="rgba(255,255,255,0.6)" mr={3}>
                    followers •
                  </Text>
                  <Text fontSize={14} color="#fff" mr={3}>
                    {User.following}
                  </Text>
                  <Text fontSize={14} color="rgba(255,255,255,0.6)" mr={3}>
                    following
                  </Text>
                </XStack>
              </YStack>
            </XStack>
            <XStack mb={30}>
              <Button
                borderWidth={1}
                rounded={30}
                borderColor="#b3b3b3"
                bg="transparent"
                px="$4"
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Text px={4} color="white" fontWeight="bold" fontSize={12}>
                  Edit
                </Text>
              </Button>
              <Button bg="transparent" ml={10} p={0}>
                <MoreVertical color="white" />
              </Button>
            </XStack>
            <Text color="#fff" fontWeight="bold" fontSize={20}>
              Playlists
            </Text>
          </LinearGradient>
          <YStack pl={16}>
            {data
              .slice(-3)
              .reverse()
              .map((item) => (
                <PlaylistItem key={item.id} playlist={item} />
              ))}
          </YStack>

          <Button
            mt={20}
            borderWidth={1}
            rounded={30}
            width={"auto"}
            borderColor="#b3b3b3"
            bg="transparent"
            px="$4"
            self="center"
            // onPress={() => navigation.navigate("Playlists")}
          >
            <Text color="white" fontWeight="bold" fontSize={12}>
              See all playlists
            </Text>
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
