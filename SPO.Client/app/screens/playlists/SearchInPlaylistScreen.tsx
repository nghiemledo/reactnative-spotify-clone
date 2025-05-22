import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Button, Image, Input, Text, View, XStack, YStack } from "tamagui";
import { ArrowLeft, X, EllipsisVertical } from "@tamagui/lucide-icons";
import { Dimensions, FlatList, ScrollView, TouchableOpacity } from "react-native";
import SongOptionsBottomSheet from "../../components/search/SongOptionsBottomSheet";
import { Song } from "../../types/song"; 
import { LibraryStackParamList } from "../../navigation/LibraryNavigator";

type SearchInPlaylistScreenNavigationProp = NativeStackNavigationProp<
  LibraryStackParamList,
  "SearchInPlaylist"
>;

interface SearchInPlaylistScreenProps {
  navigation: SearchInPlaylistScreenNavigationProp;
  route: { params: { queueItems: Song[] } };
}

export default function SearchInPlaylistScreen({ navigation, route }: SearchInPlaylistScreenProps) {
  const { queueItems } = route.params;
  const { width, height } = Dimensions.get("window");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSongOptionsOpen, setIsSongOptionsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const normalize = (s: string) => s.trim().toLowerCase();

  const filteredData =
    searchQuery.trim() === ""
      ? []
      : queueItems.filter((item) => {
          const needle = normalize(searchValue);
          return (
            normalize(item.title || "").includes(needle) ||
            normalize(item.artist || "").includes(needle)
          );
        });

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    setSearchQuery(text);
  };

  const handleInputFocus = () => {
  };

  const handleSelectSongOption = (option: string) => {
    if (!selectedSong) return;
    switch (option) {
      case "addToOtherPlaylist":
        console.log(`Add ${selectedSong.title} to another playlist`);
        break;
      case "removeFromThisPlaylist":
        console.log(`Remove ${selectedSong.title} from this playlist`);
        break;
      case "goToAlbum":
        console.log(`Navigate to album for ${selectedSong.title}`);
        break;
      case "goToArtist":
        console.log(`Navigate to artist ${selectedSong.artist}`);
        break;
      case "share":
        console.log(`Share ${selectedSong.title}`);
        break;
      case "goToSongRadio":
        console.log(`Go to song radio for ${selectedSong.title}`);
        break;
      case "viewSongCredits":
        console.log(`View credits for ${selectedSong.title}`);
        break;
      case "showSpotifyCode":
        console.log(`Show Spotify code for ${selectedSong.title}`);
        break;
      default:
        break;
    }
    setIsSongOptionsOpen(false);
    setSelectedSong(null);
  };

  return (
    <YStack flex={1} bg="#000">
      <View
        style={{ position: "fixed", top: 0, width: "100%", paddingTop: 0 }}
        rounded={7}
        z={1}
        items="center"
        flexDirection="column"
      >
        <XStack py="$1" items="center" mb="$2" bg="rgba(256, 256, 256, 0.3)">
          <Input
            size="$3.5"
            borderWidth={0}
            rounded="$2"
            bg="transparent"
            color="white"
            fontWeight="bold"
            placeholder="Search in playlist"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            flex={1}
            pl="$7"
            value={searchValue}
            onChangeText={handleSearchChange}
            onFocus={handleInputFocus}
            autoFocus
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 12,
              top: 12,
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size="$1" color="white" />
          </TouchableOpacity>
          {searchValue.length > 0 && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 3,
                top: 15,
                alignItems: "center",
              }}
              onPress={() => {
                setSearchValue("");
                setSearchQuery("");
              }}
            >
              <X size="$1" color="white" />
            </TouchableOpacity>
          )}
        </XStack>
      </View>
      <YStack flex={1} bg="#000" px="$3">
        <ScrollView scrollEventThrottle={16}>
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id || ""}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                //   onPress={() => {
                //     navigation.navigate("PlayerModal");
                //   }}
                >
                  <XStack items="center" justify="space-between" py="$2">
                    <XStack items="center" gap="$3" flex={1}>
                      <Image
                        source={{ uri: item.coverImage || "https://via.placeholder.com/150" }}
                        width={50}
                        height={50}
                        borderRadius={8}
                      />
                      <YStack flex={1}>
                        <Text fontSize={15} fontWeight="300" color="white">
                          {item.title}
                        </Text>
                        <Text fontSize={13} color="white" opacity={0.7}>
                          {item.artist}
                        </Text>
                      </YStack>
                    </XStack>
                    <Button
                      bg="transparent"
                      p={0}
                      onPress={() => {
                        setSelectedSong(item);
                        setIsSongOptionsOpen(true);
                      }}
                      icon={
                        <EllipsisVertical
                          size="$2"
                          color="white"
                          strokeWidth={1}
                        />
                      }
                      pressStyle={{
                        bg: "transparent",
                        borderBlockColor: "transparent",
                      }}
                    />
                  </XStack>
                </TouchableOpacity>
              )}
            />
          ) : searchQuery.trim() !== "" ? (
            <YStack
              position="absolute"
              t={height / 2}
              l={width / 2 - 100}
              items="center"
            >
              <Text fontWeight="bold" color="white" fontSize="$6" self="center">
                No results found
              </Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                Try searching for something else
              </Text>
            </YStack>
          ) : (
            <YStack
              position="absolute"
              t={height / 2}
              l={width / 2 - 80}
              items="center"
            >
              <Text fontWeight="bold" color="white" fontSize="$6" self="center">
                Search in playlist
              </Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                Find songs in your playlist
              </Text>
            </YStack>
          )}
        </ScrollView>
      </YStack>

      {selectedSong && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            height: "100%",
          }}
        >
          <SongOptionsBottomSheet
            isOpen={isSongOptionsOpen}
            onClose={() => {
              setIsSongOptionsOpen(false);
              setSelectedSong(null);
            }}
            onSelectOption={handleSelectSongOption}
            songName={selectedSong.title || ""}
            urlAvatar={selectedSong.coverImage || "https://via.placeholder.com/150"}
            type="Song"
            artists={[{ id: parseInt(selectedSong.id || "0"), name: selectedSong.artist || "" }]}
            context="detailPlaylist"
          />
        </View>
      )}
    </YStack>
  );
}