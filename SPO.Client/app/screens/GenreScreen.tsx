// screens/GenreScreen.tsx
import React, { useRef, useState } from "react";
import { Animated, FlatList, StatusBar, View } from "react-native";
import { YStack, Text, Spinner, H3, Button, XStack } from "tamagui";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchStackParamList } from "../navigation/SearchNavigator";
import { HomeStackParamList } from "../navigation/HomeNavigator";
import { useGetAlbumsQuery } from "../services/AlbumService";
import { useGetSongsQuery } from "../services/SongService";
import { useGetArtistsQuery } from "../services/ArtistService";
import { useGetGenreByIdQuery } from "../services/GenreService";
import { AlbumItem } from "../components/AlbumItem";
import { SongItem } from "../components/song/SongItem";
import { Album } from "../types/album";
import { Song } from "../types/song";
import { Artist } from "../types/artist";
import SongBottomSheet from "../components/song/SongBottomSheet";

interface GenreScreenProps {
  navigation: NativeStackNavigationProp<
    SearchStackParamList
  >;
  route: { params: { id: string } };
}

function GenreScreen({ navigation, route }: GenreScreenProps) {
  const { id } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const {
    data: albums,
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useGetAlbumsQuery();
  const {
    data: songs,
    isLoading: isSongsLoading,
    error: songsError,
  } = useGetSongsQuery();
  const {
    data: artists,
    isLoading: isArtistsLoading,
    error: artistsError,
  } = useGetArtistsQuery();
  const {
    data: genre,
    isLoading: isGenreLoading,
    error: genreError,
  } = useGetGenreByIdQuery(id);

  const getArtistName = (artistId: string | undefined) => {
    if (!artistId) return "Unknown Artist";
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.name || "Unknown Artist";
  };

  const filteredAlbums = albums?.data?.filter(
    (album: Album) => album.genreId === id
  );
  const filteredSongs = songs?.data?.filter(
    (song: Song) => song.genreId === id
  );

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <AlbumItem
      album={item}
      getArtistName={getArtistName}
      showDate={false}
      onPress={() => navigation.navigate("Album", { id: item.id })}
    />
  );

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

  const handleMorePress = (song: Song) => {
    setSelectedSong(song);
    setIsBottomSheetOpen(true);
  };

  if (isGenreLoading || isAlbumsLoading || isSongsLoading || isArtistsLoading) {
    return (
      <YStack flex={1} justify="center" items="center" bg="#111111">
        <Spinner size="large" color="$green10" />
      </YStack>
    );
  }

  if (genreError || albumsError || songsError || artistsError) {
    return (
      <YStack flex={1} justify="center" items="center" bg="#111111">
        <Text color="white">
          Error: {(genreError as any)?.message || "Unable to load data"}
        </Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="#111111">
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
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 14,
                }}
              >
                {genre?.data?.name || "Unknown Genre"}
              </Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <LinearGradient
          flex={1}
          colors={["transparent", "#111111"]}
          start={[0, 0]}
          end={[0, 0.1]}
          p="$4"
          py={60}
        >
          <YStack mb="$4">
            <H3 color="white" fontSize={34} fontWeight="bold">
              {genre?.data?.name || "Unknown Genre"}
            </H3>
          </YStack>

          <YStack mb="$4">
            <XStack justify="center">
              <Text fontSize={24} fontWeight="bold" color="white" mb="$3">
                Albums
              </Text>
            </XStack>
            {isAlbumsLoading || isArtistsLoading ? (
              <Spinner size="large" color="$green10" />
            ) : albumsError || artistsError ? (
              <Text color="white">Error loading albums</Text>
            ) : !filteredAlbums || filteredAlbums.length === 0 ? (
              <Text color="rgba(255,255,255,0.7)">No albums found</Text>
            ) : (
              <FlatList
                data={filteredAlbums}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderAlbumItem}
                // contentContainerStyle={{ paddingRight: 16 }}
              />
            )}
          </YStack>

          <YStack>
            <XStack justify="center">
              <Text fontSize={24} fontWeight="bold" color="white" mb="$3">
                Songs
              </Text>
            </XStack>
            {isSongsLoading || isArtistsLoading ? (
              <Spinner size="large" color="$green10" />
            ) : songsError || artistsError ? (
              <Text color="white">Error loading songs</Text>
            ) : !filteredSongs || filteredSongs.length === 0 ? (
              <Text color="rgba(255,255,255,0.7)">No songs found</Text>
            ) : (
              <YStack>
                {filteredSongs.map((item: Song, index: number) => (
                  <SongItem
                    key={item.id || `song-${item.title}`}
                    song={item}
                    index={index}
                    showIndex={false}
                    showImage={true}
                    showArtistName={true}
                    imageSize={60}
                    getArtistName={getArtistName}
                    screen="home"
                    onMorePress={handleMorePress}
                  />
                ))}
              </YStack>
            )}
          </YStack>
        </LinearGradient>
      </Animated.ScrollView>
      <SongBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
          setSelectedSong(null);
        }}
        selectedSong={selectedSong}
        navigation={navigation}
        screenType="home"
      />
    </YStack>
  );
}

export default GenreScreen;
