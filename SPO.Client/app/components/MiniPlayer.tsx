import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAppSelector } from "../store";
import { Play, Pause } from "@tamagui/lucide-icons";
import { YStack, XStack, Text, Image, Button } from "tamagui";
import TrackPlayer, { useProgress } from "react-native-track-player";
import Toast from "react-native-toast-message";
import { MotiView, AnimatePresence } from "moti";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MiniPlayer() {
  const navigation = useNavigation<NavigationProp>();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const { position, duration } = useProgress(1000); // Cập nhật mỗi 1s

  // Tính phần trăm tiến độ
  const progress = duration ? (position / duration) * 100 : 0;

  // Hàm xử lý play/pause
  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (error) {
      console.error("Lỗi khi điều khiển phát nhạc:", error);
      Toast.show({
        type: "error",
        text1: "Không thể điều khiển phát nhạc",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  // Nếu không có bài hát đang phát, không hiển thị MiniPlayer
  if (!currentTrack) {
    return null;
  }

  return (
    <AnimatePresence>
      {currentTrack && (
        <MotiView
          from={{
            translateY: 60,
            opacity: 0,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
          }}
          exit={{
            translateY: 60,
            opacity: 0,
          }}
          transition={{
            type: "timing",
            duration: 300,
          }}
          style={{
            backgroundColor: "#18181b",
            height: 60,
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderTopColor: "#27272a",
          }}
        >
          <XStack flex={1} items="center" px="$4">
            {/* Khu vực nhấn để điều hướng */}
            <XStack
              flex={1}
              items="center"
              onPress={() => navigation.navigate("Playing")}
            >
              {/* Ảnh bìa với hiệu ứng khi đang chơi */}
              <MotiView
                animate={{
                  scale: isPlaying ? 1 : 0.95,
                  opacity: isPlaying ? 1 : 0.8,
                }}
                transition={{
                  type: "spring",
                  damping: 20,
                  loop: isPlaying, // Lặp hiệu ứng khi đang chơi
                }}
              >
                <Image
                  source={{
                    uri:
                      currentTrack.artwork || "https://via.placeholder.com/48",
                  }}
                  width={48}
                  height={48}
                  borderRadius="$2"
                />
              </MotiView>

              {/* Thông tin bài hát */}
              <YStack flex={1} ml="$3">
                <Text
                  fontSize="$5"
                  fontWeight="bold"
                  color="#fff"
                  numberOfLines={1}
                >
                  {currentTrack.title || "Không có tiêu đề"}
                </Text>
                <Text fontSize="$4" color="#aaa" numberOfLines={1}>
                  {currentTrack.artist || "Nghệ sĩ không xác định"}
                </Text>
              </YStack>
            </XStack>

            {/* Nút Play/Pause */}
            <MotiView
              animate={{
                scale: isPlaying ? 1 : 0.95,
              }}
              transition={{
                type: "spring",
                damping: 20,
              }}
            >
              <Button
                bg="transparent"
                icon={
                  isPlaying ? (
                    <Pause size="$2" color="#fff" />
                  ) : (
                    <Play size="$2" color="#fff" />
                  )
                }
                onPress={handlePlayPause}
                pressStyle={{
                  scale: 0.9,
                }}
                chromeless
              />
            </MotiView>
          </XStack>

          {/* Thanh tiến trình */}
          <MotiView
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              type: "timing",
              duration: 1000,
            }}
            style={{
              height: 2,
              backgroundColor: "#22c55e",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          />
        </MotiView>
      )}
    </AnimatePresence>
  );
}
