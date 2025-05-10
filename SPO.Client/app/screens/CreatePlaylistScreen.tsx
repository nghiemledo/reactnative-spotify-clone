import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { YStack, XStack, Text, Input, Button } from "tamagui";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { useDispatch } from "react-redux";

// Định nghĩa interface cho QueueItem
interface QueueItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const queueItems: QueueItem[] = [
  {
    id: "1",
    title: "Song breakdown: I WANT YOU",
    description: "The Interstellar Tennis Podcast",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "Accepting the song that blew you up",
    description: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "3",
    title: "Song breakdown: I WANT YOU",
    description: "The Interstellar Tennis Podcast",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "4",
    title: "Accepting the song that blew you up",
    description: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "5",
    title: "Song breakdown: I WANT YOU",
    description: "The Interstellar Tennis Podcast",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "6",
    title: "Accepting the song that blew you up",
    description: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "7",
    title: "Song breakdown: I WANT YOU",
    description: "The Interstellar Tennis Podcast",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "8",
    title: "Accepting the song that blew you up",
    description: "RAW talk",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

type QueueScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreatePlaylist"
>;

const CreatePlaylistScreen: React.FC<{
  navigation: QueueScreenNavigationProp;
}> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [playlistName, setPlaylistName] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  // Mở Bottom Sheet khi nhấn "Tạo"
  const handleCreate = () => {
    if (playlistName.trim()) {
      setIsSheetOpen(true);
    }
  };

  // Đóng Bottom Sheet
  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  // Xử lý khi nhấn "Xong" trong Bottom Sheet
  const handleDone = () => {
    setIsSheetOpen(false);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <LinearGradient
        flex={1}
        colors={["#D9F99D", "#000000"]}
        start={[0, 0]}
        end={[0, 1]}
      >
        <YStack
          flex={1}
          backgroundColor="transparent"
          padding="$4"
          justifyContent="center"
        >
          <StatusBar backgroundColor="transparent" barStyle="light-content" />

          <Text
            color="white"
            fontSize={24}
            fontWeight="bold"
            textAlign="center"
            marginBottom="$6"
          >
            Give your playlist a name
          </Text>
          <Input
            placeholder="MY PLAYLIST"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            color="white"
            fontSize={26}
            borderWidth={0}
            borderBottomWidth={1}
            backgroundColor="transparent"
            fontWeight="bold"
            textAlign="center"
            marginBottom="$8"
            height="$7"
            paddingBottom={0}
            value={playlistName}
            onChangeText={setPlaylistName}
          />

          <XStack justifyContent="center" space="$4">
            <Button
              size="$4"
              borderRadius="$10"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              color="white"
              width="$8"
              fontWeight="bold"
              borderColor="white"
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Button>
            <Button
              size="$4"
              borderRadius="$10"
              width="$8"
              backgroundColor="#1DB954"
              color="black"
              fontWeight="bold"
            >
              Create
            </Button>
          </XStack>
        </YStack>
      </LinearGradient>

      {/* Sử dụng QueueBottomSheet component */}
     
    </>
  );
};

export default CreatePlaylistScreen;