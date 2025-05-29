import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions, TouchableOpacity, Alert } from "react-native";
import { YStack, XStack, Text, Button } from "tamagui";
import {
  Plus,
  ListPlus,
  QrCode,
  CircleDot,
  User,
  Clock,
  X,
  Heart,
  Share2,
  Radio,
  FileText,
} from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Song } from "../../types/song";
import { RootStackParamList } from "../../navigation/AppNavigator";
import SafeImage from "../SafeImage";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../../store";
import {
  addTrackToQ,
  cancelSleepTimer,
  setSleepTimerAsync,
} from "../../services/playerService";

interface Feature {
  key: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  visibleOnScreens: string[];
}

interface SongWithPlaylist extends Song {
  playlistItemId?: string;
  playlistId?: string;
}

interface SongBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSong: SongWithPlaylist | null;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
  screenType?: "home" | "artist" | "album" | "playing" | "detailPlaylist" | "search";
  sortedItems?: SongWithPlaylist[];
  setSortedItems?: (items: SongWithPlaylist[]) => void;
  deletePlaylistItem?: (id: string) => Promise<void>;
}

const SongBottomSheet: React.FC<SongBottomSheetProps> = ({
  isOpen,
  onClose,
  selectedSong,
  navigation,
  screenType = "home",
  sortedItems,
  setSortedItems,
  deletePlaylistItem,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;
  const [showTimerOptions, setShowTimerOptions] = useState(false);
  const { sleepTimer } = useAppSelector((state: { player: any }) => state.player);

  const snapPoints = ["80%"];
  const sheetHeight =
    screenType === "home" || showTimerOptions
      ? screenHeight * 0.35
      : screenHeight * 0.3;

  // Calculate remaining time for sleep timer
  const getTimeLeft = () => {
    if (!sleepTimer) return null;
    const timeLeftMs = sleepTimer - Date.now();
    if (timeLeftMs <= 0) return null;
    const minutes = Math.ceil(timeLeftMs / 60000);
    return `${minutes} phút`;
  };

  // Handle actions within the component
  const handleAddToPlaylist = () => {
    if (selectedSong) {
      if (!navigation) {
        Alert.alert("Error", "Navigation is not available");
        return;
      }
      navigation.navigate("AddToPlaylist", { songId: selectedSong.id || "" });
      onClose();
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  const handleAddToOtherPlaylist = () => {
    if (selectedSong) {
      if (!navigation) {
        Alert.alert("Error", "Navigation is not available");
        return;
      }
      console.log(`Add ${selectedSong.title} to another playlist`);
      navigation.navigate("AddToPlaylist", {
        songId: selectedSong.id,
        currentPlaylistId: selectedSong.playlistId,
      });
      onClose();
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  const handleAddToQueue = async () => {
    if (!selectedSong || !selectedSong.audioUrl || !selectedSong.title) {
      Toast.show({
        type: "error",
        text1: "Dữ liệu bài hát không hợp lệ",
        position: "bottom",
      });
      return;
    }

    try {
      const track = {
        id: selectedSong.id || `song-${selectedSong.title}`,
        url: selectedSong.audioUrl,
        title: selectedSong.title,
        artist: selectedSong.artistId || "Unknown Artist",
        artwork: selectedSong.coverImage,
        duration: selectedSong.duration || 0,
      };

      await addTrackToQ(track);
      console.log(`Add ${selectedSong.title} to queue`);
      Toast.show({
        type: "success",
        text1: `Added "${track.title}" to queue`,
        position: "bottom",
      });
      onClose();
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Failed to add song to queue",
        position: "bottom",
      });
    }
  };

  const handleShowSpotifyCode = () => {
    if (selectedSong) {
      if (!navigation) {
        Alert.alert("Error", "Navigation is not available");
        return;
      }
      navigation.navigate("shareQrSong", { song: selectedSong });
      onClose();
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
      onClose();
    } else {
      console.log("No album information available");
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
      onClose();
    } else {
      console.log("No artist information available");
      Alert.alert("Error", "No artist information available");
    }
  };

  const handleShare = () => {
    if (selectedSong) {
      console.log(`Share ${selectedSong.title}`);
      Toast.show({
        type: "success",
        text1: `Shared "${selectedSong.title}"`,
        position: "bottom",
      });
      onClose();
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  const handleGoToSongRadio = () => {
    if (selectedSong) {
      console.log(`Go to song radio for ${selectedSong.title}`);
      Toast.show({
        type: "info",
        text1: `Navigating to song radio for "${selectedSong.title}"`,
        position: "bottom",
      });
      onClose();
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  const handleViewSongCredits = () => {
    if (selectedSong) {
      console.log(`View credits for ${selectedSong.title}`);
      Toast.show({
        type: "info",
        text1: `Viewing credits for "${selectedSong.title}"`,
        position: "bottom",
      });
      onClose();
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  const handleSetTimer = (minutes: number) => {
    setSleepTimerAsync(minutes);
    setShowTimerOptions(false);
    Toast.show({
      type: "success",
      text1: `Hẹn giờ đã được đặt cho ${minutes} phút`,
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const handleCancelTimer = () => {
    cancelSleepTimer();
    setShowTimerOptions(false);
    Toast.show({
      type: "success",
      text1: "Hẹn giờ đã bị hủy",
      position: "bottom",
      visibilityTime: 2000,
    });
  };

  const handleRemoveFromPlaylist = async () => {
    if (!selectedSong) {
      Alert.alert("Error", "No song selected");
      return;
    }

    if (sortedItems && setSortedItems) {
      setSortedItems(sortedItems.filter((item) => item.id !== selectedSong.id));
    }

    if (selectedSong.playlistItemId && deletePlaylistItem) {
      try {
        await deletePlaylistItem(selectedSong.playlistItemId);
        Toast.show({
          type: "success",
          text1: `Removed "${selectedSong.title}" from playlist`,
          position: "bottom",
        });
      } catch (error) {
        console.error("Error removing song from playlist:", error);
        Toast.show({
          type: "error",
          text1: "Failed to remove song from playlist",
          position: "bottom",
        });
      }
    }

    onClose();
  };

  const handleAddToLikedSongs = () => {
    if (selectedSong) {
      Toast.show({
        type: "success",
        text1: "Added to liked songs",
        position: "bottom",
        visibilityTime: 2000,
      });
      onClose();
    } else {
      Alert.alert("Error", "No song selected");
    }
  };

  // Configure features
  const featureConfig: Feature[] = [
    {
      key: "addToLikedSongs",
      label: "Add to Liked Songs",
      icon: <Heart size="$2" color="white" />,
      action: handleAddToLikedSongs,
      visibleOnScreens: ["search"],
    },
    {
      key: "addToPlaylist",
      label: "Add to Playlist",
      icon: <Plus size="$2" color="white" />,
      action: handleAddToPlaylist,
      visibleOnScreens: ["home", "artist", "album", "playing", "detailPlaylist", "search"],
    },
    {
      key: "addToOtherPlaylist",
      label: "Add to Other Playlist",
      icon: <Plus size="$2" color="white" />,
      action: handleAddToOtherPlaylist,
      visibleOnScreens: ["detailPlaylist"],
    },
    {
      key: "addToQueue",
      label: "Add to Queue",
      icon: <ListPlus size="$2" color="white" />,
      action: handleAddToQueue,
      visibleOnScreens: ["home", "artist", "album", "detailPlaylist", "search"],
    },
    {
      key: "goToAlbum",
      label: "Go to Album",
      icon: <CircleDot size="$2" color="white" />,
      action: handleGoToAlbum,
      visibleOnScreens: ["home", "artist", "detailPlaylist"],
    },
    {
      key: "goToArtist",
      label: "Go to Artist",
      icon: <User size="$2" color="white" />,
      action: handleGoToArtist,
      visibleOnScreens: ["home", "album", "detailPlaylist", "search"],
    },
    {
      key: "showSpotifyCode",
      label: "Show Spotify Code",
      icon: <QrCode size="$2" color="white" />,
      action: handleShowSpotifyCode,
      visibleOnScreens: ["home", "artist", "album", "playing", "detailPlaylist", "search"],
    },
    {
      key: "share",
      label: "Share",
      icon: <Share2 size="$2" color="white" />,
      action: handleShare,
      visibleOnScreens: ["detailPlaylist"],
    },
    {
      key: "goToSongRadio",
      label: "Go to Song Radio",
      icon: <Radio size="$2" color="white" />,
      action: handleGoToSongRadio,
      visibleOnScreens: ["detailPlaylist"],
    },
    {
      key: "viewSongCredits",
      label: "View Song Credits",
      icon: <FileText size="$2" color="white" />,
      action: handleViewSongCredits,
      visibleOnScreens: ["detailPlaylist"],
    },
    {
      key: "removeFromThisPlaylist",
      label: "Remove from This Playlist",
      icon: <X size="$2" color="red" />,
      action: handleRemoveFromPlaylist,
      visibleOnScreens: ["detailPlaylist"],
    },
    {
      key: "setTimer",
      label: `Hẹn giờ ${sleepTimer ? `(${getTimeLeft()})` : ""}`,
      icon: <Clock size="$2" color="white" />,
      action: () => setShowTimerOptions(true),
      visibleOnScreens: ["playing"],
    },
  ];

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
      setShowTimerOptions(false);
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
        setShowTimerOptions(false);
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
        {showTimerOptions && screenType === "playing" ? (
          <YStack gap="$4">
            <XStack justify="space-between" items="center">
              <Text fontSize="$6" color="white" fontWeight="600">
                Chọn thời gian hẹn giờ
              </Text>
              <Button
                icon={<X size="$2" color="white" />}
                bg="transparent"
                onPress={() => setShowTimerOptions(false)}
              />
            </XStack>
            {[5, 15, 30, 45, 60].map((minutes) => (
              <TouchableOpacity
                key={minutes}
                onPress={() => handleSetTimer(minutes)}
              >
                <XStack items="center" gap="$3">
                  <Clock size="$2" color="white" />
                  <Text fontSize="$5" color="white">
                    {minutes} phút
                  </Text>
                </XStack>
              </TouchableOpacity>
            ))}
            {sleepTimer && (
              <TouchableOpacity onPress={handleCancelTimer}>
                <XStack items="center" gap="$3">
                  <X size="$2" color="red" />
                  <Text fontSize="$5" color="red">
                    Hủy hẹn giờ
                  </Text>
                </XStack>
              </TouchableOpacity>
            )}
          </YStack>
        ) : (
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
                  <SafeImage
                    uri={selectedSong.coverImage}
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
                    <Text
                      fontSize="$5"
                      color={feature.key === "removeFromThisPlaylist" ? "red" : "white"}
                    >
                      {feature.label}
                    </Text>
                  </XStack>
                </TouchableOpacity>
              ))}
          </YStack>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SongBottomSheet;