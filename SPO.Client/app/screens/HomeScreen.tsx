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
import { YStack, XStack, Text, Button, Avatar } from "tamagui";
import { useGetSongsQuery } from "../services/SongService";
import { useGetAlbumsQuery } from "../services/AlbumService";
import { useGetArtistsQuery } from "../services/ArtistService";
import { Artist } from "../types/artist";
import Sidebar from "../components/Sidebar";

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

export default function HomeScreen() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [selectedButton, setSelectedButton] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarAnim = useRef(
    new Animated.Value(-Dimensions.get("window").width * 0.75)
  ).current;
  const {
    data: albums,
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useGetAlbumsQuery();

  const {
    data: artists,
    isLoading: isArtistsLoading,
    error: artistsError,
  } = useGetArtistsQuery();

  const {
    data: songs,
    isLoading: isSongsLoading,
    error: songsError,
  } = useGetSongsQuery();

  const handleButtonPress = (buttonName: string) => {
    // setSelectedButton(buttonName);
    // if (buttonName === "Podcasts") {
    //   setShowFollowing(true);
    //   Animated.timing(followingAnim, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }).start();
    // } else {
    //   Animated.timing(followingAnim, {
    //     toValue: -100,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }).start(() => setShowFollowing(false));
    // }
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
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.name || "Unknown Artist";
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
        {/* <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          navigation={navigation}
        /> */}
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

          {/* {showFollowing && (
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
          )} */}
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
          {/* <FlatList
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
          /> */}
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
