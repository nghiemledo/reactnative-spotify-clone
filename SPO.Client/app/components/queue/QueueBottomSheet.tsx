import React, { useCallback, useEffect, useState, useRef } from "react";
import { XStack, Text, Button, Image, YStack } from "tamagui";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  Play,
  Pause,
  Menu,
  Shuffle,
  Repeat,
  Timer,
  Repeat1,
} from "@tamagui/lucide-icons";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import TimerBottomSheet from "./TimerBottomSheet";

interface QueueItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface QueueBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  playlistName: string;
  queueItems: QueueItem[];
  onDone: () => void;
  currentSongId: string | null;
  isPlaying: boolean;
  onTogglePlay: (songId: string) => void;
  onReorder: (newQueueItems: QueueItem[]) => void;
}

const QueueBottomSheet: React.FC<QueueBottomSheetProps> = ({
  isOpen,
  onClose,
  playlistName,
  queueItems,
  onDone,
  currentSongId,
  isPlaying,
  onTogglePlay,
  onReorder,
}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;
  const snapPoints = ["50%", "95%"];
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
  const originalQueueRef = useRef<QueueItem[]>([]);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one
  const [isTimerSheetOpen, setIsTimerSheetOpen] = useState(false);

  const handleRepeatPress = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  // Store the original queue when the bottom sheet opens
  useEffect(() => {
    if (isOpen) {
      originalQueueRef.current = [...queueItems];
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
      setIsShuffleEnabled(false);
      setIsTimerSheetOpen(false); // Close TimerBottomSheet when QueueBottomSheet closes
    }
  }, [isOpen, queueItems]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => {
          onClose();
          bottomSheetRef.current?.close();
        }}
      />
    ),
    [onClose]
  );

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  function fisherYatesShuffle(array: QueueItem[]) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const handleShuffle = () => {
    const wasEnabled = isShuffleEnabled;
    const newShuffleState = !wasEnabled;
    setIsShuffleEnabled(newShuffleState);

    if (newShuffleState) {
      const currentSong = queueItems.find((item) => item.id === currentSongId);
      const otherSongs = queueItems.filter((item) => item.id !== currentSongId);

      const shuffledOthers = fisherYatesShuffle(otherSongs);

      const newQueue = currentSong
        ? [currentSong, ...shuffledOthers]
        : shuffledOthers;

      onReorder(newQueue);
    } else {
      onReorder([...originalQueueRef.current]);
    }
  };

  // Handle timer selection
  const handleSelectTimer = (duration: number) => {
    console.log(`Timer set for ${duration} minutes`);
    onDone(); // Call onDone after selecting a timer
    setIsTimerSheetOpen(false); // Close TimerBottomSheet after selecting a timer
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={isOpen ? 1 : -1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#1A1A1A" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        onChange={handleSheetChange}
        enablePanDownToClose={true}
        animateOnMount={true}
      >
        <BottomSheetView
          style={{
            flex: 1,
            backgroundColor: "#1A1A1A",
            maxHeight: screenHeight * 0.95,
          }}
        >
          <YStack padding="$4" flex={1}>
            <Text
              color="white"
              fontSize={20}
              fontWeight="bold"
              textAlign="left"
              marginBottom="$4"
            >
              Queue
            </Text>
            <XStack
              justifyContent="flex-start"
              alignItems="center"
              marginBottom="$4"
            >
              <Text fontWeight={"300"} fontSize={16} color="white">
                Now playing:
              </Text>
              <Text fontSize={16} color="white">
                {playlistName || "My fourth playlist"}
              </Text>
            </XStack>

            <DraggableFlatList
              containerStyle={{ flex: 1 }}
              data={queueItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item, drag, isActive }) => {
                const isCurrentSong = item.id === currentSongId;

                return (
                  <ScaleDecorator>
                    <TouchableOpacity
                      onPress={() => {
                        onTogglePlay(item.id);
                      }}
                      disabled={isActive}
                    >
                      <XStack
                        alignItems="center"
                        justifyContent="space-between"
                        paddingVertical="$3"
                      >
                        <XStack alignItems="center" gap="$3" flex={1}>
                          <Image
                            source={{ uri: item.image }}
                            width={50}
                            height={50}
                            borderRadius={8}
                            defaultSource={{
                              uri: "https://via.placeholder.com/50",
                            }}
                            onError={(e) =>
                              console.log("Image load error:", e.nativeEvent)
                            }
                          />
                          <YStack flex={1}>
                            <Text
                              fontSize={15}
                              fontWeight="300"
                              color="white"
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              paddingRight={"$3"}
                            >
                              {item.title}
                            </Text>
                            <Text fontSize={13} color="white" opacity={0.7}>
                              {item.description}
                            </Text>
                          </YStack>
                        </XStack>
                        {isCurrentSong ? (
                          <Button
                            margin={0}
                            padding={0}
                            borderRadius={100}
                            width="$2"
                            height="$2"
                            icon={
                              isPlaying ? (
                                <Pause
                                  color="black"
                                  fill="black"
                                  strokeWidth={1}
                                />
                              ) : (
                                <Play
                                  color="black"
                                  fill="black"
                                  strokeWidth={1}
                                />
                              )
                            }
                            onPress={() => {
                              onTogglePlay(item.id);
                            }}
                          />
                        ) : (
                          <Button
                            margin={0}
                            padding={0}
                            width="$2"
                            height="$2"
                            backgroundColor="transparent"
                            icon={
                              <Menu color="white" size="$1" strokeWidth={2} />
                            }
                            onLongPress={drag}
                            onPress={() =>
                              console.log("Menu for song:", item.title)
                            }
                          />
                        )}
                      </XStack>
                    </TouchableOpacity>
                  </ScaleDecorator>
                );
              }}
              onDragEnd={({ data }) => {
                onReorder(data);
              }}
              scrollEnabled={true}
            />

            <XStack justifyContent="space-between" marginTop="$4" gap={"$2"}>
              <Button
                flex={1}
                size="$5"
                backgroundColor="gray"
                color="white"
                onPress={handleShuffle}
              >
                <YStack justifyContent="center" alignItems="center">
                  <Shuffle color={isShuffleEnabled ? "#1DB954" : "white"} />
                  <Text
                    fontSize={12}
                    color={isShuffleEnabled ? "#1DB954" : "white"}
                    textAlign="center"
                  >
                    Shuffle
                  </Text>
                </YStack>
              </Button>
              <Button
                flex={1}
                size="$5"
                backgroundColor="gray"
                onPress={handleRepeatPress}
              >
                <YStack justifyContent="center" alignItems="center">
                  {repeatMode === 2 ? (
                    <Repeat1 color="green" />
                  ) : (
                    <Repeat color={repeatMode === 1 ? "green" : "white"} />
                  )}
                  <Text
                    fontSize={12}
                    color={repeatMode === 0 ? "white" : "green"}
                    textAlign="center"
                  >
                    Repeat
                  </Text>
                </YStack>
              </Button>
              <Button
                flex={1}
                size="$5"
                backgroundColor="gray"
                color="white"
                onPress={() => {
                  console.log(
                    "Timer button pressed, setting isTimerSheetOpen to true"
                  );
                  setIsTimerSheetOpen(true); // Always open TimerBottomSheet
                }}
              >
                <YStack justifyContent="center" alignItems="center">
                  <Timer color={"white"} />
                  <Text fontSize={12} color="white" textAlign="center">
                    Timer
                  </Text>
                </YStack>
              </Button>
            </XStack>
          </YStack>
        </BottomSheetView>
      </BottomSheet>

      {/* Render TimerBottomSheet */}
      <TimerBottomSheet
        isOpen={isTimerSheetOpen}
        onClose={() => {
          console.log(
            "TimerBottomSheet onClose called, setting isTimerSheetOpen to false"
          );
          setIsTimerSheetOpen(false);
        }}
        onSelectTimer={handleSelectTimer}
      />
    </>
  );
};

export default QueueBottomSheet;
