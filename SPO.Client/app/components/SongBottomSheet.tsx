import { useCallback, useEffect, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions, TouchableOpacity } from "react-native";
import { YStack, XStack, Text } from "tamagui";
import { Plus, ListPlus, QrCode, CircleDot, User } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/HomeNavigator";
import { Song } from "../types/song";

interface SongBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToOtherPlaylist: () => void;
  onAddToQueue: () => void;
  onShowSpotifyCode: () => void;
  onGoToAlbum: () => void;
  onGoToArtist: () => void;
  selectedSong: Song | null;
  navigation: NativeStackNavigationProp<HomeStackParamList>;
  screenType: "home" | "artist" | "album";
}

const SongBottomSheet: React.FC<SongBottomSheetProps> = ({
  isOpen,
  onClose,
  onAddToOtherPlaylist,
  onAddToQueue,
  onShowSpotifyCode,
  onGoToAlbum,
  onGoToArtist,
  selectedSong,
  navigation,
  screenType,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;

  const snapPoints = screenType === "home" ? ["50%"] : ["40%"];
  const sheetHeight = screenType === "home" ? screenHeight * 0.35 : screenHeight * 0.3;

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
      style={{ zIndex: 1000 }}
    >
      <BottomSheetView
        style={{
          backgroundColor: "#1A1A1A",
          paddingHorizontal: 20,
          paddingTop: 20,
          height: sheetHeight,
        }}
      >
        <YStack gap="$4">
          <TouchableOpacity onPress={onAddToOtherPlaylist}>
            <XStack items="center" gap="$3">
              <Plus size="$2" color="white" />
              <Text fontSize="$5" color="white">
                Add to Playlist
              </Text>
            </XStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={onAddToQueue}>
            <XStack items="center" gap="$3">
              <ListPlus size="$2" color="white" />
              <Text fontSize="$5" color="white">
                Add to Queue
              </Text>
            </XStack>
          </TouchableOpacity>

          {screenType !== "album" && (
            <TouchableOpacity onPress={onGoToAlbum}>
              <XStack items="center" gap="$3">
                <CircleDot size="$2" color="white" />
                <Text fontSize="$5" color="white">
                  Go to Album
                </Text>
              </XStack>
            </TouchableOpacity>
          )}

          {screenType !== "artist" && (
            <TouchableOpacity onPress={onGoToArtist}>
              <XStack items="center" gap="$3">
                <User size="$2" color="white" />
                <Text fontSize="$5" color="white">
                  Go to Artist
                </Text>
              </XStack>
            </TouchableOpacity>
          )}
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

export default SongBottomSheet;