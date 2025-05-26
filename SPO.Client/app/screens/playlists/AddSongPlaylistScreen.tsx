import { memo, useState } from "react";
import {
  YStack,
  XStack,
  Button,
  Text,
  View,
  Input,
  ScrollView,
  Image
} from "tamagui";
import { TouchableOpacity, StatusBar, FlatList } from "react-native";
import {
  ArrowLeft,
  CircleCheck,
  CirclePlus,
  Search,
} from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { H6 } from "tamagui";
import { useNavigation } from "@react-navigation/native";

const songs = [
  {
    id: 1,
    title: "Song breakdown: I WANT YOU",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: 2,
    title: "Accepting the song that blew you up",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: 3,
    title: "Song breakdown: I WANT YOU",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

const toastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <XStack style={{ flex: 1 }} justify="space-between">
        <Text fontSize="$3">{text1}</Text>
      </XStack>
    </View>
  ),
};

const AddSongPlaylistScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});
  const handlePress = (id: number) => {
    setLikedItems((prev) => {
      const isLiked = prev[id];
      if (!isLiked) {
        Toast.show({
          type: "success",
          text1: "Added to my playlist",
          position: "bottom",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
      return { ...prev, [id]: !isLiked };
    });
  };
  return (
    <YStack flex={1} bg="#111" px={24} pt={60}>
      <XStack
        position="absolute"
        t={-30}
        l={-10}
        r={0}
        height={80}
        items="center"
        px="$3"
        bg="#000"
        z={1000}
        pt={StatusBar.currentHeight || 20}
      >
        <XStack flex={1} justify="flex-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Button
              size="$8"
              chromeless
              icon={<ArrowLeft color="white" />}
              color="white"
              p={0}
              bg="transparent"
              pressStyle={{
                bg: "transparent",
                borderBlockColor: "transparent",
              }}
            />
          </TouchableOpacity>
        </XStack>

        <XStack flex={2} justify="center">
          <Text fontSize="$4" fontWeight="bold" color="white" text="center">
            Add to thist playlist
          </Text>
        </XStack>

        <XStack flex={1} />
      </XStack>
      <View>
        <XStack mt="$3" mb="$2">
          <Input
            size="$3.5"
            borderWidth={0}
            rounded="$2"
            bg="#333"
            color="white"
            placeholder="Search"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            flex={1}
            m="auto"
            style={{
              fontSize: 15,
              paddingLeft: 40,
              fontWeight: "bold",
            }}
            focusStyle={{
              borderWidth: 0,
              bg: "rgba(255, 255, 255, 0.3)",
            }}
          />
          <XStack
            position="absolute"
            l="$3"
            t="$2.5"
            items="center"
            pointerEvents="none"
          >
            <Search size="$1" color="rgba(255, 255, 255, 0.6)" />
          </XStack>
        </XStack>
      </View>
      <YStack bg={"#333"} rounded={8} p="$3" height="85%">
        <H6 color={"white"} fontWeight={"bold"} pb={"$2"}>
          Recently played
        </H6>
        <ScrollView scrollEventThrottle={16}>
          <FlatList
            data={songs}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <XStack items="center" justify="space-between" py="$2">
                  <XStack items="center" gap="$3" flex={1} pr="$2">
                    <Image
                      source={{ uri: item.image }}
                      width={50}
                      height={50}
                      borderRadius={8}
                    />
                    <YStack flex={1}>
                      <Text fontSize={15} fontWeight="300" color="white">
                        {item.title}
                      </Text>
                    </YStack>
                  </XStack>
                  <Button
                    bg="transparent"
                    p={0}
                    icon={
                      likedItems[item.id] ? (
                        <CircleCheck
                          size="$1"
                          color="white"
                          strokeWidth={1}
                          bg="#1DB954"
                          rounded="$10"
                          borderColor="#333"
                        />
                      ) : (
                        <CirclePlus size="$1" color="white" strokeWidth={1} />
                      )
                    }
                    pressStyle={{
                      bg: "transparent",
                      borderBlockColor: "transparent",
                    }}
                    onPress={() => handlePress(item.id)}
                  />
                </XStack>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </YStack>
      <Toast config={toastConfig} />
    </YStack>
  );
};

export default memo(AddSongPlaylistScreen);
