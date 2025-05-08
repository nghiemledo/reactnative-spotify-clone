import React, { useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, Animated, StatusBar } from "react-native";
import { YStack, XStack, Text, Image, H3, Button, Avatar } from "tamagui";
import { Play } from "@tamagui/lucide-icons";

// Sample data for sections
const radioItems = [
  {
    id: "1",
    title: "Low G",
    artists: "tlinh, Low G, RPT MCK",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "Hà Anh Tuấn",
    artists: "Vũ., Emcee L (Da LAB)",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "3",
    title: "tlinh",
    artists: "tlinh, Wren",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

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
            )}
            scrollEnabled={false}
          />
        </YStack>
      </ScrollView>
    </YStack>
  );
}