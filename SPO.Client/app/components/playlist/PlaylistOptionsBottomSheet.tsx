import React, { useCallback, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { YStack, XStack, Text, Image } from "tamagui";
import {
  CirclePlus,
  Pen,
  Trash2,
  Share2,
  Barcode,
} from "@tamagui/lucide-icons";

interface PlaylistOptionsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
  playlistName: string;
  urlAvatar: string;
  creator: string;
}

const PlaylistOptionsBottomSheet: React.FC<PlaylistOptionsBottomSheetProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  playlistName,
  urlAvatar,
  creator,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["50%", "100%"];

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

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isOpen ? 1 : -1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#191414" }}
      handleIndicatorStyle={{ backgroundColor: "white", padding: 0 }}
      enablePanDownToClose={true}
      onChange={(index) => {
        if (index === -1) onClose();
      }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          zIndex: 9999,
          elevation: 9999,
        }}
      >
        <XStack
          items="center"
          gap="$3"
          pr="$2"
          borderWidth={1}
          borderBottomWidth={1}
          borderBottomColor="gray"
        >
          <XStack p="$3" gap="$3">
            <Image
              source={{ uri: urlAvatar }}
              width={50}
              height={50}
              borderRadius={8}
            />
            <YStack flex={1}>
              <Text fontSize={15} fontWeight="300" color="white">
                {playlistName}
              </Text>
              <Text
                fontSize={13}
                fontWeight="300"
                color="rgba(255, 255, 255, 0.7)"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Playlist • by {creator}
              </Text>
            </YStack>
          </XStack>
        </XStack>
        <YStack flex={1} gap="$2" mt="$2" px="$3" pb="$4">
          <TouchableOpacity onPress={() => onSelectOption("addToThisPlaylist")}>
            <XStack items="center" gap="$3" py="$2">
              <CirclePlus size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                Add to This Playlist
              </Text>
            </XStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("editPlaylist")}>
            <XStack items="center" gap="$3" py="$2">
              <Pen size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                Edit Playlist
              </Text>
            </XStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("deletePlaylist")}>
            <XStack items="center" gap="$3" py="$2">
              <Trash2 size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                Delete Playlist
              </Text>
            </XStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("share")}>
            <XStack items="center" gap="$3" py="$2">
              <Share2 size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                Share
              </Text>
            </XStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("showSpotifyCode")}>
            <XStack items="center" gap="$3" py="$2">
              <Barcode size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                Show Spotify Code
              </Text>
            </XStack>
          </TouchableOpacity>
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default PlaylistOptionsBottomSheet;