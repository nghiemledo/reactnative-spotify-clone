import { useCallback, useEffect, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions, TouchableOpacity, Alert, Image } from "react-native";
import { YStack, XStack, Text } from "tamagui";
import { Plus, ListPlus, QrCode, CircleDot, User } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Song } from "../types/song";
import { AnyStackParamList } from "../navigation/AnyStackParamList";
import { RootStackParamList } from "../navigation/AppNavigator";

interface Feature {
  key: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  visibleOnScreens: string[];
}
interface SongBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSong: Song | null;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
  screenType?: "home" | "artist" | "album";
}

const SongBottomSheet: React.FC<SongBottomSheetProps> = ({
  isOpen,
  onClose,
  selectedSong,
  navigation,
  screenType = "home",
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;

  const snapPoints = ["80%"];
  const sheetHeight =
    screenType === "home" ? screenHeight * 0.35 : screenHeight * 0.3;

  // Xử lý các hành động bên trong component
  const handleAddToPlaylist = () => {
    if (selectedSong) {
      Alert.alert("Success", `Added "${selectedSong.title}" to playlist`);
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  const handleAddToQueue = () => {
    if (selectedSong) {
      Alert.alert("Success", `Added "${selectedSong.title}" to queue`);
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  const handleShowSpotifyCode = () => {
    if (selectedSong) {
      Alert.alert(
        "Spotify Code",
        `Showing Spotify code for "${selectedSong.title}"`
      );
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  const handleGoToAlbum = () => {
    if (!navigation) {
      Alert.alert("Error", "Navigation is not available");
      return;
    }
    if (selectedSong?.albumId) {
      navigation.navigate("Album", { id: selectedSong.albumId });
    } else {
      Alert.alert("Error", "No album information available");
    }
  };

  const handleGoToArtist = () => {
    if (!navigation) {
      Alert.alert("Error", "Navigation is not available");
      return;
    }
    if (selectedSong?.artistId) {
      navigation.navigate("Artist", { id: selectedSong.artistId });
    } else {
      Alert.alert("Error", "No artist information available");
    }
  };

  // Cấu hình các chức năng
  const featureConfig: Feature[] = [
    {
      key: "addToPlaylist",
      label: "Add to Playlist",
      icon: <Plus size="$2" color="white" />,
      action: handleAddToPlaylist,
      visibleOnScreens: ["home", "artist", "album"],
    },
    {
      key: "addToQueue",
      label: "Add to Queue",
      icon: <ListPlus size="$2" color="white" />,
      action: handleAddToQueue,
      visibleOnScreens: ["home", "artist", "album"],
    },
    {
      key: "goToAlbum",
      label: "Go to Album",
      icon: <CircleDot size="$2" color="white" />,
      action: handleGoToAlbum,
      visibleOnScreens: ["home", "artist"],
    },
    {
      key: "goToArtist",
      label: "Go to Artist",
      icon: <User size="$2" color="white" />,
      action: handleGoToArtist,
      visibleOnScreens: ["home", "album"],
    },
    {
      key: "showSpotifyCode",
      label: "Show Spotify Code",
      icon: <QrCode size="$2" color="white" />,
      action: handleShowSpotifyCode,
      visibleOnScreens: ["home", "artist", "album"],
    },
  ];

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
      style={{ zIndex: 2000 }}
    >
      <BottomSheetView
        style={{
          backgroundColor: "#1A1A1A",
          paddingHorizontal: 16,
          height: sheetHeight,
        }}
      >
        <YStack gap="$4">
          {selectedSong && (
            <XStack
              items="center"
              gap="$3"
              pr="$2"
              borderBottomWidth={1}
              borderBottomColor="gray"
            >
              <XStack p="$3" gap="$3">
                <Image
                  source={{
                    uri:
                      selectedSong.coverImage ||
                      "https://via.placeholder.com/50",
                  }}
                  width={50}
                  height={50}
                  borderRadius={8}
                />
                <YStack flex={1}>
                  <Text fontSize={15} fontWeight="300" color="white">
                    {selectedSong.title || "Unknown Title"}
                  </Text>
                  <Text
                    fontSize={13}
                    fontWeight="300"
                    color="rgba(255, 255, 255, 0.7)"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Song • by {selectedSong.artist || "Unknown Artist"}
                  </Text>
                </YStack>
              </XStack>
            </XStack>
          )}
          {featureConfig
            .filter((feature) => feature.visibleOnScreens.includes(screenType))
            .map((feature) => (
              <TouchableOpacity key={feature.key} onPress={feature.action}>
                <XStack items="center" gap="$3">
                  {feature.icon}
                  <Text fontSize="$5" color="white">
                    {feature.label}
                  </Text>
                </XStack>
              </TouchableOpacity>
            ))}
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SongBottomSheet;
