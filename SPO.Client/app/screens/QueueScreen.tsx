import React, { useState } from "react";
import { YStack, Button, Text } from "tamagui";
import QueueBottomSheet from "../components/queue/QueueBottomSheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

// Định nghĩa interface QueueItem
interface QueueItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const initialQueueItems: QueueItem[] = [
  {
    id: "1",
    title: "Song breakdown: I WANT YOU",
    description: "Artist 3",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "2",
    title: "Accepting the song that blew you up",
    description: "Artist 3",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
  {
    id: "3",
    title: "Song breakdown: I WANT YOU",
    description: "Artist 3",
    image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  },
];

const QueueScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<string | null>("1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueItems, setQueueItems] = useState<QueueItem[]>(initialQueueItems);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleDone = () => {
    setIsBottomSheetOpen(false);
  };

  const handleTogglePlay = (songId: string) => {
    if (currentSongId === songId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongId(songId);
      setIsPlaying(true);
    }
  };

  const handleReorder = (newQueueItems: QueueItem[]) => {
    setQueueItems(newQueueItems);
  };

  return (
    <YStack flex={1} items="center" justify="center" p="$4">
      <Text fontSize={20} fontWeight="bold" mb="$4">
        Queue Screen
      </Text>
      <Button
        size="$4"
        bg="#1DB954"
        color="black"
        onPress={handleOpenBottomSheet}
      >
        Open Queue
      </Button>

      <QueueBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        playlistName="My Playlist"
        queueItems={queueItems}
        onDone={handleDone}
        currentSongId={currentSongId}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onReorder={handleReorder}
      />
    </YStack>
  );
};

export default QueueScreen;
