import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions, TouchableOpacity } from "react-native";
import { YStack, XStack, Text, Button } from "tamagui";
import { Plus, Clock, QrCode, X } from "@tamagui/lucide-icons";
import { useAppSelector } from "../store";
import {
  setSleepTimerAsync,
  cancelSleepTimer,
} from "../services/playerService";
import Toast from "react-native-toast-message";

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
  const snapPoints = ["30%", "50%"];
  const [showTimerOptions, setShowTimerOptions] = useState(false);
  const { sleepTimer } = useAppSelector((state) => state.player);

  // Tính thời gian còn lại của hẹn giờ (nếu có)
  const getTimeLeft = () => {
    if (!sleepTimer) return null;
    const timeLeftMs = sleepTimer - Date.now();
    if (timeLeftMs <= 0) return null;
    const minutes = Math.ceil(timeLeftMs / 60000);
    return `${minutes} phút`;
  };

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
      setShowTimerOptions(false); // Reset khi đóng
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
          height: showTimerOptions ? screenHeight * 0.5 : screenHeight * 0.3,
        }}
      >
        {showTimerOptions ? (
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
            <TouchableOpacity onPress={onAddToPlaylist}>
              <XStack items="center" gap="$3">
                <Plus size="$2" color="white" />
                <Text fontSize="$5" color="white">
                  Thêm vào Playlist
                </Text>
              </XStack>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onSleepTimer();
                setShowTimerOptions(true);
              }}
            >
              <XStack items="center" gap="$3">
                <Clock size="$2" color="white" />
                <Text fontSize="$5" color="white">
                  Hẹn giờ {sleepTimer ? `(${getTimeLeft()})` : ""}
                </Text>
              </XStack>
            </TouchableOpacity>

            <TouchableOpacity onPress={onShowSpotifyCode}>
              <XStack items="center" gap="$3">
                <QrCode size="$2" color="white" />
                <Text fontSize="$5" color="white">
                  Hiển thị mã Spotify
                </Text>
              </XStack>
            </TouchableOpacity>
          </YStack>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default PlayingBottomSheet;
