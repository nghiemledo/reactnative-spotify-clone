import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { YStack, XStack, Text, Image, H3, Button, Avatar } from "tamagui";
import { Play } from "@tamagui/lucide-icons";

const chartItems = [
  {
    id: "1",
    title: "HOT",
    artists: "SOOBIN, buitruonglinh",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "Top 50 Vietnam",
    artists: "Your daily update",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

const albumItems = [
  {
    id: "1",
    title: "THE WXRDIES",
    artists: "Wxrdie",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "Đánh Đổi",
    artists: "Obito, Shiki",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

const artistItems = [
  {
    id: "1",
    title: "Sơn Tùng M-TP",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "tlinh",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

const recentItems = [
  {
    id: "1",
    title: "STARBOY",
    artists: "The Weeknd, Daft Punk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "People",
    artists: "Libianca",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "3",
    title: "Đừng Làm Trái Tim Anh Đau",
    artists: "Sơn Tùng M-TP",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

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
    artists: "Slacker Jack’s, cakofonic, CHU VAN CONG",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "3",
    title: "Thoải",
    artists: "Kend Eilish",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

const newReleasesItems = [
  {
    id: "1",
    title: "Priceless (feat. LISA)",
    artists: "Maroon 5, LISA",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "I Said I Love You First...",
    artists: "Selena Gomez, benny blanco",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "3",
    title: "Lose",
    artists: "Don Toliver, The A",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

const uniquelyYoursItems = [
  {
    id: "1",
    title: "daylist",
    artists: "Your day in a playlist.",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "On Repeat",
    artists: "Songs you love right now",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

const podcastItems = [
  {
    id: "1",
    title: "Những trang thư có lửa về hào khí dân tộc Việt Nam | Podcast...",
    artists: "Episode · Vì sao thế nhỉ!",
    date: "Apr 27 · 17min",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    description:
      "Thư ra tiền tuyến, thư về hậu phương. Từng dòng từng câu khắc khoải đôi bờ đã vượt qua khoảng cách, thời gian, và cả sự sống và cái chết...",
  },
  {
    id: "2",
    title: "Mặt nạ đau khổ - Tri Kỷ Cảm Xúc #377",
    artists: "Episode · Tri Kỷ Cảm Xúc",
    date: "Apr 28 · 20min",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    description:
      'Một tập podcast đầy cảm xúc với những suy tư và sự đồng cảm với những người đang đeo "mặt nạ" để che giấu tổn thương.',
  },
];

export default function HomeScreen() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [selectedButton, setSelectedButton] = useState("All"); // Trạng thái nút được chọn, mặc định là "All"

  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

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

          {/* Popular Albums Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            Popular albums
          </H3>
          <FlatList
            data={albumItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={120} marginRight="$4">
                  <Image
                    source={{ uri: item.image }}
                    width={120}
                    height={120}
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

          {/* Popular Artists Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            Popular artists
          </H3>
          <FlatList
            data={artistItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack width={100} marginRight="$4" alignItems="center">
                  <Image
                    source={{ uri: item.image }}
                    width={100}
                    height={100}
                    borderRadius={50}
                  />
                  <Text
                    color="white"
                    fontWeight="bold"
                    marginTop="$2"
                    textAlign="center"
                  >
                    {item.title}
                  </Text>
                </YStack>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />

          {/* Recent Rotation Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            Your recent rotation
          </H3>
          <FlatList
            data={recentItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <XStack alignItems="center" paddingVertical="$2">
                  <Image
                    source={{ uri: item.image }}
                    width={50}
                    height={50}
                    borderRadius={2}
                  />
                  <YStack marginLeft="$3" flex={1}>
                    <Text color="white" fontWeight="bold">
                      {item.title}
                    </Text>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                      {item.artists}
                    </Text>
                  </YStack>
                  <Button
                    backgroundColor="white"
                    borderRadius={100}
                    width="$3"
                    height="$3"
                    padding={0}
                    icon={<Play size="$1" color="black" fill="black" />}
                  />
                </XStack>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />

          {/* Relaxation Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            Không báo thức + deadline, chỉ có nhạc và giường êm
          </H3>
          <FlatList
            data={relaxationItems}
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

          {/* New Releases Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            New releases for you
          </H3>
          <FlatList
            data={newReleasesItems}
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

          {/* Find Your Next Favorite Song Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            Find your next favorite song
          </H3>
          <FlatList
            data={newReleasesItems.slice(0, 3)}
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
                    Similar to {item.title}
                  </Text>
                  <Text color="rgba(255, 255, 255, 0.7)" fontSize="$3">
                    {item.artists}
                  </Text>
                </YStack>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />

          {/* Uniquely Yours Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            Uniquely yours
          </H3>
          <FlatList
            data={uniquelyYoursItems}
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
          {/* Podcast Section */}
          <H3 color="white" marginTop="$6" marginBottom="$3">
            Podcasts
          </H3>
          <FlatList
            data={podcastItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <YStack
                  backgroundColor="#1E1E1E"
                  padding="$4"
                  borderRadius="$4"
                  marginBottom="$5"
                  alignItems="center"
                >
                  <Image
                    source={{ uri: item.image }}
                    width={180}
                    height={180}
                    borderRadius={4}
                  />

                  <Text
                    color="white"
                    fontSize="$5"
                    fontWeight="bold"
                    textAlign="center"
                    marginTop="$3"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>

                  <Text
                    color="rgba(255,255,255,0.6)"
                    fontSize="$3"
                    marginTop="$1"
                    textAlign="center"
                  >
                    {item.artists}
                  </Text>

                  <Text
                    color="rgba(255,255,255,0.6)"
                    fontSize="$2"
                    marginTop="$1"
                    textAlign="center"
                  >
                    {item.date}
                  </Text>

                  <Text
                    color="rgba(255,255,255,0.7)"
                    fontSize="$2"
                    marginTop="$3"
                    numberOfLines={3}
                    textAlign="center"
                  >
                    {item.description}
                  </Text>

                  <XStack
                    marginTop="$4"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Button
                      backgroundColor="#333"
                      borderRadius={2}
                      paddingHorizontal="$3"
                    >
                      <Text color="white" fontSize="$2">
                        Preview episode
                      </Text>
                    </Button>
                    <XStack alignItems="center" space="$2">
                      <Text color="rgba(255,255,255,0.6)" fontSize="$2">
                        0:00
                      </Text>
                      <Text color="rgba(255,255,255,0.6)" fontSize="$2">
                        ──────
                      </Text>
                      <Text color="rgba(255,255,255,0.6)" fontSize="$2">
                        {item.date.split("·")[1]?.trim()}
                      </Text>
                    </XStack>
                  </XStack>
                </YStack>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
