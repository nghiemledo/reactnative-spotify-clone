// CardDataList.tsx
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Image, Text, XStack, YStack } from "tamagui";

type Data = {
  id: number;
  type: string;
  name: string;
  image: string;
  artists?: { id: number; name: string }[];
};

type DataListProps = {
  data: Data[];
  onItemPress?: (item: Data) => void; 
};

const DataList = ({ data, onItemPress }: DataListProps) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onItemPress?.(item)}>
          <XStack items="center" justify="space-between" py="$2">
            <XStack items="center" gap="$3" flex={1} pr="$2">
              <Image
                source={{ uri: item.image }}
                width={50}
                height={50}
                borderRadius={item.type === "artist" ? "$10" : 8}
              />
              <YStack flex={1}>
                <Text fontSize={15} fontWeight="300" color="white">
                  {item.name}
                </Text>
                <Text
                  fontSize={12}
                  fontWeight="300"
                  color="rgba(255, 255, 255, 0.7)"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.type}
                  {item.artists
                    ? " • " + item.artists.map((artist) => artist.name).join(", ")
                    : ""}
                </Text>
              </YStack>
            </XStack>
          </XStack>
        </TouchableOpacity>
      )}
    />
  );
};

export default DataList;