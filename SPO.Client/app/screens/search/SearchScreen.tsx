import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { SearchStackParamList } from "../../navigation/SearchNavigator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import PinnedHeader from "../../components/search/PinnedHeader"; 
import BrowseAll from "../../components/search/BrowseAll";

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
  SearchStackParamList,
  "Search"
>;

export default function SearchScreen({
  navigation,
}: {
  navigation: SearchScreenNavigationProp;
}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 160;

  const getRandomHSL = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <YStack flex={1} bg="#000" px="$3">
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: headerHeight }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } }}],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <BrowseAll data={data} getRandomHSL={getRandomHSL} />
      </Animated.ScrollView>

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
        <XStack items="center" justify="space-between" mt="$5">
          <XStack items="center">
            <Avatar circular size="$3">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" />
              <AvatarFallback
                bg="pink"
                flexDirection="row"
                justify="center"
                items="center"
              >
                <Text fontWeight="bold" color="black" fontSize="$5">
                  L
                </Text>
              </AvatarFallback>
            </Avatar>
            <Text fontWeight="bold" px="$4" color="white" fontSize="$8">
              Search
            </Text>
          </XStack>
          <TouchableOpacity>
            <Camera color="white" size="$1.5" />
          </TouchableOpacity>
        </XStack>

        <View
          width="100%"
          bg="white"
          rounded={7}
          flexDirection="row"
          items="center"
          px="$1"
          py="$1.5"
          my="$3"
          onPress={() => navigation.navigate({ name: "SearchResult", params: {} })}
        >
          <Input
            disabled
            size="$3.5"
            borderWidth={0}
            rounded="$2"
            bg="white"
            color="black"
            fontWeight="bold"
            placeholder="What do you want to listen to?"
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
            pointerEvents="none"
            flex={1}
            m="auto"
            pl="$7"
          />
          <XStack
            position="absolute"
            l="$3"
            t="$3"
            items="center"
            pointerEvents="none"
          >
            <Search size="$1" color="rgba(0, 0, 0, 0.7)" />
          </XStack>
        </View>
      </Animated.View>

      <PinnedHeader scrollY={scrollY} headerHeight={headerHeight} />
    </YStack>
  );
}