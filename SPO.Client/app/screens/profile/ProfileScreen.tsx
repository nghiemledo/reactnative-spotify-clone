import { LinearGradient } from "@tamagui/linear-gradient";
import { ArrowLeft } from "@tamagui/lucide-icons";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animated, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import DataList from "../../components/library/DataList";
import { useAppSelector } from "../../store";
import { useGetPlaylistsByUserIdQuery } from "../../services/playlistServices";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Data = {
  id: string;
  type: string;
  name: string;
  image: string;
  artists?: { id: number; name: string }[];
  createdAt?: string;
  creator?: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const { data: playlistData, isLoading, error } = useGetPlaylistsByUserIdQuery(userId || "", { skip: !userId });
  const [sortedData, setSortedData] = useState<Data[]>([]);

  // Map API data to Data format and limit to 3 most recent playlists
  useEffect(() => {
    if (playlistData?.data) {
      const mappedData: Data[] = playlistData.data
        .map((playlist) => ({
          id: playlist.id,
          type: "playlist",
          name: playlist.title,
          image:
            playlist.coverImage ||
            "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
          createdAt: playlist.createdAt,
          creator: playlist.userId,
          artists: [],
        }))
        .sort((a, b) => parseInt(b.id) - parseInt(a.id))
        .slice(0, 3);
      setSortedData(mappedData);
    }
  }, [playlistData]);

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

  const handleItems = (type: string, id: string) => {
    if (type === "playlist") {
      navigation.navigate("DetailPlaylist", { id });
    }
  };

  if (!userId) {
    return (
      <YStack flex={1} bg="#121212" justify="center" items="center">
        <Text color="white">Vui lòng đăng nhập để xem hồ sơ</Text>
      </YStack>
    );
  }

  if (isLoading) {
    return (
      <YStack flex={1} bg="#121212" justify="center" items="center">
        <Text color="white">Đang tải...</Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} bg="#121212" justify="center" items="center">
        <Text color="white">Lỗi: Không thể tải danh sách phát</Text>
      </YStack>
    );
  }

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
                {user?.fullName || "Người dùng"}
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
                    uri: user?.urlAvatar || "https://via.placeholder.com/300",
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
                  width="85%"
                  fontWeight="bold"
                  color="white"
                  mb={4}
                  numberOfLines={2}
                >
                  {user?.fullName || "Đang tải..."}
                </Text>
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
            </XStack>
            <Text color="#fff" fontWeight="bold" fontSize={20}>
              Your Library
            </Text>
          </LinearGradient>

          {/* Playlist Display */}
          <YStack pl={16} pr={16}>
            <DataList data={sortedData} onItems={handleItems} />
            <Button
              mt={20}
              borderWidth={1}
              rounded={30}
              width={"auto"}
              borderColor="#b3b3b3"
              bg="transparent"
              px="$4"
              self="center"
              onPress={() => navigation.navigate("Playlists")}
            >
              <Text color="white" fontWeight="bold" fontSize={12}>
                See all playlists
              </Text>
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};