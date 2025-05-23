import React, { useEffect, useRef } from "react";
import { XStack, YStack, Text, Button } from "tamagui";
import { MoreVertical } from "@tamagui/lucide-icons";
import { TouchableOpacity, Animated, Easing } from "react-native";
import SafeImage from "./SafeImage";
import { Song } from "../types/song";
import { store, useAppSelector } from "../store";

interface SongItemProps {
  song: Song;
  index?: number;
  showIndex?: boolean;
  showImage?: boolean;
  showArtistName?: boolean;
  imageSize?: number;
  getArtistName?: (artistId: string | undefined) => string;
  onSongPress?: (song: Song) => void;
  onMorePress: (song: Song) => void;
  isPlaying?: boolean; // Thêm prop isPlaying
}

export const SongItem: React.FC<SongItemProps> = ({
  song,
  index,
  showIndex = false,
  showImage = false,
  showArtistName = false,
  imageSize = 48,
  getArtistName,
  onSongPress,
  onMorePress,
  isPlaying: propIsPlaying = false,
}) => {
  // Tạo các giá trị Animated cho 3 thanh bar
  const bar1Height = useRef(new Animated.Value(10)).current;
  const bar2Height = useRef(new Animated.Value(15)).current;
  const bar3Height = useRef(new Animated.Value(10)).current;
  const player = useAppSelector((store) => store.player);
  const isPlaying = player.currentTrack?.id === song.id || propIsPlaying;
  // Hàm tạo hiệu ứng lên xuống cho các thanh bar
  const animateBars = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bar1Height, {
          toValue: 20,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(bar1Height, {
          toValue: 10,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bar2Height, {
          toValue: 25,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(bar2Height, {
          toValue: 15,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bar3Height, {
          toValue: 20,
          duration: 350,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(bar3Height, {
          toValue: 10,
          duration: 350,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  // Bắt đầu hoặc dừng animation dựa trên isPlaying
  useEffect(() => {
    if (isPlaying) {
      animateBars();
    } else {
      // Dừng animation và reset chiều cao các thanh bar
      bar1Height.stopAnimation();
      bar2Height.stopAnimation();
      bar3Height.stopAnimation();
      bar1Height.setValue(10);
      bar2Height.setValue(15);
      bar3Height.setValue(10);
    }
  }, [isPlaying]);

  if (!song || !song.title || !song.audioUrl) {
    return (
      <XStack items="center" justify="space-between" py="$2">
        <Text color="white">Dữ liệu bài hát không hợp lệ</Text>
      </XStack>
    );
  }

  return (
    <XStack items="center" justify="space-between" py="$2">
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onSongPress?.(song)}>
        <XStack items="center" gap="$3" flex={1}>
          {showIndex && (
            <Text color="#b3b3b3" width={20} fontSize={16}>
              {index !== undefined ? index + 1 : ""}
            </Text>
          )}
          {showImage &&
            (isPlaying ? (
              // Hiển thị các thanh bar động khi isPlaying là true
              <XStack
                width={imageSize}
                height={imageSize}
                justify="center"
                items="center"
                background="#1DB954"
                rounded={2}
                gap="$1"
              >
                <Animated.View
                  style={{
                    width: 6,
                    height: bar1Height,
                    backgroundColor: "#1DB954",
                    borderRadius: 3,
                  }}
                />
                <Animated.View
                  style={{
                    width: 6,
                    height: bar2Height,
                    backgroundColor: "#1DB954",
                    borderRadius: 3,
                  }}
                />
                <Animated.View
                  style={{
                    width: 6,
                    height: bar3Height,
                    backgroundColor: "#1DB954",
                    borderRadius: 3,
                  }}
                />
              </XStack>
            ) : (
              // Hiển thị hình ảnh bài hát khi không phát
              <SafeImage
                uri={song.coverImage || "https://via.placeholder.com/40"}
                width={imageSize}
                height={imageSize}
                rounded={2}
              />
            ))}
          <YStack flex={1}>
            <Text
              fontSize={16}
              fontWeight="400"
              color={isPlaying ? "#1DB954" : "white"} // Màu xanh khi isPlaying
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {song.title || "Không có tiêu đề"}
            </Text>
            {showArtistName && getArtistName && (
              <Text
                fontSize={13}
                color="rgba(255,255,255,0.7)"
                numberOfLines={1}
              >
                {getArtistName(song.artistId) || "Nghệ sĩ không xác định"}
              </Text>
            )}
          </YStack>
        </XStack>
      </TouchableOpacity>
      <Button
        bg="transparent"
        size="$3"
        p={0}
        onPress={() => onMorePress(song)}
        icon={<MoreVertical size={20} color="#b3b3b3" />}
      />
    </XStack>
  );
};
