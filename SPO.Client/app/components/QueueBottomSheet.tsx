import React, { useCallback } from "react";
import { Text, YStack } from "tamagui";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions } from "react-native";
import { useAppSelector } from "../store";
import { SongItem } from "./SongItem";
import { Track } from "react-native-track-player";

interface QueueBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const QueueBottomSheet: React.FC<QueueBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;
  const snapPoints = ["50%", "95%"];
  const { queue } = useAppSelector((state) => state.player);
  const newQueue = queue.map((item: Track) => ({
    id: item.id,
    title: item.title,
    coverImage:
      typeof item.artwork === "string"
        ? item.artwork
        : "https://via.placeholder.com/150",
    duration: item.duration,
    audioUrl: typeof item.url === "string" ? item.url : String(item.url),
    artist: item.artist,
    genreId: undefined,
    counter: undefined,
    artistId: undefined,
    albumId: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  }));

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
          <YStack p="$4" flex={1}>
            <Text
              color="white"
              fontSize={20}
              fontWeight="bold"
              text="left"
              mb="$4"
            >
              Queue
            </Text>
            {newQueue.map((item, index) => (
              <SongItem
                key={item.id}
                song={item}
                showImage={true}
                onMorePress={() => {
                  console.log("More options pressed for song:", item.title);
                  // Handle more options logic here
                }}
              />
            ))}
          </YStack>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default QueueBottomSheet;
