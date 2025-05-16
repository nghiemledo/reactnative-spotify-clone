import { useCallback, useEffect, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions, TouchableOpacity } from "react-native";
import { YStack, XStack, Text, Button } from "tamagui";
import { Plus, Clock, QrCode } from "@tamagui/lucide-icons";

interface PlayingBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToPlaylist: () => void;
  onSleepTimer: () => void;
  onShowSpotifyCode: () => void;
}

const PlayingBottomSheet: React.FC<PlayingBottomSheetProps> = ({
  isOpen,
  onClose,
  onAddToPlaylist,
  onSleepTimer,
  onShowSpotifyCode,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;
  const snapPoints = ["30%"];

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={onClose}
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
    <BottomSheet
      ref={bottomSheetRef}
      index={isOpen ? 0 : -1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#1A1A1A" }}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      onChange={handleSheetChange}
      enablePanDownToClose={true}
    >
      <BottomSheetView
        style={{
          backgroundColor: "#1A1A1A",
          paddingHorizontal: 20,
          paddingTop: 20,
          height: screenHeight * 0.3,
        }}
      >
        <YStack gap="$4">
          <TouchableOpacity onPress={onAddToPlaylist}>
            <XStack items="center" gap="$3">
              <Plus size="$2" color="white" />
              <Text fontSize="$5" color="white">
                Add to Playlist
              </Text>
            </XStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSleepTimer}>
            <XStack items="center" gap="$3">
              <Clock size="$2" color="white" />
              <Text fontSize="$5" color="white">
                Sleep Timer
              </Text>
            </XStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={onShowSpotifyCode}>
            <XStack items="center" gap="$3">
              <QrCode size="$2" color="white" />
              <Text fontSize="$5" color="white">
                Show Spotify Code
              </Text>
            </XStack>
          </TouchableOpacity>
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default PlayingBottomSheet;
