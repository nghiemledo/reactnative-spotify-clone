import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  Animated,
  View,
  StatusBar,
} from "react-native";
import { YStack, XStack, Text, Image, H3, Button, Spinner } from "tamagui";
import { ArrowLeft, Play, MoreVertical } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useGetAlbumsQuery } from "../services/AlbumService";
import { LinearGradient } from "@tamagui/linear-gradient";
import { useGetArtistByIdQuery } from "../services/ArtistService";
import { useGetSongsQuery } from "../services/SongService";
import { Album } from "../types/album";
import { Song } from "../types/song";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import SongArtistBottomSheet from "../components/artist/SongArtistBottomSheet";

type ArtistScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Artist"
>;

export default function ArtistDetailScreen({
  navigation,
  route,
}: {
  navigation: ArtistScreenNavigationProp;
  route: { params: { id: string } };
}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const {
    data: songs,
    isLoading: isSongsLoading,
    error: songsError,
  } = useGetSongsQuery();
  const {
    data: albums,
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useGetAlbumsQuery();
  const {
    data: artist,
    isLoading: isArtistLoading,
    error: artistError,
  } = useGetArtistByIdQuery(route.params?.id);

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

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.5],
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
        <Spinner size="large" color="$green10" />
      </YStack>
    );
  }

  if (songsError || albumsError || artistError) {
    return (
      <YStack flex={1} justify="center" items="center" bg="#121212">
        <Text color="white">
          Error:{" "}
          {songsError?.message ||
            albumsError?.message ||
            artistError?.message ||
            "Failed to load data"}
        </Text>
      </YStack>
    );
  }

  const artistSongs = songs?.data.filter(
    (song: Song) =>
      song.artistId !== undefined && song.artistId === route.params.id
  );

  const artistAlbums = albums?.data.filter(
    (album: Album) =>
      album.artistId !== undefined && album.artistId === route.params.id
  )

  return (
    <YStack flex={1} bg="#121212">
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Button
                size="$4"
                chromeless
                icon={<ArrowLeft size={28} color="white" />}
                bg="transparent"
              />
            </TouchableOpacity>
            <Animated.View style={{ opacity: titleOpacity }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 8,
                }}
              >
                {artist?.data?.name || "Unknown Artist"}
              </Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>

      <Animated.Image
        source={{
          uri: artist?.data.urlAvatar || "https://via.placeholder.com/400",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 390,
        }}
        resizeMode="cover"
      />

      <LinearGradient
        position="absolute"
        t={0}
        l={0}
        r={0}
        height={300}
        colors={["rgba(0, 0, 0, 0.2)", "#121212"]}
        start={[0, 0]}
        end={[0, 1]}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack height={200} />
        <LinearGradient
          flex={1}
          colors={["transparent", "#121212"]}
          start={[0, 0]}
          end={[0, 0.1]}
          p="$4"
        >
          <YStack mb="$4">
            <Text>
              <H3 color="white" fontSize={34} fontWeight="bold">
                {artist?.data?.name || "Unknown Artist"}
              </H3>
            </Text>
            <Text color="#b3b3b3" fontSize={16} fontWeight="400">
              {artist?.data?.bio || "No bio yet"}
            </Text>
          </YStack>
          <XStack justify="space-between" items="center" mt="$2" mb="$4">
            <XStack items="center" gap="$3">
              <Button
                borderWidth={1}
                borderColor="#b3b3b3"
                bg="transparent"
                color="white"
                fontWeight="bold"
                fontSize={12}
                px="$4"
              >
                FOLLOWING
              </Button>
              <Button
                bg="transparent"
                size="$3"
                p={0}
                icon={<MoreVertical size={20} color="#b3b3b3" />}
              />
            </XStack>

            <Button
              bg="#1DB954"
              circular
              size="$5"
              icon={<Play size={24} color="#000" fill="#000" />}
            />
          </XStack>

          <H3 color="white" fontSize={20} fontWeight="bold" mb="$3">
            Popular
          </H3>
          <FlatList
            data={artistSongs}
            scrollEnabled={false}
            keyExtractor={(item) => item.id || `${Math.random()}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity>
                <XStack items="center" justify="space-between" py="$2">
                  <XStack items="center" gap="$3" flex={1}>
                    <Text color="#b3b3b3" width={20} fontSize={16}>
                      {index + 1}
                    </Text>
                    <Image
                      source={{
                        uri:
                          item.coverImage || "https://via.placeholder.com/40",
                      }}
                      width={48}
                      height={48}
                      borderRadius={2}
                    />
                    <YStack flex={1}>
                      <Text
                        fontSize={16}
                        fontWeight="400"
                        color="white"
                        numberOfLines={1}
                      >
                        {item.title || "No Title"}
                      </Text>
                    </YStack>
                  </XStack>
                  <XStack items="center" gap="$2">
                    <Button
                      bg="transparent"
                      size="$3"
                      p={0}
                     onPress={() => setIsBottomSheetOpen(true)}
                      icon={<MoreVertical size={20} color="#b3b3b3" />}
                    />
                  </XStack>
                </XStack>
              </TouchableOpacity>
            )}
          />

          <H3 color="white" fontSize={20} fontWeight="bold" mt="$6" mb="$3">
            Albums
          </H3>
          <FlatList
            data={artistAlbums}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id || `${Math.random()}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Album", { id: item.id })}
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
                    fontSize={14}
                  >
                    {item.title || "No Title"}
                  </Text>
                  <Text color="#b3b3b3" fontSize={12}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "No Date"}
                  </Text>
                </YStack>
              </TouchableOpacity>
            )}
          />
        </LinearGradient>
      </ScrollView>
      <SongArtistBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onAddToOtherPlaylist={function (): void {
          throw new Error("Function not implemented.");
        }}
        onAddToQueue={function (): void {
          throw new Error("Function not implemented.");
        }}
        onShowSpotifyCode={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </YStack>
  );
}
