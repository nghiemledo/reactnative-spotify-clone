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
  H4,
  Button,
  Avatar,
  Spinner,
} from "tamagui";
import { Play } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Sidebar from "../components/home/Sidebar";
import { RootStackParamList } from "../navigation/AppNavigator";
import { togglePlayback } from "../services/playerService";
import {
  useGetSongsQuery,
  useGetAlbumsQuery,
  useGetArtistsQuery,
} from "../services/api";

// Component hình ảnh an toàn với fallback
const SafeImage = ({ uri, ...props }: any) => {
  const [error, setError] = useState(false);
  const imageUri =
    uri && uri !== "null" ? uri : "https://via.placeholder.com/150";
  return (
    <Image
      {...props}
      source={{ uri: error ? "https://via.placeholder.com/150" : imageUri }}
      onError={() => setError(true)}
    />
  );
};


const relaxationItems = [
  {
    id: "1",
    title: "Êm Đêm",
    artists: "Thư giãn cùng nhịp giai điệu du em",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "Lofi Chill Điệu Thu Giãn",
    artists: "Slacker Jack's, cakofonic, CHU VAN CONG",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "3",
    title: "Thoải",
    artists: "Kend Eilish",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;


type Section = {
  id: string;
  type: "horizontal" | "vertical";
  title?: string;
  data?: any[];
  loading?: boolean;
  error?: string | null;
  renderItem?: ({ item }: { item: any }) => React.ReactElement;
};

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedButton, setSelectedButton] = useState<string>("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const followingAnim = useRef(new Animated.Value(-100)).current; // Animation for Following button
  const sidebarAnim = useRef(
    new Animated.Value(-Dimensions.get("window").width * 0.75)
  ).current;

  // Sử dụng RTK Query để lấy dữ liệu
  const {
    data: songs = [],
    isLoading: isSongsLoading,
    error: songsError,
  } = useGetSongsQuery();


export default function HomeScreen() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [selectedButton, setSelectedButton] = useState("All");
  const handleButtonPress = (buttonName: string) => setSelectedButton(buttonName);

  return (
    <YStack flex={1} backgroundColor="#000">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack flex={1} backgroundColor="transparent" padding={20} marginTop={StatusBar.currentHeight || 0}>
          {/* Filter Buttons */}
          <XStack alignItems="center" space={12} marginBottom={24}>
          <Avatar circular size="$4">
              <Avatar.Image
                accessibilityLabel="User Avatar"
                src="https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
            <Button
              backgroundColor={selectedButton === "All" ? "#1DB954" : "#23272b"}
              borderRadius={24}
              paddingHorizontal={20}
              paddingVertical={10}
              onPress={() => handleButtonPress("All")}
            >
              <Text color={selectedButton === "All" ? "black" : "white"} fontWeight="bold">All</Text>
            </Button>
            <Button
              backgroundColor={selectedButton === "Music" ? "#1DB954" : "#23272b"}
              borderRadius={24}
              paddingHorizontal={20}
              paddingVertical={10}
              onPress={() => handleButtonPress("Music")}
            >
              <Text color={selectedButton === "Music" ? "black" : "white"} fontWeight="bold">Music</Text>
            </Button>
            <Button
              backgroundColor={selectedButton === "Podcasts" ? "#1DB954" : "#23272b"}
              borderRadius={24}
              paddingHorizontal={20}
              paddingVertical={10}
              onPress={() => handleButtonPress("Podcasts")}
            >
              <Text color={selectedButton === "Podcasts" ? "black" : "white"} fontWeight="bold">Podcasts</Text>
            </Button>
          </XStack>

          {/* Popular radio */}
          <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">Popular radio</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <FlatList
            data={radioItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={170} marginRight={16}>
                  <Image source={{ uri: item.image }} width={170} height={170} borderRadius={18} />
                  <Text color="white" fontWeight="bold" marginTop={8} fontSize={16}>{item.title}</Text>
                  <Text color="#b3b3b3" fontSize={13}>{item.artists}</Text>
                </YStack>
              </TouchableOpacity>
            )}
          />

          {/* Your recent rotation */}
          <XStack justifyContent="space-between" alignItems="center" marginTop={32} marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">Your recent rotation</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <YStack>
            {recentItems.map(item => (
              <XStack key={item.id} alignItems="center" justifyContent="space-between" marginBottom={16}>
                <XStack alignItems="center" gap={12} flex={1}>
                  <Image source={{ uri: item.image }} width={56} height={56} borderRadius={12} />
                  <YStack flex={1}>
                    <Text fontSize={16} fontWeight="bold" color="white">{item.title}</Text>
                    <Text fontSize={13} color="#b3b3b3">{item.artists}</Text>
                  </YStack>
                </XStack>
                <Button backgroundColor="transparent" padding={0} icon={<Play size={24} color="white" />} />
              </XStack>
            ))}
          </YStack>

          {/* Popular albums and singles */}
          <XStack justifyContent="space-between" alignItems="center" marginTop={32} marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">Popular albums and singles</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <FlatList
            data={albumItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={170} marginRight={16}>
                  <Image source={{ uri: item.image }} width={170} height={170} borderRadius={18} />
                  <Text color="white" fontWeight="bold" marginTop={8} fontSize={16}>{item.title}</Text>
                  <Text color="#b3b3b3" fontSize={13}>{item.artists}</Text>
                </YStack>
              </TouchableOpacity>
            )}
          />

          {/* Popular artists */}
          <XStack justifyContent="space-between" alignItems="center" marginTop={32} marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">Popular artists</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <FlatList
            data={artistItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={110} marginRight={16} alignItems="center">
                  <Image source={{ uri: item.image }} width={110} height={110} borderRadius={55} />
                  <Text color="white" fontWeight="bold" marginTop={8} fontSize={15} textAlign="center">{item.title}</Text>
                </YStack>
              </TouchableOpacity>
            )}
          />

          {/* Charts */}
          <XStack justifyContent="space-between" alignItems="center" marginTop={32} marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">Charts</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <FlatList
            data={chartItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={170} marginRight={16}>
                  <Image source={{ uri: item.image }} width={170} height={170} borderRadius={18} />
                  <Text color="white" fontWeight="bold" marginTop={8} fontSize={16}>{item.title}</Text>
                  <Text color="#b3b3b3" fontSize={13}>{item.artists}</Text>
                </YStack>
              </TouchableOpacity>
            )}
          />

          {/* Made For ... */}
          <XStack justifyContent="space-between" alignItems="center" marginTop={32} marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">Made For Trà Nguyễn Văn Nhựt</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <FlatList
            data={uniquelyYoursItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={170} marginRight={16}>
                  <Image source={{ uri: item.image }} width={170} height={170} borderRadius={18} />
                  <Text color="white" fontWeight="bold" marginTop={8} fontSize={16}>{item.title}</Text>
                  <Text color="#b3b3b3" fontSize={13}>{item.artists}</Text>
                </YStack>
              </TouchableOpacity>
            )}
          />

          {/* Find your next favorite song */}
          <XStack justifyContent="space-between" alignItems="center" marginTop={32} marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">Find your next favorite song</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <FlatList
            data={newReleasesItems.slice(0, 3)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={170} marginRight={16}>
                  <Image source={{ uri: item.image }} width={170} height={170} borderRadius={18} />
                  <Text color="white" fontWeight="bold" marginTop={8} fontSize={16}>Similar to {item.title}</Text>
                  <Text color="#b3b3b3" fontSize={13}>{item.artists}</Text>
                </YStack>
              </TouchableOpacity>
            )}
          />

          {/* New releases for you */}
          <XStack justifyContent="space-between" alignItems="center" marginTop={32} marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">New releases for you</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <FlatList
            data={newReleasesItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={170} marginRight={16}>
                  <Image source={{ uri: item.image }} width={170} height={170} borderRadius={18} />
                  <Text color="white" fontWeight="bold" marginTop={8} fontSize={16}>{item.title}</Text>
                  <Text color="#b3b3b3" fontSize={13}>{item.artists}</Text>
                </YStack>
              </TouchableOpacity>
            )}
          />
          {/* Podcasts Section */}
          <XStack justifyContent="space-between" alignItems="center" marginTop={32} marginBottom={12}>
            <Text fontSize={24} fontWeight="bold" color="white">Podcasts</Text>
            <Text color="#b3b3b3" fontWeight="bold">Show all</Text>
          </XStack>
          <FlatList
            data={podcastItems}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 32 }}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack
                  backgroundColor="#23272b"
                  padding={20}
                  borderRadius={24}
                  marginBottom={20}
                  alignItems="center"
                >
                  <Image
                    source={{ uri: item.image }}
                    width={120}
                    height={120}
                    borderRadius={16}
                  />
                  <Text
                    color="white"
                    fontSize={20}
                    fontWeight="bold"
                    textAlign="center"
                    marginTop={16}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text
                    color="#b3b3b3"
                    fontSize={15}
                    marginTop={4}
                    textAlign="center"
                  >
                    {item.artists}
                  </Text>
                  <Text
                    color="#b3b3b3"
                    fontSize={13}
                    marginTop={2}
                    textAlign="center"
                  >
                    {item.date}
                  </Text>
                  <Text
                    color="#b3b3b3"
                    fontSize={13}
                    marginTop={8}
                    numberOfLines={3}
                    textAlign="center"
                  >
                    {item.description}
                  </Text>
                  <XStack marginTop={16} width="100%" justifyContent="space-between" alignItems="center">
                    <Button backgroundColor="#333" borderRadius={16} paddingHorizontal={16}>
                      <Text color="white" fontSize={13}>Preview episode</Text>
                    </Button>
                    <Button backgroundColor="#1DB954" borderRadius={100} width={48} height={48} icon={<Play size={28} color="black" fill="black" />} />
                  </XStack>
                </YStack>
              </TouchableOpacity>
  const {
    data: albums = [],
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useGetAlbumsQuery();

  const {
    data: artists = [],
    isLoading: isArtistsLoading,
    error: artistsError,
  } = useGetArtistsQuery();

  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);
    if (buttonName === "Podcasts") {
      setShowFollowing(true);
      Animated.timing(followingAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(followingAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowFollowing(false));
    }
  };

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -Dimensions.get("window").width * 0.75 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Hàm lấy tên nghệ sĩ từ artistId
  const getArtistName = (artistId: string | undefined) => {
    if (!artistId) return "Unknown Artist";
    const artist = artists.find((a) => a.id === artistId);
    return artist?.name || "Unknown Artist";
  };

  // Biến đổi dữ liệu từ API
  const transformData = () => {
    const radioItems = songs.map((song) => ({
      id: song.id,
      title: song.title,
      artists: getArtistName(song.artistId),
      image: song.coverImage || "https://via.placeholder.com/150",
    }));

    const chartItems = songs.map((song) => ({
      id: song.id,
      title: song.title,
      artists: getArtistName(song.artistId),
      image: song.coverImage || "https://via.placeholder.com/120",
    }));

    const relaxationItems = songs.map((song) => ({
      id: song.id,
      title: song.title,
      artists: getArtistName(song.artistId),
      image: song.coverImage || "https://via.placeholder.com/150",
    }));

    return [
      {
        id: "radio",
        type: "horizontal",
        title: "Popular radio",
        data: radioItems,
        loading: isSongsLoading,
        error: songsError?.toString(),
        renderItem: ({ item }) => (
          <TouchableOpacity>
            <YStack width={150} mr="$4">
              <SafeImage
                uri={item.image}
                width={150}
                height={150}
                borderRadius={10}
              />
              <Text color="white" fontWeight="bold" mt="$2">
                {item.title}
              </Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                {item.artists}
              </Text>
            </YStack>
          </TouchableOpacity>
        ),
      },
      {
        id: "charts",
        type: "horizontal",
        title: "Charts",
        data: chartItems,
        loading: isSongsLoading,
        error: songsError?.toString(),
        renderItem: ({ item }) => (
          <TouchableOpacity>
            <YStack width={120} mr="$4">
              <SafeImage
                uri={item.image}
                width={120}
                height={180}
                borderRadius={10}
              />
              <Text color="white" fontWeight="bold" mt="$2">
                {item.title}
              </Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                {item.artists}
              </Text>
            </YStack>
          </TouchableOpacity>
        ),
      },
      {
        id: "albums",
        type: "horizontal",
        title: "Popular albums",
        data: albums,
        loading: isAlbumsLoading,
        error: albumsError?.toString(),
        renderItem: ({ item }) => (
          <TouchableOpacity>
            <YStack width={120} mr="$4">
              <SafeImage
                uri={item.coverImage}
                width={120}
                height={120}
                borderRadius={10}
              />
              <Text color="white" fontWeight="bold" mt="$2" numberOfLines={1}>
                {item.title}
              </Text>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                {getArtistName(item.artistId)}
              </Text>
            </YStack>
          </TouchableOpacity>
        ),
      },
      {
        id: "artists",
        type: "horizontal",
        title: "Popular artists",
        data: artists,
        loading: isArtistsLoading,
        error: artistsError?.toString(),
        renderItem: ({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ArtistScreen", { artistId: item.id })
            }
          >
            <YStack width={100} mr="$4" items="center">
              <SafeImage
                uri={item.urlAvatar}
                width={100}
                height={100}
                borderRadius={50}
              />
              <Text
                color="white"
                fontWeight="bold"
                mt="$2"
                text="center"
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </YStack>
          </TouchableOpacity>
        ),
      },
      {
        id: "songs",
        type: "vertical",
        title: "Your recent rotation",
        data: songs,
        loading: isSongsLoading,
        error: songsError?.toString(),
        renderItem: ({ item }) => (
          <TouchableOpacity onPress={() => togglePlayback(item)}>
            <XStack items="center" py="$2">
              <SafeImage
                uri={item.coverImage}
                width={50}
                height={50}
                borderRadius={10}
              />
              <YStack ml="$3" flex={1}>
                <Text color="white" fontWeight="bold" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                  {Math.floor(item.duration / 60)}:
                  {(item.duration % 60).toString().padStart(2, "0")}
                </Text>
              </YStack>
              <Button
                bg="white"
                rounded={100}
                width="$3"
                height="$3"
                p={0}
                icon={<Play size="$1" color="black" />}
              />
            </XStack>
          </TouchableOpacity>
        ),
      },
    ];
  };

  const sections = transformData();

  const renderSection = ({ item: section }: { item: Section }) => {
    if (section.loading)
      return (
        <YStack items="center" p={4}>
          <Spinner size="large" color="$blue10" />
        </YStack>
      );
    if (section.error)
      return (
        <Text color="red" text="center">
          {section.error}
        </Text>
      );
    if (!section.data?.length) return null;

    return (
      <YStack mb="$6">
        <H4 color="white" mb={3}>
          {section.title}
        </H4>
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
    <YStack flex={1} bg="rgb(25, 27, 31)" pl={20}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Sidebar */}
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
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          navigation={navigation}
        />
      </Animated.View>

      {/* Nội dung chính */}
      <Animated.View
        style={{
          flex: 1,
          transform: [
            {
              translateX: sidebarAnim.interpolate({
                inputRange: [-Dimensions.get("window").width * 0.75, 0],
                outputRange: [0, Dimensions.get("window").width * 0.75],
              }),
            },
          ],
        }}
      >
        {/* Header */}
        <XStack
          items="center"
          space="$2"
          py={10}
          mt={StatusBar.currentHeight || 0}
          z={1}
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

          {["All", "Music", "Podcasts"].map((button) => (
            <Button
              ml={7}
              key={button}
              size="$3"
              bg={
                selectedButton === button
                  ? "#1DB954"
                  : "rgba(255, 255, 255, 0.2)"
              }
              rounded={50}
              onPress={() => handleButtonPress(button)}
            >
              <Text color={selectedButton === button ? "black" : "white"}>
                {button}
              </Text>
            </Button>
          ))}
          
          {showFollowing && (
            <Animated.View
              style={{
                transform: [{ translateX: followingAnim }],
              }}
            >
              <Button
                size="$3"
                bg="rgba(255, 255, 255, 0.2)"
                rounded={50}
                onPress={() => handleButtonPress("Following")}
              >
                <Text color="white">Following</Text>
              </Button>
            </Animated.View>
          )}
        </XStack>

        {/* Danh sách nội dung */}
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
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            pointerEvents={isSidebarOpen ? "none" : "auto"}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </Animated.View>

        {/* Overlay khi sidebar mở */}
        {isSidebarOpen && (
          <TouchableWithoutFeedback onPress={toggleSidebar}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </TouchableWithoutFeedback>
        )}
      </Animated.View>
    </YStack>
  );
}
