import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { RootStackParamList } from "../types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardHeader,
  H5,
  Image,
  Input,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Camera, Search } from "@tamagui/lucide-icons";
import {
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";

const data = [
  { id: "1", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "2", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "3", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "4", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "5", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "6", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "7", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "8", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "9", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "10", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "11", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "12", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "13", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "14", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "15", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
  { id: "16", title: "Tiêu đề 1", image: "https://i.pravatar.cc/150?img=3" },
];

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Search"
>;

export default function SearchScreen({
  navigation,
}: {
  navigation: SearchScreenNavigationProp;
}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 160; // Adjusted header height

  const getRandomHSL = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <YStack flex={1} backgroundColor="#000" paddingHorizontal="$3">
      {/* Main scrollable content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: headerHeight }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } }}],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Browse all section */}
        <H5 fontWeight="bold" color="white" marginTop="$3">
          Browse all
        </H5>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View flex={1} maxWidth="50%" marginBottom="$3">
              <Card
                height="$9"
                overflow="hidden"
                backgroundColor={getRandomHSL()}
              >
                <CardHeader padded width="70%">
                  <Text fontSize="$5" color="white" fontWeight="bold">
                    {item.title}
                  </Text>
                </CardHeader>
                <Image
                  source={{ uri: item.image }}
                  width="$6"
                  height="$6"
                  position="absolute"
                  top={30}
                  right={-20}
                  transform={[{ rotate: "45deg" }]}
                  borderRadius={7}
                />
              </Card>
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          scrollEnabled={false}
        />
      </Animated.ScrollView>

      {/* Sticky header */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: "#000",
          paddingHorizontal: 12,
          paddingTop: 24,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, headerHeight],
                outputRange: [0, -headerHeight],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <XStack
          alignItems="center"
          justifyContent="space-between"
          marginTop="$5"
        >
          <XStack alignItems="center">
            <Avatar circular size="$3">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" />
              <AvatarFallback
                backgroundColor="$pink8"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontWeight="bold" color="black" fontSize="$5">
                  L
                </Text>
              </AvatarFallback>
            </Avatar>
            <Text
              fontWeight="bold"
              paddingHorizontal="$4"
              color="white"
              fontSize="$8"
            >
              Search
            </Text>
          </XStack>
          <TouchableOpacity>
            <Camera color="white" size="$1.5" />
          </TouchableOpacity>
        </XStack>

        {/* Search input */}
        <View
          width="100%"
          backgroundColor="white"
          borderRadius={7}
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="$1"
          paddingVertical="$1.5"
          marginVertical="$3"
        >
          <Input
            disabled
            size="$3.5"
            borderWidth={0}
            borderRadius="$2"
            backgroundColor="white"
            color="black"
            fontWeight="bold"
            placeholder="What do you want to listen to?"
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
            pointerEvents="none"
            flex={1}
            margin="auto"
            paddingLeft="$7"
          />
          <XStack
            position="absolute"
            left="$3"
            top="$3"
            alignItems="center"
            pointerEvents="none"
          >
            <Search size="$1" color="rgba(0, 0, 0, 0.7)" />
          </XStack>
        </View>
      </Animated.View>

      {/* Mini sticky search bar */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          backgroundColor: "#000",
          padding: 12,
          paddingTop: 12,
          opacity: scrollY.interpolate({
            inputRange: [headerHeight / 2, headerHeight],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, headerHeight],
                outputRange: [-60, 0],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View
          backgroundColor="white"
          borderRadius={7}
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="$1"
          paddingVertical="$1.5"
        >
          <Input
            disabled
            size="$3.5"
            borderWidth={0}
            borderRadius="$2"
            backgroundColor="white"
            color="black"
            fontWeight="bold"
            placeholder="What do you want to listen to?"
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
            pointerEvents="none"
            flex={1}
            margin="auto"
            paddingLeft="$7"
          />
          <XStack
            position="absolute"
            left="$3"
            top="$3"
            alignItems="center"
            pointerEvents="none"
          >
            <Search size="$1" color="rgba(0, 0, 0, 0.7)" />
          </XStack>
        </View>
      </Animated.View>
    </YStack>
  );
}