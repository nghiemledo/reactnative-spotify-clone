// screens/GenreScreen.tsx
import React, { useRef } from "react";
import { Animated, FlatList, StatusBar } from "react-native";
import { YStack, Text, Spinner } from "tamagui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchStackParamList } from "../navigation/SearchNavigator";
import { useGetAlbumsQuery } from "../services/AlbumService";
import { useGetSongsQuery } from "../services/SongService";
import { useGetArtistsQuery } from "../services/ArtistService";
import { AlbumItem } from "../components/AlbumItem";
import { SongItem } from "../components/song/SongItem";
import { Album } from "../types/album";
import { Song } from "../types/song";
import { Artist } from "../types/artist";
import { HomeStackParamList } from "../navigation/HomeNavigator";

interface GenreScreenProps {
  navigation: NativeStackNavigationProp<SearchStackParamList & HomeStackParamList>;
  route: { params: { genreId: string } };
}

function GenreScreen({ navigation, route }: GenreScreenProps) {
  const { genreId } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

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

  const getArtistName = (artistId: string | undefined) => {
    if (!artistId) return "Unknown Artist";
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.name || "Unknown Artist";
  };

  const filteredAlbums = albums?.data?.filter(
    (album: Album) => album.genreId === genreId
  );
  const filteredSongs = songs?.data?.filter(
    (song: Song) => song.genreId === genreId
  );

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <AlbumItem
      album={item}
      getArtistName={getArtistName}
      showDate={false}
      onPress={() => navigation.navigate("Album", { id: item.id })}
    />
  );

  const renderSongItem = ({ item, index }: { item: Song; index: number }) => (
    <SongItem
      song={item}
      index={index}
      showIndex={false}
      showImage={true}
      showArtistName={true}
      imageSize={60}
      getArtistName={getArtistName}
      screen="home"
      onMorePress={() => {
        // Implement similar to HomeScreen if needed
      }}
    />
  );

  return (
    <YStack flex={1} bg="#111111">
      <StatusBar barStyle="light-content" />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <YStack p="$4">
          <Text fontSize={20} fontWeight="bold" color="white" mb="$3">
            Albums
          </Text>
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
              contentContainerStyle={{ paddingRight: 16 }}
            />
          )}
        </YStack>

        <YStack p="$4">
          <Text fontSize={20} fontWeight="bold" color="white" mb="$3">
            Songs
          </Text>
          {isSongsLoading || isArtistsLoading ? (
            <Spinner size="large" color="$green10" />
          ) : songsError || artistsError ? (
            <Text color="white">Error loading songs</Text>
          ) : !filteredSongs || filteredSongs.length === 0 ? (
            <Text color="rgba(255,255,255,0.7)">No songs found</Text>
          ) : (
            <YStack pr="$4">
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
                  onMorePress={() => {
                    // Implement similar to HomeScreen if needed
                  }}
                />
              ))}
            </YStack>
          )}
        </YStack>
      </Animated.ScrollView>
    </YStack>
  );
}

export default GenreScreen; // Ensure default export
