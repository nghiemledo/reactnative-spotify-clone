import React, { useState, useRef } from "react";
import {
  FlatList,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  YStack,
  XStack,
  Text,
  Image,
  H3,
  Button,
  Avatar,
  Spinner,
} from "tamagui";
import { Play } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Sidebar from "../components/Sidebar";
import { RootStackParamList } from "../navigation/AppNavigator";
import { togglePlayback } from "../services/playerService"; // Import togglePlayback


interface Artist {
  id: string;
  name: string;
  bio: string;
  urlAvatar: string;
  createdAt: string;
  updatedAt: string | null;
}

interface Song {
  id: string;
  title: string;
  coverImage: string;
  genreId: string;
  duration: number;
  counter: number;
  audioUrl: string;
  artistId: string;
  albumId: string;
  createdAt: string;
  updatedAt: string | null;
}

interface Album {
  id: string;
  title: string;
  releaseDate: string;
  coverImage: string;
  genreId: string;
  artistId: string;
  createdAt: string;
  updatedAt: string | null;
}

// Dữ liệu mẫu
const radioItems = [
  { id: "1", title: "Low G", artists: "tlinh, Low G, RPT MCK", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { id: "2", title: "Hà Anh Tuấn", artists: "Vũ., Emcee L (Da LAB)", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { id: "3", title: "tlinh", artists: "tlinh, Wren", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
];

const chartItems = [
  { id: "1", title: "HOT", artists: "SOOBIN, buitruonglinh", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { id: "2", title: "Top 50 Vietnam", artists: "Your daily update", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
];

const relaxationItems = [
  { id: "1", title: "Êm Đêm", artists: "Thư giãn cùng nhịp giai điệu du em", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { id: "2", title: "Lofi Chill Điệu Thu Giãn", artists: "Slacker Jack, cakofonic, CHU VAN CONG", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { id: "3", title: "Thoải", artists: "Kend Eilish", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
];

const newReleasesItems = [
  { id: "1", title: "Priceless (feat. LISA)", artists: "Maroon 5, LISA", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { id: "2", title: "I Said I Love You First...", artists: "Selena Gomez, benny blanco", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { id: "3", title: "Lose", artists: "Don Toliver, The A", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
];

const uniquelyYoursItems = [
  { id: "1", title: "daylist", artists: "Your day in a playlist.", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { id: "2", title: "On Repeat", artists: "Songs you love right now", image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
];

const podcastItems = [
  {
    id: "1",
    title: "Những trang thư có lửa về hào khí dân tộc Việt Nam | Podcast...",
    artists: "Episode · Vì sao thế nhỉ!",
    date: "Apr 27 · 17min",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    description: "Thư ra tiền tuyến, thư về hậu phương...",
  },
  {
    id: "2",
    title: "Mặt nạ đau khổ - Tri Kỷ Cảm Xúc #377",
    artists: "Episode · Tri Kỷ Cảm Xúc",
    date: "Apr 28 · 20min",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    description: "Một tập podcast đầy cảm xúc với những suy tư và sự đồng cảm...",
  },
];

// Dữ liệu mẫu cho artists, albums, songs
const sampleArtists: Artist[] = [
  {
    id: "1",
    name: "Low G",
    bio: "Rapper nổi tiếng Việt Nam",
    urlAvatar: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-01-01",
    updatedAt: null,
  },
  {
    id: "2",
    name: "Hà Anh Tuấn",
    bio: "Ca sĩ nhạc nhẹ Việt Nam",
    urlAvatar: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-01-01",
    updatedAt: null,
  },
  {
    id: "3",
    name: "tlinh",
    bio: "Nữ rapper trẻ tài năng",
    urlAvatar: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    createdAt: "2023-01-01",
    updatedAt: null,
  },
];

const sampleAlbums: Album[] = [
  {
    id: "1",
    title: "Album Low G",
    releaseDate: "2023-06-01",
    coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    genreId: "rap",
    artistId: "1",
    createdAt: "2023-01-01",
    updatedAt: null,
  },
  {
    id: "2",
    title: "Album Hà Anh Tuấn",
    releaseDate: "2023-07-01",
    coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    genreId: "pop",
    artistId: "2",
    createdAt: "2023-01-01",
    updatedAt: null,
  },
];

const sampleSongs: Song[] = [
  {
    id: "1",
    title: "Simple Love",
    coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    genreId: "rap",
    duration: 180,
    counter: 1000,
    audioUrl: "https://example.com/audio1.mp3",
    artistId: "1",
    albumId: "1",
    createdAt: "2023-01-01",
    updatedAt: null,
  },
  {
    id: "2",
    title: "Cơn Mưa Ngang Qua",
    coverImage: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    genreId: "pop",
    duration: 240,
    counter: 2000,
    audioUrl: "https://example.com/audio2.mp3",
    artistId: "2",
    albumId: "2",
    createdAt: "2023-01-01",
    updatedAt: null,
  },
];

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

type Section = {
  id: string;
  type: "horizontal" | "vertical";
  title?: string;
  data?: any[];
  loading?: boolean;
  error?: string | null;
  renderItem?: ({ item }: { item: any }) => React.ReactElement;
};

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedButton, setSelectedButton] = useState<string>("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-Dimensions.get("window").width * 0.75)).current;

  const handleButtonPress = (buttonName: string) => setSelectedButton(buttonName);
  return (
    <YStack flex={1} backgroundColor="#000000">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack
          flex={1}
          backgroundColor="transparent"
          padding="$4"
          marginTop={StatusBar.currentHeight || 0}
        >
          {/* Header with Avatar and Buttons */}
          <XStack alignItems="center" space="$2" marginBottom="$4">
            <Avatar circular size="$4">
              <Avatar.Image
                accessibilityLabel="User Avatar"
                src="https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
            <Button
              size="$3"
              backgroundColor={
                selectedButton === "All"
                  ? "#1DB954"
                  : "rgba(255, 255, 255, 0.2)"
              }
              borderRadius={50}
              borderColor="$text"
              onPress={() => handleButtonPress("All")}
            >
              <Text color={selectedButton === "All" ? "black" : "white"}>
                All
              </Text>
            </Button>
            <Button
              size="$3"
              backgroundColor={
                selectedButton === "Music"
                  ? "#1DB954"
                  : "rgba(255, 255, 255, 0.2)"
              }
              borderRadius={50}
              borderColor="$text"
              onPress={() => handleButtonPress("Music")}
            >
              <Text color={selectedButton === "Music" ? "black" : "white"}>
                Music
              </Text>
            </Button>
            <Button
              size="$3"
              backgroundColor={
                selectedButton === "Podcasts"
                  ? "#1DB954"
                  : "rgba(255, 255, 255, 0.2)"
              }
              borderRadius={50}
              borderColor="$text"
              onPress={() => handleButtonPress("Podcasts")}
            >
              <Text color={selectedButton === "Podcasts" ? "black" : "white"}>
                Podcasts
              </Text>
            </Button>
          </XStack>

          {/* Popular Radio Section */}
          <H3 color="white" marginBottom="$3">
            Popular radio
          </H3>
          <FlatList
            data={radioItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={150} marginRight="$4">
                  <Image
                    source={{ uri: item.image }}
                    width={150}
                    height={150}
                    borderRadius={2}
                  />
                  <Text color="white" fontWeight="bold" marginTop="$2">
                    {item.title}
                  </Text>
                  <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                    {item.artists}
                  </Text>
                </YStack>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />

          {/* Charts Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            Charts
          </H3>
          <FlatList
            data={chartItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={120} marginRight="$4">
                  <Image
                    source={{ uri: item.image }}
                    width={120}
                    height={180}
                    borderRadius={2}
                  />
                  <Text color="white" fontWeight="bold" marginTop="$2">
                    {item.title}
                  </Text>
                  <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                    {item.artists}
                  </Text>
                </YStack>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -Dimensions.get("window").width * 0.75 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Kiểm tra Play icon để tránh undefined
  const PlayIcon = Play || (() => null);

  const sections: Section[] = [
    {
      id: "radio",
      type: "horizontal",
      title: "Popular radio",
      data: radioItems,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <YStack width={150} marginRight="$4">
            <Image source={{ uri: item.image }} width={150} height={150} borderRadius={2} />
            <Text color="white" fontWeight="bold" marginTop="$2">{item.title}</Text>
            <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">{item.artists}</Text>
          </YStack>
        </TouchableOpacity>
      ),
    },
    {
      id: "charts",
      type: "horizontal",
      title: "Charts",
      data: chartItems,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <YStack width={120} marginRight="$4">
            <Image source={{ uri: item.image }} width={120} height={180} borderRadius={2} />
            <Text color="white" fontWeight="bold" marginTop="$2">{item.title}</Text>
            <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">{item.artists}</Text>
          </YStack>
        </TouchableOpacity>
      ),
    },
    {
      id: "albums",
      type: "horizontal",
      title: "Popular albums",
      data: sampleAlbums,
      loading: false,
      error: null,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <YStack width={120} marginRight="$4">
            <Image source={{ uri: item.coverImage }} width={120} height={120} borderRadius={2} />
            <Text color="white" fontWeight="bold" marginTop="$2" numberOfLines={1}>{item.title}</Text>
            <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">{new Date(item.releaseDate).toLocaleDateString()}</Text>
          </YStack>
        </TouchableOpacity>
      ),
    },
    {
      id: "artists",
      type: "horizontal",
      title: "Popular artists",
      data: sampleArtists,
      loading: false,
      error: null,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <YStack width={100} marginRight="$4" alignItems="center">
            <Image source={{ uri: item.urlAvatar }} width={100} height={100} borderRadius={50} />
            <Text color="white" fontWeight="bold" marginTop="$2" textAlign="center" numberOfLines={1}>{item.name}</Text>
          </YStack>
        </TouchableOpacity>
      ),
    },
    {
      id: "songs",
      type: "vertical",
      title: "Your recent rotation",
      data: sampleSongs,
      loading: false,
      error: null,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <XStack alignItems="center" paddingVertical="$2">
            <Image source={{ uri: item.coverImage }} width={50} height={50} borderRadius={2} />
            <YStack marginLeft="$3" flex={1}>
              <Text color="white" fontWeight="bold" numberOfLines={1}>{item.title}</Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, "0")}
              </Text>
            </YStack>
            <TouchableOpacity
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 50,
                width: 32,
                height: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => togglePlayback()} // Sử dụng togglePlayback từ playerService
            >
              <Play size={16} color="#000000" />
            </TouchableOpacity>
          </XStack>
        </TouchableOpacity>
      ),
    },
    {
      id: "relaxation",
      type: "horizontal",
      title: "Relaxation",
      data: relaxationItems,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <YStack width={150} marginRight="$4">
            <Image source={{ uri: item.image }} width={150} height={150} borderRadius={2} />
            <Text color="white" fontWeight="bold" marginTop="$2">{item.title}</Text>
            <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">{item.artists}</Text>
          </YStack>
        </TouchableOpacity>
      ),
    },
    {
      id: "newReleases",
      type: "horizontal",
      title: "New Releases",
      data: newReleasesItems,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <YStack width={150} marginRight="$4">
            <Image source={{ uri: item.image }} width={150} height={150} borderRadius={2} />
            <Text color="white" fontWeight="bold" marginTop="$2">{item.title}</Text>
            <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">{item.artists}</Text>
          </YStack>
        </TouchableOpacity>
      ),
    },
    {
      id: "uniquelyYours",
      type: "horizontal",
      title: "Uniquely Yours",
      data: uniquelyYoursItems,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <YStack width={150} marginRight="$4">
            <Image source={{ uri: item.image }} width={150} height={150} borderRadius={2} />
            <Text color="white" fontWeight="bold" marginTop="$2">{item.title}</Text>
            <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">{item.artists}</Text>
          </YStack>
        </TouchableOpacity>
      ),
    },
    {
      id: "podcasts",
      type: "vertical",
      title: "Podcasts",
      data: podcastItems,
      renderItem: ({ item }) => (
        <TouchableOpacity>
          <XStack alignItems="center" paddingVertical="$2">
            <Image source={{ uri: item.image }} width={50} height={50} borderRadius={2} />
            <YStack marginLeft="$3" flex={1}>
              <Text color="white" fontWeight="bold" numberOfLines={1}>{item.title}</Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">{item.artists}</Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">{item.date}</Text>
            </YStack>
          </XStack>
        </TouchableOpacity>
      ),
    },
  ];

  const renderSection = ({ item: section }: { item: Section }) => {
    if (section.loading) return <YStack alignItems="center" padding="$4"><Spinner size="large" color="$blue10" /></YStack>;
    if (section.error) return <Text color="red" textAlign="center">{section.error}</Text>;
    if (!section.data || !section.renderItem) return null;

    return (
      <YStack marginBottom="$6">
        <H3 color="white" marginBottom="$3">{section.title}</H3>
        <FlatList
          data={section.data}
          horizontal={section.type === "horizontal"}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={section.renderItem}
        />
      </YStack>
    );
  };

  return (
    <YStack flex={1} backgroundColor="#000000" paddingLeft={20}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Animated.View
        style={{
          width: Dimensions.get("window").width * 0.75,
          transform: [{ translateX: sidebarAnim }],
          position: "absolute",
          top: 0,
          bottom: 0,
          backgroundColor: "#111",
          zIndex: 10,
        }}
      >
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} navigation={navigation} />
      </Animated.View>
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: sidebarAnim.interpolate({
            inputRange: [-Dimensions.get("window").width * 0.75, 0],
            outputRange: [0, Dimensions.get("window").width * 0.75],
          }) }],
        }}
      >
        {/* Header cố định ở đầu */}
        <XStack
          alignItems="center"
          space="$2"
          paddingVertical="$4"
          marginTop={StatusBar.currentHeight || 0}
          backgroundColor="#000000"
          zIndex={1}
          elevation={2}
        >
          <TouchableOpacity onPress={toggleSidebar}>
            <Avatar circular size="$4">
              <Avatar.Image
                accessibilityLabel="User Avatar"
                src="https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
          </TouchableOpacity>
          <Button
            size="$3"
            backgroundColor={
              selectedButton === "All" ? "#1DB954" : "rgba(255, 255, 255, 0.2)"
            }
            borderRadius={50}
            onPress={() => handleButtonPress("All")}
          >
            <Text color={selectedButton === "All" ? "black" : "white"}>All</Text>
          </Button>
          <Button
            size="$3"
            backgroundColor={
              selectedButton === "Music" ? "#1DB954" : "rgba(255, 255, 255, 0.2)"
            }
            borderRadius={50}
            onPress={() => handleButtonPress("Music")}
          >
            <Text color={selectedButton === "Music" ? "black" : "white"}>Music</Text>
          </Button>
          <Button
            size="$3"
            backgroundColor={
              selectedButton === "Podcasts" ? "#1DB954" : "rgba(255, 255, 255, 0.2)"
            }
            borderRadius={50}
            onPress={() => handleButtonPress("Podcasts")}
          >
            <Text color={selectedButton === "Podcasts" ? "black" : "white"}>Podcasts</Text>
          </Button>
        </XStack>

        <Animated.View
          style={{
            flex: 1,
            opacity: sidebarAnim.interpolate({
              inputRange: [-Dimensions.get("window").width * 0.75, 0],
              outputRange: [1, 0.5],
            }),
          }}
        >
          <FlatList
            data={sections}
            renderItem={renderSection}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            pointerEvents={isSidebarOpen ? "none" : "auto"}
            contentContainerStyle={{ paddingTop: 0 }}
          />
        </Animated.View>
        {isSidebarOpen && (
          <TouchableWithoutFeedback onPress={toggleSidebar}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            />
          </TouchableWithoutFeedback>
        )}
      </Animated.View>
    </YStack>
  );
}
