import React from "react";
import { Card, CardHeader, H5, Image, Text, View } from "tamagui";
import { FlatList } from "react-native";

interface Item {
  id: string;
  title: string;
  image: string;
}

interface BrowseAllProps {
  data: Item[];
  getRandomHSL: () => string;
}

export default function BrowseAll({ data, getRandomHSL }: BrowseAllProps) {
  return (
    <>
      <H5 fontWeight="bold" color="white" mt="$3">
        Browse all
      </H5>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View flex={1} maxW="50%" mb="$3">
            <Card
              height="$9"
              overflow="hidden"
              style={{ backgroundColor: getRandomHSL() }}
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
                t={30}
                r={-20}
                transform={[{ rotate: "45deg" }]}
                rounded={7}
              />
            </Card>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        scrollEnabled={false}
      />
    </>
  );
}