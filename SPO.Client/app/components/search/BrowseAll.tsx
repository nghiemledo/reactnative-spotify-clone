import React from "react";
import { Card, CardHeader, H5, Image, Text, View } from "tamagui";
import { FlatList, TouchableOpacity } from "react-native";
import { Genre } from "../../types/genre";
import SafeImage from "../SafeImage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchStackParamList } from "../../navigation/SearchNavigator";

// interface Item {
//   id: string;
//   title: string;
//   image: string;
// }

interface BrowseAllProps {
  data: Genre[];
  getRandomHSL: () => string;
}
export default function BrowseAll({ data, getRandomHSL }: BrowseAllProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<SearchStackParamList>>();
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View flex={1} maxW="50%" mb="$3">
            <TouchableOpacity
              onPress={() => navigation.navigate("Genre", { genreId: item.id })}
            >
              <Card
                height="$9"
                overflow="hidden"
                style={{ backgroundColor: getRandomHSL() }}
              >
                <CardHeader padded width="70%">
                  <Text fontSize="$5" color="white" fontWeight="bold">
                    {item.name}
                  </Text>
                </CardHeader>
                {/* <Image
                  source={{ uri: item?.image }}
                  width="$6"
                  height="$6"
                  position="absolute"
                  t={30}
                  r={-20}
                  transform={[{ rotate: "45deg" }]}
                  rounded={7}
                /> */}
                <SafeImage
                  uri={item?.image}
                  width="$6"
                  height="$6"
                  position="absolute"
                  t={30}
                  r={-20}
                  transform={[{ rotate: "45deg" }]}
                  rounded={7}
                />
              </Card>
            </TouchableOpacity>
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
