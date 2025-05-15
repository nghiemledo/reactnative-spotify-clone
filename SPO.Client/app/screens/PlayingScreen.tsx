import { useEffect, useState } from "react";
import { ImageBackground, Image } from "react-native";
import { YStack, Text, Button, XStack, Slider, AnimatePresence } from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import {
  Shuffle,
  Repeat,
  SkipBack,
  Play,
  Pause,
  SkipForward,
} from "@tamagui/lucide-icons";
import { useAppSelector, useAppDispatch } from "../store";
import {
  togglePlayback,
  skipToNext,
  skipToPrevious,
  seekTo,
  toggleShuffle,
  setLoopMode,
  setVol,
} from "../services/playerService";
import { formatTime } from "../utils/timeUtils";

const PlayingScreen = () => {
  const dispatch = useAppDispatch();
  const {
    isPlaying,
    currentTrack,
    position,
    duration,
    playbackState,
    shuffle,
    loop,
    volume,
  } = useAppSelector((state) => state.player);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Không cần Animated từ React Native nữa
  }, [isPlaying]);

  const handleSeek = (value: number[]) => seekTo(value[0]);
  const handleVolumeChange = (value: number[]) => setVol(value[0]);
  const handleToggleLoop = () =>
    setLoopMode(loop === "off" ? "track" : loop === "track" ? "queue" : "off");

  return (
    <ImageBackground
      source={{
        uri:
          currentTrack?.artwork ??
          "https://via.placeholder.com/400?text=No+Image",
      }}
      style={{ flex: 1 }}
      blurRadius={10}
    >
      <YStack flex={1} justify="space-between" p="$4">
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          locations={[0, 0.6]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 200,
          }}
        />
        <YStack z={1}>
          <Text fontSize="$6" fontWeight="bold" color="white">
            ĐANG PHÁT TỪ DANH SÁCH PHÁT
          </Text>
          <Text fontSize="$4" color="white" opacity={0.7}>
            8D Music Hits | 8D Songs 2022
          </Text>
        </YStack>
        <YStack z={1}>
          <AnimatePresence>
            <YStack
              animation="bouncy"
              rotate={isPlaying ? "360deg" : "0deg"}
              // transition={{ transform: { type: "spring", damping: 10, stiffness: 100 } }}
            >
              <Image
                source={{
                  uri:
                    currentTrack?.artwork ??
                    "https://via.placeholder.com/300?text=No+Image",
                }}
                style={{ width: 300, height: 300, borderRightWidth: 10 }}
              />
            </YStack>
          </AnimatePresence>
          <Text fontSize="$8" fontWeight="bold" color="white" mt="$3">
            {currentTrack?.title ?? "Unknown Title"}
          </Text>
          <Text fontSize="$4" color="white" opacity={0.7}>
            {currentTrack?.artist ?? "Unknown Artist"}
          </Text>
        </YStack>
        <YStack z={1}>
          <XStack justify="space-between" px="$4">
            <Text fontSize="$4" color="white">
              {formatTime(position)}
            </Text>
            <Text fontSize="$4" color="white">
              {formatTime(duration)}
            </Text>
          </XStack>
          <Slider
            value={[position]}
            min={0}
            max={duration}
            step={1}
            onValueChange={handleSeek}
            style={{ width: "100%" }}
          />
        </YStack>
        <YStack space="$4" z={1}>
          <XStack space="$4">
            <Button
              icon={<Shuffle size="$2" color={shuffle ? "#1DB954" : "white"} />}
              bg="transparent"
              onPress={toggleShuffle}
              borderBlockWidth="$10"
            />
            <Button
              icon={
                <Repeat
                  size="$2"
                  color={loop !== "off" ? "#1DB954" : "white"}
                />
              }
              bg="transparent"
              onPress={handleToggleLoop}
              borderBlockWidth="$10"
            />
          </XStack>
          <XStack space="$6">
            <Button
              icon={<SkipBack size="$3" color="white" />}
              onPress={skipToPrevious}
              borderBlockWidth="$10"
              bg="transparent"
            />
            <YStack
              animation="bouncy"
              scale={isPlaying ? 1.2 : 1}
              onHoverIn={() => setIsHovered(true)}
              onHoverOut={() => setIsHovered(false)}
            >
              <Button
                icon={
                  isPlaying ? (
                    <Pause size="$4" color="white" />
                  ) : (
                    <Play size="$4" color="white" />
                  )
                }
                onPress={togglePlayback}
                size="$6"
                borderBlockWidth="$10"
                bg="#1DB954"
              />
            </YStack>
            <Button
              icon={<SkipForward size="$3" color="white" />}
              onPress={skipToNext}
              borderBlockWidth="$10"
              bg="transparent"
            />
          </XStack>
        </YStack>
        <YStack z={1}>
          <Text fontSize="$4" color="white" text="center">
            Âm lượng: {Math.round(volume * 100)}%
          </Text>
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            style={{ width: "100%" }}
          />
        </YStack>
      </YStack>
    </ImageBackground>
  );
};

export default PlayingScreen;
