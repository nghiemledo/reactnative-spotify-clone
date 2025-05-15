import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { Button, Image, Input, Text, View, XStack, YStack } from "tamagui";
import {
  ArrowLeft,
  CircleCheck,
  CirclePlus,
  EllipsisVertical,
  X,
} from "@tamagui/lucide-icons";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../types";

interface Artist {
  id: number;
  type: "artist";
  name: string;
  image: string;
}

interface Song {
  id: number;
  type: "song";
  name: string;
  artists: { id: number; name: string }[];
  image: string;
}

type Item = Artist | Song;
const data = [
  {
    id: 1,
    type: "artist",
    name: "HieuThuHai",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    type: "song",
    name: "HieuThuHai",
    artists: [
      {
        id: 1,
        name: "MANBO",
      },
      {
        id: 2,
        name: "obito",
      },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    type: "song",
    name: "Hà Nội",
    artists: [
      {
        id: 1,
        name: "MANBO",
      },
      {
        id: 2,
        name: "obito",
      },
      {
        id: 3,
        name: "dangrangto",
      },
      {
        id: 4,
        name: "tlinh",
      },
      {
        id: 5,
        name: "mck",
      },
    ],
    image: "https://i.pravatar.cc/150?img=3",
  },
];

const dataType = [
  { id: 1, name: "song" },
  { id: 2, name: "song" },
  { id: 3, name: "song" },
  { id: 4, name: "song" },
  { id: 5, name: "song" },
];

type SearchResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "searchresult"
>;

export default function SearchResultScreen({
  navigation,
}: {
  navigation: SearchResultScreenNavigationProp;
}) {
  const { width, height } = Dimensions.get("window");
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [artist, setArtist] = useState<Artist | null>(null);

  const normalize = (s: string) => s.trim().toLowerCase();

  const filteredData =
    searchValue.trim() === "" && searchQuery.trim() === ""
      ? []
      : data.filter((item) => {
          if (searchQuery.trim() !== "") {
            const needle = normalize(searchQuery);
            if (normalize(item.name).includes(needle)) return true;
            if (item.type === "song" && item.artists) {
              return item.artists.some((artist) =>
                normalize(artist.name).includes(needle)
              );
            }
            return false;
          }

          const needle = normalize(searchValue);
          if (normalize(item.name).includes(needle)) return true;
          if (item.type === "song" && item.artists) {
            return item.artists.some((artist) =>
              normalize(artist.name).includes(needle)
            );
          }
          return false;
        });

  const toastConfig = {
    success: ({ text1, text2 }: BaseToastProps) => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          padding: 12,
          borderRadius: 10,
          marginHorizontal: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={{ width: 24, height: 24, marginRight: 12 }}
        />
        <XStack style={{ flex: 1 }} justifyContent="space-between">
          <Text fontSize="$3">{text1}</Text>
          <Text
            color="#1DB954"
            fontWeight="bold"
            onPress={() => navigation.goBack()}
          >
            Change
          </Text>
        </XStack>
      </View>
    ),
  };

  const handlePress = (id: number) => {
    setLikedItems((prev) => {
      const isLiked = prev[id];
      if (!isLiked) {
        Toast.show({
          type: "success",
          text1: "Added to liked songs",
          position: "bottom",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
      return { ...prev, [id]: !isLiked };
    });
  };

  const handleSearchSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchQuery(searchValue);
      const needle = normalize(searchValue);

      const matchedArtist = data.find(
        (item) =>
          item.type === "artist" && normalize(item.name).includes(needle)
      );

      if (matchedArtist) {
        setArtist(matchedArtist as Artist);
      } else {
        setArtist(null);
      }
      setIsSearch(true);
      setIsLoading(false);
    }, 1500);

    Keyboard.dismiss();
  };

  const handleInputFocus = () => {
    if (isSearch) {
      setIsLoading(true);
      setIsSearch(false);
      setArtist(null);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <YStack flex={1} backgroundColor="#000">
      <View
        style={{ position: "fixed" }}
        width="100%"
        borderRadius={7}
        zIndex={1000}
        alignItems="center"
        paddingVertical="$1.5"
        flexDirection="column"
      >
        <XStack
          paddingVertical="$2"
          alignItems="center"
          backgroundColor="rgba(256, 256, 256, 0.3)"
          paddingTop="$7"
          marginBottom="$2"
        >
          <Input
            size="$3.5"
            borderWidth={0}
            borderRadius="$2"
            backgroundColor="transparent"
            color="white"
            fontWeight="bold"
            placeholder="What do you want to listen to?"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            flex={1}
            margin="auto"
            paddingLeft="$7"
            value={searchValue}
            onChangeText={setSearchValue}
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
            onFocus={handleInputFocus} // Thêm onFocus
          />
          <XStack
            position="absolute"
            left="$2"
            top="$8"
            alignItems="center"
            pointerEvents="none"
          >
            <ArrowLeft size="$1" color="white" />
          </XStack>
          <XStack
            position="absolute"
            right="$3"
            top="$8"
            alignItems="center"
            onPress={() => {
              setSearchValue("");
              setSearchQuery("");
              setIsSearch(false);
              setArtist(null);
            }}
          >
            <X size="$1" color="white" />
          </XStack>
        </XStack>
        {isSearch && (
          <FlatList
            data={dataType}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingHorizontal: 10,
              gap: 10,
              alignItems: "center",
            }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack
                  backgroundColor="rgba(256, 256, 256, 0.3)"
                  justifyContent="center"
                  paddingHorizontal="$5"
                  alignItems="center"
                  paddingVertical="$2"
                  borderRadius="$10"
                >
                  <Text
                    color="white"
                    fontWeight="bold"
                    // marginTop={8}
                    fontSize={16}
                    alignSelf="center"
                  >
                    {item.name}
                  </Text>
                </YStack>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <YStack flex={1} backgroundColor="#000" paddingHorizontal="$3">
        {isLoading ? (
          <YStack flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color="#1DB954" />
          </YStack>
        ) : (
          <ScrollView scrollEventThrottle={16}>
            {artist && (
              <XStack
                alignItems="center"
                justifyContent="space-between"
                paddingVertical="$2"
              >
                <XStack alignItems="center" gap="$3" flex={1} paddingRight="$2">
                  <Image
                    source={{ uri: artist.image }}
                    width={50}
                    height={50}
                    borderRadius={100}
                  />
                  <YStack flex={1}>
                    <Text fontSize={15} fontWeight="300" color="white">
                      {artist.name}
                    </Text>
                    <Text
                      fontSize={13}
                      fontWeight="300"
                      color="rgba(255, 255, 255, 0.7)"
                    >
                      {artist.type}
                    </Text>
                  </YStack>
                </XStack>
                <Button
                  color="white"
                  backgroundColor="transparent"
                  borderColor="white"
                  size="$3"
                  borderRadius="$10"
                >
                  <Text color="white">Follow</Text>
                </Button>
              </XStack>
            )}
            {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    {item.type === "song" ? (
                      <XStack
                        alignItems="center"
                        justifyContent="space-between"
                        paddingVertical="$2"
                      >
                        <XStack
                          alignItems="center"
                          gap="$3"
                          flex={1}
                          paddingRight="$2"
                        >
                          <Image
                            source={{ uri: item.image }}
                            width={50}
                            height={50}
                            borderRadius={8}
                          />
                          <YStack flex={1}>
                            <Text fontSize={15} fontWeight="300" color="white">
                              {item.name}
                            </Text>
                            <Text
                              fontSize={13}
                              fontWeight="300"
                              color="rgba(255, 255, 255, 0.7)"
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {item.type} •{" "}
                              {item.artists
                                ?.map((artist) => artist.name)
                                .join(", ")}
                            </Text>
                          </YStack>
                        </XStack>
                        <XStack gap="$3">
                          <Button
                            backgroundColor="transparent"
                            padding={0}
                            icon={
                              <EllipsisVertical
                                size="$1"
                                color="white"
                                strokeWidth={1}
                              />
                            }
                            pressStyle={{
                              backgroundColor: "transparent",
                              borderBlockColor: "transparent",
                            }}
                          />
                          <Button
                            backgroundColor="transparent"
                            padding={0}
                            icon={
                              likedItems[item.id] ? (
                                <CircleCheck
                                  size="$1"
                                  color="white"
                                  strokeWidth={1}
                                  backgroundColor="#1DB954"
                                  borderRadius="$10"
                                  borderColor="#333"
                                />
                              ) : (
                                <CirclePlus
                                  size="$1"
                                  color="white"
                                  strokeWidth={1}
                                />
                              )
                            }
                            pressStyle={{
                              backgroundColor: "transparent",
                              borderBlockColor: "transparent",
                            }}
                            onPress={() => handlePress(item.id)}
                          />
                        </XStack>
                      </XStack>
                    ) : (
                      <XStack
                        alignItems="center"
                        justifyContent="space-between"
                        paddingVertical="$2"
                      >
                        <XStack
                          alignItems="center"
                          gap="$3"
                          flex={1}
                          paddingRight="$2"
                        >
                          <Image
                            source={{ uri: item.image }}
                            width={50}
                            height={50}
                            borderRadius={100}
                          />
                          <YStack flex={1}>
                            <Text fontSize={15} fontWeight="300" color="white">
                              {item.name}
                            </Text>
                            <Text
                              fontSize={13}
                              fontWeight="300"
                              color="rgba(255, 255, 255, 0.7)"
                            >
                              {item.type}
                            </Text>
                          </YStack>
                        </XStack>
                      </XStack>
                    )}
                  </TouchableOpacity>
                )}
                scrollEnabled={false}
              />
            ) : searchQuery.trim() !== "" ? (
              <YStack
                position="absolute"
                top={height / 2}
                left={width / 2 - 130}
                alignItems="center"
              >
                <Text
                  fontWeight="bold"
                  color="white"
                  fontSize="$6"
                  alignSelf="center"
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
                top={height / 2}
                left={width / 2 - 130}
                alignItems="center"
              >
                <Text
                  fontWeight="bold"
                  color="white"
                  fontSize="$6"
                  alignSelf="center"
                >
                  Play what you love
                </Text>
                <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                  Search for artists, songs, podcasts and more
                </Text>
              </YStack>
            )}
          </ScrollView>
        )}
      </YStack>
      <Toast config={toastConfig} />
    </YStack>
  );
}
