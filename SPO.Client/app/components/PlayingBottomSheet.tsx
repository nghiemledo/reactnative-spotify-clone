import { JSX, useRef } from "react";
import { YStack, XStack, Text } from "tamagui";
import { Plus, Clock, QrCode } from "@tamagui/lucide-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@tamagui/portal";

interface PlayingBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToPlaylist: () => void;
  onSleepTimer: () => void;
  onShowSpotifyCode: () => void;
}

const PlayingBottomSheet = ({
  isOpen,
  onClose,
  onAddToPlaylist,
  onSleepTimer,
  onShowSpotifyCode,
}: PlayingBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points for the BottomSheet
  const snapPoints = ["25%", "50%"];

  // Open or close the BottomSheet based on isOpen prop
  if (isOpen) {
    bottomSheetRef.current?.expand();
  } else {
    bottomSheetRef.current?.close();
  }

  const renderBottomSheetContent = () => (
    <YStack bg="$background" rounded="$5" p="$4" flex={1}>
      <Text fontSize="$6" fontWeight="600" color="$color" mb="$4">
        Options
      </Text>
      <YStack space="$3">
        <XStack
          items="center"
          space="$3"
          onPress={() => {
            onAddToPlaylist();
            onClose();
          }}
          pressStyle={{ opacity: 0.7 }}
        >
          <Plus size="$2" color="$color" />
          <Text fontSize="$5" color="$color">
            Add to Playlist
          </Text>
        </XStack>
        <XStack
          items="center"
          space="$3"
          onPress={() => {
            onSleepTimer();
            onClose();
          }}
          pressStyle={{ opacity: 0.7 }}
        >
          <Clock size="$2" color="$color" />
          <Text fontSize="$5" color="$color">
            Sleep Timer
          </Text>
        </XStack>
        <XStack
          items="center"
          space="$3"
          onPress={() => {
            onShowSpotifyCode();
            onClose();
          }}
          pressStyle={{ opacity: 0.7 }}
        >
          <QrCode size="$2" color="$color" />
          <Text fontSize="$5" color="$color">
            Show Spotify Code
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(props: JSX.IntrinsicAttributes) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
            onPress={onClose}
          />
        )}
        backgroundStyle={{ backgroundColor: "transparent" }}
        handleIndicatorStyle={{ backgroundColor: "$color" }}
        onClose={onClose}
      >
        {renderBottomSheetContent()}
      </BottomSheet>
    </Portal>
  );
};

export default PlayingBottomSheet;