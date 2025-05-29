import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { YStack, View, Input, H3, Text, XStack } from "tamagui";
import { MotiView } from "moti";
import {
  FlatList,
  View as RNView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Search } from "@tamagui/lucide-icons";
import { GreatPicks } from "./GreatPicks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useFollowArtistMutation, useFollowPodcastMutation } from "../../services/AuthService";
import { FollowArtistRequest } from "../../types/user";
import { useAppSelector } from "../../store";

type SelectionProps<T> = {
  data: T[];
  title: string;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "ArtistSelection" | "PodcastSelection">;
  renderItem: (
    item: T,
    index: number,
    selected: boolean,
    toggleSelection: (id: string) => void
  ) => JSX.Element;
  keyExtractor: (item: T) => string;
  getImage: (item: T) => string;
  isCircular?: boolean;
  type: "artist" | "podcast";
};

export const Selection = <T extends { id: string }>({
  data,
  title,
  navigation,
  route,
  renderItem,
  keyExtractor,
  getImage,
  isCircular = false,
  type,
}: SelectionProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    route.params?.selectedIds || []
  );
  const userId = useAppSelector((state) => state.auth.user?.id);

  const [followArtist, { isLoading: isFollowing, error: followError }] =
    useFollowArtistMutation();
    const [followPodcast, { isLoading: isPodcastFollowing, error: followPodcastError }] =
    useFollowPodcastMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDone = async () => {
    if (selectedItems.length === 0) {
      console.log("Please select at least one item.");
      setErrorMessage("Please select at least one artist.");
      return;
    }

    if (type === "artist") {
      if (!userId) {
        setErrorMessage("User ID is not available");
        return;
      }
      try {
        // Create an array of followArtist mutation promises
        const followArtistPromises = selectedItems.map((artistId) =>
          followArtist({
            ArtistId: artistId,
            UserId: userId,
          }).unwrap()
        )

        // Execute all follow requests concurrently using Promise.all
        await Promise.all(followArtistPromises);

        // If successful, show GreatPicks and navigate back
        setShowGreatPicks(true);
        console.log('Following artists completed');
        
      } catch (error) {
        console.error("Failed to follow artists:", error);
        setErrorMessage("Failed to follow artists. Please try again.");
      }
    } else if (type === "podcast") {
      if (!userId) {
        setErrorMessage("User ID is not available");
        return;
      }
      try {
        const followPodcastPromises = selectedItems.map((showId) =>
          followPodcast({
            ShowId: showId,
            UserId: userId,
          }).unwrap()
        );

        // Execute all follow requests concurrently using Promise.all
        await Promise.all(followPodcastPromises);

        // If successful, show GreatPicks and navigate back
        setShowGreatPicks(true);
        console.log('Following podcasts completed');
        
      } catch (error) {
        console.error("Failed to follow podcasts:", error);
        setErrorMessage("Failed to follow podcasts. Please try again.");
      }
    } else {
      setShowGreatPicks(true);
    }
  };

  const [showGreatPicks, setShowGreatPicks] = useState(false);

  useEffect(() => {
    if (showGreatPicks) {
      const timer = setTimeout(() => {
        navigation.goBack();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showGreatPicks, navigation]);

  useEffect(() => {
    if (route.params?.selectedIds?.length) {
      setSelectedItems((prev) => [
        ...new Set([...prev, ...(route.params.selectedIds || [])]),
      ]);
    }
  }, [route.params?.selectedIds]);

  const handleSearch = () => {
    navigation.navigate("SearchResult", {});
  };

  if (showGreatPicks) {
    const selectedData = data
      .filter((item) => selectedItems.includes(item.id))
      .slice(0, 10)
      .map((item) => ({ id: item.id, image: getImage(item) }));
    return <GreatPicks selectedItems={selectedData} isCircular={isCircular} />;
  }

  return (
    <LinearGradient colors={["#191414", "#000000"]} style={{ flex: 1 }}>
      <RNView
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 40,
          position: "relative",
        }}
      >
        <H3 fontWeight="bold" color="white" mb="$3">
          {title}
        </H3>
        {errorMessage && (
          <Text color="red" mb="$3">
            {errorMessage}
          </Text>
        )}
        <XStack
          bg="#fff"
          rounded="$4"
          items="center"
          mb="$4"
          px="$3"
          height={40}
        >
          <Pressable onPress={handleSearch}>
            <Search size={20} color="#888" />
          </Pressable>
          <Input
            flex={1}
            placeholder="Search"
            placeholderTextColor="#888"
            borderWidth={0}
            ml="$1"
            bg="transparent"
            onFocus={handleSearch}
          />
        </XStack>

        <FlatList
          data={data}
          renderItem={({ item, index }) =>
            renderItem(
              item,
              index,
              selectedItems.includes(item.id),
              toggleSelection
            )
          }
          keyExtractor={keyExtractor}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160 }}
        />

        <MotiView
          from={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <TouchableOpacity onPress={handleDone} disabled={isFollowing}>
            <Text
              p="$3"
              bg={isFollowing ? "#888" : "white"}
              color="#000" 
              fontWeight="bold"
              rounded={20}
              px="$5"
            >
              {isFollowing ? "Following..." : "Done"}
            </Text>
          </TouchableOpacity>
        </MotiView>
      </RNView>
    </LinearGradient>
  );
};
