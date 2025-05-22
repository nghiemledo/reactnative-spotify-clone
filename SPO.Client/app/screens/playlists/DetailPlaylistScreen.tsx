import { Animated, Dimensions, StatusBar, View } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Image,
  Button,
  H3,
  Avatar,
  Input,
} from "tamagui";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Globe,
  ArrowDownCircle,
  UserPlus,
  EllipsisVertical,
  Play,
  Plus,
  ChevronsUpDown,
  Pen,
  Share2,
  Shuffle,
  Search,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import SortBottomSheet from "../../components/library/SortBottomSheet";
import SongOptionsBottomSheet from "../../components/search/SongOptionsBottomSheet";

// Mock data for queue with addedAt field for sorting by "Recently Added"
const queueItems = [
  {
    id: "1",
    title: "Song breakdown: I WANT YOU",
    artist: "The Interstellar Tennis Podcast",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-20T10:00:00Z",
    order: 1,
  },
  {
    id: "2",
    title: "Accepting the song that blew you up",
    artist: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-19T12:00:00Z",
    order: 2,
  },
  {
    id: "3",
    title: "Song breakdown: I WANT YOU",
    artist: "The Interstellar Tennis Podcast",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-18T15:00:00Z",
    order: 3,
  },
  {
    id: "4",
    title: "Accepting the song that blew you up",
    artist: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-17T09:00:00Z",
    order: 4,
  },
  {
    id: "5",
    title: "Song breakdown: I WANT YOU111",
    artist: "The Interstellar Tennis Podcast",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-16T14:00:00Z",
    order: 5,
  },
  {
    id: "6",
    title: "Accepting the song that blew you up",
    artist: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-15T11:00:00Z",
    order: 6,
  },
  {
    id: "7",
    title: "Song breakdown: I WANT YOU",
    artist: "The Interstellar Tennis Podcast",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-14T16:00:00Z",
    order: 7,
  },
  {
    id: "8",
    title: "Accepting the song that blew you up",
    artist: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-13T08:00:00Z",
    order: 8,
  },
  {
    id: "9",
    title: "Accepting the song that blew you up",
    artist: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-12T10:00:00Z",
    order: 9,
  },
  {
    id: "10",
    title: "Accepting the song that blew you up",
    artist: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    addedAt: "2025-05-11T13:00:00Z",
    order: 10,
  },
];

type QueueScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "detailPlaylist"
>;

export default function DetailPlaylistScreen({
  navigation,
}: {
  navigation: QueueScreenNavigationProp;
}) {
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("customerOrder");
  const [sortedItems, setSortedItems] = useState(queueItems);
  const [isSongOptionsOpen, setIsSongOptionsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<(typeof queueItems)[0] | null>(null);

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
  const searchOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const screenWidth = Dimensions.get("window").width;

  const imageSize = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [screenWidth * 0.5, screenWidth * 0.3],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [150, 300],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Sorting logic
  useEffect(() => {
    let sorted = [...queueItems];
    switch (selectedSortOption) {
      case "customerOrder":
        sorted.sort((a, b) => a.order - b.order);
        break;
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "artist":
        sorted.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      case "recentlyAdded":
        sorted.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        break;
      default:
        break;
    }
    setSortedItems(sorted);
  }, [selectedSortOption]);

  const handleSelectSortOption = (option: string) => {
    setSelectedSortOption(option);
    setIsSortSheetOpen(false);
  };

  const handleSelectSongOption = (option: string) => {
    if (!selectedSong) return;
    switch (option) {
      case "addToOtherPlaylist":
        console.log(`Add ${selectedSong.title} to another playlist`);
        // Implement navigation or logic to add to another playlist
        break;
      case "removeFromThisPlaylist":
        setSortedItems(sortedItems.filter((item) => item.id !== selectedSong.id));
        console.log(`Remove ${selectedSong.title} from this playlist`);
        break;
      case "goToAlbum":
        console.log(`Navigate to album for ${selectedSong.title}`);
        // Implement navigation to album
        break;
      case "goToArtist":
        console.log(`Navigate to artist ${selectedSong.artist}`);
        // Implement navigation to artist
        break;
      case "share":
        console.log(`Share ${selectedSong.title}`);
        // Implement share functionality
        break;
      case "goToSongRadio":
        console.log(`Go to song radio for ${selectedSong.title}`);
        // Implement navigation to song radio
        break;
      case "viewSongCredits":
        console.log(`View credits for ${selectedSong.title}`);
        // Implement navigation to song credits
        break;
      case "showSpotifyCode":
        console.log(`Show Spotify code for ${selectedSong.title}`);
        // Implement Spotify code display
        break;
      default:
        break;
    }
    setIsSongOptionsOpen(false);
    setSelectedSong(null);
  };

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
          top: -35,
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
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
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
              My Playlist
            </Animated.Text>
          </View>
          <XStack width={40} />
        </View>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack flex={1} mt="$0" p="$4">
          {/* Search bar */}
          <Animated.View style={{ opacity: searchOpacity }}>
            <XStack mt="$6" mb="$6">
              <Input
                size="$3.5"
                borderWidth={0}
                rounded="$2"
                bg="rgba(255, 255, 255, 0.2)"
                color="white"
                placeholder="Search in playlist"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                flex={1}
                m="auto"
                style={{
                  fontSize: 15,
                  paddingLeft: 40,
                  fontWeight: "bold",
                }}
                focusStyle={{
                  borderWidth: 0,
                  bg: "rgba(255, 255, 255, 0.3)",
                }}
              />
              <XStack
                position="absolute"
                l="$3"
                t="$2.5"
                items="center"
                pointerEvents="none"
              >
                <Search size="$1" color="rgba(255, 255, 255, 0.6)" />
              </XStack>
            </XStack>
          </Animated.View>
          <XStack
            items="center"
            flex={1}
            justify="center"
            self="center"
            mb={0}
            p={0}
          >
            <Animated.Image
              source={{ uri: queueItems[0].image }}
              style={{
                width: imageSize,
                height: imageSize,
                opacity,
                borderRadius: 8,
                alignSelf: "center",
              }}
              resizeMode="stretch"
              onError={(e) =>
                console.log("Image load error:", e.nativeEvent.error)
              }
              defaultSource={{ uri: "https://via.placeholder.com/150" }}
            />
          </XStack>

          <H3 mt={0} mb="$3" color="white" fontWeight="bold">
            My Playlist
          </H3>

          <YStack>
            <XStack items="center" space="$3" mb="$3">
              <Avatar circular size="$2">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src={queueItems[0].image}
                />
                <Avatar.Fallback backgroundColor="$blue10" />
              </Avatar>
              <YStack items="center">
                <Text
                  fontSize={13}
                  fontWeight="bold"
                  color="white"
                  text="center"
                >
                  Hoàng Hải Lương
                </Text>
              </YStack>
            </XStack>
            <XStack items="center" space="$2" mb="$3">
              <Globe size={18} color="#ffff" />
              <YStack items="center">
                <Text
                  fontSize={13}
                  fontWeight="bold"
                  color="white"
                  text="center"
                >
                  47 min
                </Text>
              </YStack>
            </XStack>
          </YStack>

          <XStack space="$4" mb="$4" justify="space-between">
            <XStack gap="$4">
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={
                  <ArrowDownCircle size="$2" color="white" strokeWidth={1} />
                }
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={<UserPlus size="$2" color="white" strokeWidth={1} />}
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={<Share2 size="$2" color="white" strokeWidth={1} />}
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={
                  <EllipsisVertical size="$2" color="white" strokeWidth={1} />
                }
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
            </XStack>
            <XStack gap="$4">
              <Button
                disabled
                bg="transparent"
                color="white"
                m={0}
                p={0}
                icon={<Shuffle size="$2" color="white" strokeWidth={1} />}
                hoverStyle={{ bg: "transparent" }}
                pressStyle={{
                  bg: "transparent",
                  borderBlockColor: "transparent",
                }}
              />
              <Button
                disabled
                bg="#1DB954"
                m={0}
                p={0}
                rounded={100}
                width="$4"
                height="$4"
                icon={
                  <Play size="$2" color="black" fill="black" strokeWidth={1} />
                }
              />
            </XStack>
          </XStack>

          <XStack space="$2" mb="$4">
            <Button
              size="$3"
              bg="rgba(255, 255, 255, 0.2)"
              rounded={50}
              onPress={() => console.log("Add song")}
            >
              <XStack
                items="center"
                space="$1"
                onPress={() => navigation.navigate("addSongPlaylist")}
              >
                <Plus color="white" size="$1" />
                <Text color="white" fontWeight="bold" fontSize="$3">
                  Add
                </Text>
              </XStack>
            </Button>
            <Button
              size="$3"
              bg="rgba(255, 255, 255, 0.2)"
              rounded={50}
              onPress={() => setIsSortSheetOpen(true)}
            >
              <XStack items="center" space="$1">
                <ChevronsUpDown color="white" size="$1" />
                <Text fontWeight="bold" color="white" fontSize="$3">
                  Sort
                </Text>
              </XStack>
            </Button>
            <Button
              size="$3"
              bg="rgba(255, 255, 255, 0.2)"
              rounded={50}
              onPress={() => navigation.navigate("updateSongPlaylist")}
            >
              <XStack items="center" space="$1">
                <Pen color="white" size="$1" />
                <Text fontWeight="bold" color="white" fontSize="$3">
                  Edit
                </Text>
              </XStack>
            </Button>
          </XStack>

          {/* List of songs/podcasts */}
          <FlatList
            data={sortedItems}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PlayerModal");
                }}
              >
                <XStack items="center" justify="space-between" py="$2">
                  <XStack items="center" gap="$3" flex={1}>
                    <Image
                      source={{ uri: item.image }}
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
        </YStack>
      </ScrollView>

      {/* Sort Bottom Sheet */}
      <SortBottomSheet
        isOpen={isSortSheetOpen}
        onClose={() => setIsSortSheetOpen(false)}
        onSelectOption={handleSelectSortOption}
        selectedOption={selectedSortOption}
        context="detailPlaylist"
      />

      {/* Song Options Bottom Sheet */}
      {selectedSong && (
        <SongOptionsBottomSheet
          isOpen={isSongOptionsOpen}
          onClose={() => {
            setIsSongOptionsOpen(false);
            setSelectedSong(null);
          }}
          onSelectOption={handleSelectSongOption}
          songName={selectedSong.title}
          urlAvatar={selectedSong.image}
          type="Song"
          artists={[{ id: parseInt(selectedSong.id), name: selectedSong.artist }]}
          context="detailPlaylist"
        />
      )}
    </LinearGradient>
  );
}