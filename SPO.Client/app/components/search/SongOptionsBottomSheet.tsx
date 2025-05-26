import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { YStack, XStack, Text, Image, View } from "tamagui";
import {
  Heart,
  CirclePlus,
  Target,
  User,
  Share2,
  Blinds,
  Radio,
  ListMusic,
  Barcode,
  FolderPlus,
  Trash2,
} from "@tamagui/lucide-icons";

interface Artist {
  id: number;
  name: string;
}

interface SongOptionsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
  songName: string;
  urlAvatar: string;
  type: string;
  artists: Artist[];
  context?: string;
}

const SongOptionsBottomSheet: React.FC<SongOptionsBottomSheetProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  songName,
  urlAvatar,
  type,
  artists,
  context,
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
                {songName}
              </Text>
              <Text
                fontSize={13}
                fontWeight="300"
                color="rgba(255, 255, 255, 0.7)"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {type} • {artists?.map((artist) => artist.name).join(", ")}
              </Text>
            </YStack>
          </XStack>
        </XStack>
        <YStack flex={1} gap="$2" mt="$2" px="$3" pb="$4">
          {context !== "detailPlaylist" && (
            <>
              <TouchableOpacity onPress={() => onSelectOption("addToLikedSongs")}>
                <XStack items="center" gap="$3" py="$2">
                  <Heart size="$1" color="white" />
                  <Text color="gray" fontSize={16}>
                    Add to Liked Songs
                  </Text>
                </XStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSelectOption("addToPlaylist")}>
                <XStack items="center" gap="$3" py="$2">
                  <CirclePlus size="$1" color="white" />
                  <Text color="gray" fontSize={16}>
                    Add to Playlist
                  </Text>
                </XStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSelectOption("addToQueue")}>
                <XStack items="center" gap="$3" py="$2">
                  <Blinds size="$1" color="white" />
                  <Text color="gray" fontSize={16}>
                    Add to Queue
                  </Text>
                </XStack>
              </TouchableOpacity>
            </>
          )}
          {context === "detailPlaylist" && (
            <>
              <TouchableOpacity onPress={() => onSelectOption("addToOtherPlaylist")}>
                <XStack items="center" gap="$3" py="$2">
                  <FolderPlus size="$1" color="white" />
                  <Text color="gray" fontSize={16}>
                    Add to Other Playlist
                  </Text>
                </XStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSelectOption("removeFromThisPlaylist")}>
                <XStack items="center" gap="$3" py="$2">
                  <Trash2 size="$1" color="white" />
                  <Text color="gray" fontSize={16}>
                    Remove from This Playlist
                  </Text>
                </XStack>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={() => onSelectOption("goToAlbum")}>
            <XStack items="center" gap="$3" py="$2">
              <Target size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                Go to Album
              </Text>
            </XStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("goToArtist")}>
            <XStack items="center" gap="$3" py="$2">
              <User size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                Go to Artist
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
          <TouchableOpacity onPress={() => onSelectOption("goToSongRadio")}>
            <XStack items="center" gap="$3" py="$2">
              <Radio size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                Go to Song Radio
              </Text>
            </XStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelectOption("viewSongCredits")}>
            <XStack items="center" gap="$3" py="$2">
              <ListMusic size="$1" color="white" />
              <Text color="gray" fontSize={16}>
                View Song Credits
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

export default SongOptionsBottomSheet;