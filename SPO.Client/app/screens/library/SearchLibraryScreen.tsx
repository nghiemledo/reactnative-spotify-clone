import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useGetArtistsQuery } from "../../services/ArtistService";
import { Artist } from "../../types/artist";
import { Image, Input, Text, View, XStack, YStack } from "tamagui";
import { ArrowLeft, X } from "@tamagui/lucide-icons";
import { Dimensions, FlatList, ScrollView, TouchableOpacity, Keyboard, ActivityIndicator } from "react-native";

type Podcast = {
  id: string;
  title: string;
  creator: string;
  description: string;
  coverImage: string;
  createdAt: string;
  type: string;
};

type Item = Artist | Podcast;

const initialPodcasts: Podcast[] = [
  {
    id: "1",
    title: "#28 - người lớn và áp lực 'xây dựng hình ảnh'",
    creator: "Giang cơ Radio",
    description:
      "Dec 1, 2023 • 15min • Minh là Giang, mình là người lớn và mình muốn nói về áp lực 'xây dựng hình ảnh'.",
    coverImage:
      "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-12-01T00:00:00Z",
    type: "podcast",
  },
  {
    id: "2",
    title: "#29 - Tự do trong tâm trí",
    creator: "Giang cơ Radio",
    description:
      "Jan 15, 2024 • 20min • Minh là Giang, hôm nay chúng ta nói về tự do và cách tìm kiếm nó trong tâm trí.",
    coverImage:
      "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg",
    createdAt: "2024-01-15T00:00:00Z",
    type: "podcast",
  },
  {
    id: "3",
    title: "Sống chậm lại, nghĩ khác đi",
    creator: "Sống Tích Cực",
    description:
      "Feb 10, 2024 • 25min • Một hành trình khám phá giá trị của việc sống chậm và suy ngẫm.",
    coverImage:
      "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg",
    createdAt: "2024-02-10T00:00:00Z",
    type: "podcast",
  },
  {
    id: "4",
    title: "Câu chuyện khởi nghiệp",
    creator: "Startup Vibes",
    description:
      "Mar 5, 2024 • 30min • Những câu chuyện thực tế từ các nhà khởi nghiệp trẻ.",
    coverImage:
      "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg",
    createdAt: "2024-03-05T00:00:00Z",
    type: "podcast",
  },
];

type SearchLibraryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SearchScreen"
>;

interface SearchLibraryScreenProps {
  navigation: SearchLibraryScreenNavigationProp;
  route: { params: { type: "artist" | "podcast"; selectedIds?: string[] } };
}

export default function SearchLibraryScreen({ navigation, route }: SearchLibraryScreenProps) {
  const { type, selectedIds = [] } = route.params;
  const { data: artists, isLoading: isArtistsLoading, error: artistsError } = useGetArtistsQuery();
  const { width, height } = Dimensions.get("window");
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const normalize = (s: string) => s.trim().toLowerCase();

  const data: Item[] = type === "artist" ? (artists?.data || []) : initialPodcasts;

  const filteredData =
    searchQuery.trim() === ""
      ? []
      : data.filter((item) => {
          const needle = normalize(searchValue); // Use searchValue for real-time filtering
          const name = type === "artist" ? (item as Artist).name : (item as Podcast).title;
          return normalize(name).includes(needle);
        });

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    setSearchQuery(text); // Update searchQuery immediately for real-time filtering
  };

  const handleInputFocus = () => {
    if (searchQuery) {
      setIsLoading(true);
      setSearchQuery("");
      setSearchValue("");
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleItemPress = (item: Item) => {
    const targetScreen = type === "artist" ? "ArtistSelection" : "PodcastSelection";
    navigation.navigate(targetScreen, { selectedIds: [...selectedIds, item.id] });
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
            placeholder={`Search for ${type === "artist" ? "artists" : "podcasts"}`}
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
        {isLoading || isArtistsLoading ? (
          <YStack flex={1} justify="center" items="center">
            <ActivityIndicator size="large" color="#1DB954" />
          </YStack>
        ) : artistsError && type === "artist" ? (
          <YStack
            position="absolute"
            t={height / 2}
            l={width / 2 - 130}
            items="center"
          >
            <Text fontWeight="bold" color="white" fontSize="$6" self="center">
              Error loading artists
            </Text>
          </YStack>
        ) : (
          <ScrollView scrollEventThrottle={16}>
            {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <XStack items="center" py="$2" gap="$3">
                      <Image
                        source={{ uri: type === "artist" ? (item as Artist).urlAvatar : (item as Podcast).coverImage }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: type === "artist" ? 25 : 5,
                        }}
                      />
                      <YStack>
                        <Text color="white" fontWeight="bold" fontSize="$4">
                          {type === "artist" ? (item as Artist).name : (item as Podcast).title}
                        </Text>
                        <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                          {type === "artist" ? "Artist" : "Podcast"}
                        </Text>
                      </YStack>
                    </XStack>
                  </TouchableOpacity>
                )}
                scrollEnabled={false}
              />
            ) : searchQuery.trim() !== "" ? (
              <YStack
                position="absolute"
                t={height / 2}
                l={width / 2 - 100}
                items="center"
              >
                <Text
                  fontWeight="bold"
                  color="white"
                  fontSize="$6"
                  self="center"
                >
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
                <Text
                  fontWeight="bold"
                  color="white"
                  fontSize="$6"
                  self="center"
                >
                  Search for {type === "artist" ? "artists" : "podcasts"}
                </Text>
                <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                  Find your favorite {type === "artist" ? "artists" : "podcasts"}
                </Text>
              </YStack>
            )}
          </ScrollView>
        )}
      </YStack>
    </YStack>
  );
}