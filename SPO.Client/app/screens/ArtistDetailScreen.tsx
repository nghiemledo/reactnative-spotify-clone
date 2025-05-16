// ArtistScreen.tsx
import React, { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  Animated,
  View,
  StatusBar,
} from "react-native";
import { YStack, XStack, Text, Image, H3, Button, Spinner } from "tamagui";
import { ArrowLeft, Play } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import {
  useGetSongsQuery,
  useGetAlbumsQuery,
  useGetArtistByIdQuery,
} from "../services/api";
import { LinearGradient } from "@tamagui/linear-gradient";

type ArtistScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ArtistScreen"
>;

export default function ArtistScreen({
  navigation,
  route,
}: {
  navigation: ArtistScreenNavigationProp;
  route: { params: { artistId: string } };
}) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const {
    data: songs = [],
    isLoading: isSongsLoading,
    error: songsError,
  } = useGetSongsQuery();
  const {
    data: albums = [],
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useGetAlbumsQuery();
  const {
    data: artist,
    isLoading: isArtistLoading,
    error: artistError,
  } = useGetArtistByIdQuery(route.params.artistId);

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

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (isSongsLoading || isAlbumsLoading || isArtistLoading) {
    return (
      <YStack flex={1} justify="center" items="center" bg="rgba(0, 0, 0, 0.3)">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  if (songsError || albumsError || artistError) {
    return (
      <YStack flex={1} justify="center" items="center" bg="black">
        <Text color="white">
          Error:{" "}
          {songsError?.message ||
            albumsError?.message ||
            artistError?.message ||
            "Fitemsled to load data"}
        </Text>
      </YStack>
    );
  }

  // Kiểm tra và lọc dữ liệu an toàn
  const artistSongs = songs
    .filter(
      (song): song is NonNullable<typeof song> =>
        song !== undefined && song !== null
    ) // Loại bỏ undefined/null
    .filter(
      (song) =>
        song.artistId !== undefined && song.artistId === route.params.artistId
    ); // Đảm bảo artistId tồn tại và khớp

  const artistAlbums = albums
    .filter(
      (album): album is NonNullable<typeof album> =>
        album !== undefined && album !== null
    ) // Loại bỏ undefined/null
    .filter(
      (album) =>
        album.artistId !== undefined && album.artistId === route.params.artistId
    ); // Đảm bảo artistId tồn tại và khớp

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
              {artist?.name || "Unknown Artist"}
            </Animated.Text>
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
        <YStack flex={1} mt="$6" p="$4">
          <YStack items="center" mb="$6">
            <Image
              source={{
                uri: artist?.urlAvatar || "https://via.placeholder.com/200",
              }}
              width={200}
              height={200}
              borderRadius={100}
            />
            <H3 color="white" mt="$4">
              {artist?.name || "Unknown Artist"}
            </H3>
            <Text color="white" opacity={0.7} mt="$2">
              {artist?.bio || "No bio avitemslable"}
            </Text>
          </YStack>

          <H3 color="white" mb="$3">
            Popular Songs
          </H3>
          <FlatList
            data={artistSongs}
            scrollEnabled={false}
            keyExtractor={(item) => item.id || `${Math.random()}`}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <XStack items="center" justify="space-between" py="$2">
                  <XStack items="center" gap="$3" flex={1}>
                    <Image
                      source={{
                        uri:
                          item.coverImage || "https://via.placeholder.com/40",
                      }}
                      width={40}
                      height={40}
                      borderRadius={2}
                    />
                    <YStack flex={1}>
                      <Text
                        fontSize={15}
                        fontWeight="300"
                        color="white"
                        numberOfLines={1}
                      >
                        {item.title || "No Title"}
                      </Text>
                      <Text fontSize={13} color="white" opacity={0.7}>
                        {item.duration
                          ? `${Math.floor(item.duration / 60)}:${(
                              item.duration % 60
                            )
                              .toString()
                              .padStart(2, "0")}`
                          : "0:00"}
                      </Text>
                    </YStack>
                  </XStack>
                  <Button
                    bg="white"
                    rounded={100}
                    width="$3"
                    height="$3"
                    p={0}
                    icon={<Play size="$1" color="black" fill="black" />}
                  />
                </XStack>
              </TouchableOpacity>
            )}
          />

          <H3 color="white" mt="$6" mb="$3">
            Albums
          </H3>
          <FlatList
            data={artistAlbums}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id || `${Math.random()}`} // Fallback cho id
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AlbumScreen", { albumId: item.id })
                }
              >
                <YStack width={120} mr="$4">
                  <Image
                    source={{
                      uri: item.coverImage || "https://via.placeholder.com/120",
                    }}
                    width={120}
                    height={120}
                    borderRadius={2}
                  />
                  <Text
                    color="white"
                    fontWeight="bold"
                    mt="$2"
                    numberOfLines={1}
                  >
                    {item.title || "No Title"}
                  </Text>
                  <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "No Date"}
                  </Text>
                </YStack>
              </TouchableOpacity>
            )}
          />
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}
