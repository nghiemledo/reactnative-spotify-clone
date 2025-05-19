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
  const [selectedItems, setSelectedItems] = useState<string[]>(route.params?.selectedIds || []);

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDone = () => {
    if (selectedItems.length === 0) {
      console.log("Please select at least one item.");
      return;
    }
    setShowGreatPicks(true);
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
    navigation.navigate("SearchScreen", { type, selectedIds: selectedItems });
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
            renderItem(item, index, selectedItems.includes(item.id), toggleSelection)
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
          <TouchableOpacity onPress={handleDone}>
            <Text
              p="$3"
              bg="white"
              color="#000"
              fontWeight="bold"
              rounded={20}
              px="$5"
            >
              Done
            </Text>
          </TouchableOpacity>
        </MotiView>
      </RNView>
    </LinearGradient>
  );
};