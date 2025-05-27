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
  Spinner,
  H5,
} from "tamagui";
import { Camera, Search } from "@tamagui/lucide-icons";
import { FlatList, Animated, TouchableOpacity } from "react-native";
import PinnedHeader from "../../components/search/PinnedHeader";
import BrowseAll from "../../components/search/BrowseAll";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { useGetGenresQuery } from "../../services/GenreService";

export default function SearchScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 160;
  const navigation =
    useNavigation<NativeStackNavigationProp<SearchStackParamList>>();

  const {
    data: genreData,
    isLoading: isGenreLoading,
    error: genreError,
  } = useGetGenresQuery();

  const getRandomHSL = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
  };

  if (isGenreLoading) {
    return (
      <YStack flex={1} bg="#000" justify="center" items="center">
        <Spinner size="large" color="white" />
        <Text color="white" mt="$2">
          Loading genres...
        </Text>
      </YStack>
    );
  }

  if (genreError) {
    return (
      <YStack flex={1} bg="#000" justify="center" items="center" px="$4">
        <Text color="red" fontSize="$5" text="center">
          Error loading genres. Please try again.
        </Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="#000" px="$3">
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: headerHeight }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <H5 fontWeight="bold" color="white" my="$3">
          Browse all
        </H5>
        <BrowseAll data={genreData?.data ?? []} getRandomHSL={getRandomHSL} />
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
          <TouchableOpacity onPress={() => navigation.navigate("ScanScreen")}>
          {/* <TouchableOpacity> */}
            <Camera color="white" size="$1.5" />
          </TouchableOpacity>
        </XStack>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate({ name: "SearchResult", params: {} })
          }
        >
          <View
            width="100%"
            bg="white"
            rounded={7}
            flexDirection="row"
            items="center"
            px="$1"
            py="$1.5"
            my="$3"
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
        </TouchableOpacity>
      </Animated.View>

      <PinnedHeader scrollY={scrollY} headerHeight={headerHeight} />
    </YStack>
  );
}
