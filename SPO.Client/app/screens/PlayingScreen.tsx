import { useEffect, useState } from "react";
import { ImageBackground, Image } from "react-native";
import { YStack, XStack, Text, Button } from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import {
  Shuffle,
  Repeat,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  User,
  ChevronLeft,
  Ellipsis,
  MoreVertical,
} from "@tamagui/lucide-icons";
import { MotiView } from "moti";
import { useAppSelector, useAppDispatch } from "../store";
import {
  togglePlayback,
  skipToNext,
  skipToPrevious,
  seekTo,
  toggleShuffle,
  setLoopMode,
} from "../services/playerService";
import { formatTime } from "../utils/timeUtils";
import { Slider } from "tamagui";
import PlayingBottomSheet from "../components/PlayingBottomSheet";

const PlayingScreen = () => {
  const dispatch = useAppDispatch();
  const { isPlaying, currentTrack, queue, shuffle, loop } = useAppSelector(
    (state) => state.player
  );
  const [isHovered, setIsHovered] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [previousTrackId, setPreviousTrackId] = useState<string | null>(null);
  const [isPlayingSheetOpen, setIsPlayingSheetOpen] = useState(false);
  useEffect(() => {
    if (currentTrack) {
      if (previousTrackId !== currentTrack.id) {
        setSliderPosition(0);
        setCurrentPosition(0);
        setPreviousTrackId(currentTrack.id);
      }

      if (currentTrack.position !== undefined) {
        setSliderPosition(currentTrack.position);
        setCurrentPosition(currentTrack.position);
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    let interval: number;
    if (isPlaying && !isSeeking && currentTrack) {
      interval = setInterval(() => {
        const newPosition = currentPosition + 1;
        if (newPosition <= (currentTrack.duration || 0)) {
          setCurrentPosition(newPosition);
          setSliderPosition(newPosition);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isSeeking, currentPosition, currentTrack]);

  // Xử lý khi người dùng bắt đầu kéo slider
  const handleSliderStart = () => {
    setIsSeeking(true);
  };

  // Xử lý khi người dùng thay đổi vị trí slider
  const handleSliderChange = (values: any[]) => {
    const newPosition = values[0];
    setSliderPosition(newPosition);
  };

  // Xử lý khi người dùng thả slider ra
  const handleSliderComplete = async (values: number[]) => {
    const newPosition = values[0];
    setCurrentPosition(newPosition);
    if (currentTrack) {
      await seekTo(newPosition);
    }
    setIsSeeking(false);
  };

  // Xử lý nút Next và Previous với reset thanh trượt
  const handleSkipNext = () => {
    skipToNext();
  };

  const handleSkipPrevious = () => {
    skipToPrevious();
  };

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
      blurRadius={15}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.3)", "transparent"]}
        locations={[0, 0.5, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <YStack flex={1} justify="space-between" p="$5">
        {/* Header */}
        <XStack justify="space-between" items="center">
          <Button
            icon={<ChevronLeft size="$3" color="#fff" />}
            bg="transparent"
            circular
            onPress={() => {}}
            chromeless
          />
          <Text fontSize="$5" color="#fff" fontWeight="600">
            Now Playing
          </Text>
          <Button
            onPress={() => setIsPlayingSheetOpen(true)}
            icon={<Ellipsis size="$3" color="#fff" />}
            bg="transparent"
            circular
            chromeless
          />
        </XStack>
        {/* Artwork Section */}
        <YStack items="center" justify="center" flex={1}>
          <MotiView
            animate={{
              rotate: isPlaying ? "360deg" : "0deg",
              scale: isPlaying ? 1 : 0.95,
            }}
            transition={{
              rotate: {
                type: "timing",
                duration: isPlaying ? 10000 : 0,
                loop: isPlaying, // Xoay mãi khi đang phát
              },
              scale: {
                type: "spring",
                damping: 20,
              },
            }}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Image
              source={{
                uri:
                  currentTrack?.artwork ??
                  "https://via.placeholder.com/300?text=No+Image",
              }}
              style={{
                width: 320,
                height: 320,
                borderRadius: 160,
                borderWidth: 2,
                borderColor: "rgba(255,255,255,0.2)",
              }}
            />
          </MotiView>
        </YStack>

        {/* Track Info */}
        <YStack items="center">
          <YStack overflow="hidden" width="80%" maxW={300}>
            <Text
              fontSize="$9"
              fontWeight="600"
              color="#fff"
              text={"center"}
              numberOfLines={1}
            >
              {currentTrack?.title ?? "Unknown Title"}
            </Text>
          </YStack>
          <Text fontSize="$5" color="#fff" opacity={0.7}>
            {currentTrack?.artist ?? "Unknown Artist"}
          </Text>
        </YStack>

        {/* Progress Slider */}
        <YStack>
          <XStack justify="space-between" px="$2">
            <Text fontSize="$4" color="#fff" fontWeight="500">
              {formatTime(sliderPosition)}
            </Text>
            <Text fontSize="$4" color="#fff" fontWeight="500">
              {formatTime(currentTrack?.duration ?? 0)}
            </Text>
          </XStack>
          <Slider
            size="$2"
            my="$3"
            width={"100%"}
            value={[sliderPosition]}
            max={currentTrack?.duration || 100}
            step={1}
            onSlideMove={handleSliderChange}
            onSlideStart={handleSliderStart}
            onSlideComplete={handleSliderComplete}
          >
            <Slider.Track>
              <Slider.TrackActive bg="$green9" />
            </Slider.Track>
            <Slider.Thumb size="$1" circular index={0} bg="$green9" />
          </Slider>
        </YStack>

        {/* Playback Controls */}
        <XStack justify="center" items="center" space="$3">
          <Button
            icon={<Shuffle size="$2" color={shuffle ? "#15803d" : "#fff"} />}
            bg="transparent"
            circular
            onPress={toggleShuffle}
            chromeless
          />
          <Button
            icon={<SkipBack size="$3" color="#fff" />}
            bg="transparent"
            circular
            onPress={handleSkipPrevious}
            chromeless
          />
          <YStack
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
          >
            <MotiView
              animate={{ scale: isPlaying ? 1.1 : 1 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <Button
                icon={
                  isPlaying ? (
                    <Pause size="$4" color="#fff" />
                  ) : (
                    <Play size="$4" color="#fff" />
                  )
                }
                onPress={togglePlayback}
                bg="$green9"
                circular
                size="$6"
                elevation="$2"
              />
            </MotiView>
          </YStack>
          <Button
            icon={<SkipForward size="$3" color="#fff" />}
            bg="transparent"
            circular
            onPress={handleSkipNext}
            chromeless
          />
          <Button
            icon={
              <Repeat size="$2" color={loop !== "off" ? "#15803d" : "#fff"} />
            }
            bg="transparent"
            circular
            onPress={handleToggleLoop}
            chromeless
          />
        </XStack>
      </YStack>
      {/* PlayingBottomSheet */}
      <PlayingBottomSheet
        isOpen={isPlayingSheetOpen}
        onClose={() => setIsPlayingSheetOpen(false)}
        onAddToPlaylist={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSleepTimer={function (): void {
          throw new Error("Function not implemented.");
        }}
        onShowSpotifyCode={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </ImageBackground>
  );
};

export default PlayingScreen;
