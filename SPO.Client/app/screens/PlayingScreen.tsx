import React, { useState } from "react";
import { ImageBackground, Image } from "react-native";
import { YStack, XStack, Text, Button } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "@tamagui/linear-gradient";
import {
  Shuffle,
  Repeat,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  ChevronLeft,
  Ellipsis,
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
import TrackPlayer, { useProgress } from "react-native-track-player";
import { useGetArtistsQuery } from "../services/ArtistService";
import { Artist } from "../types/artist";
import SongBottomSheet from "../components/song/SongBottomSheet";

const PlayingScreen = () => {
  const navigation = useNavigation();
  const { isPlaying, currentTrack, shuffle, loop } = useAppSelector(
    (state) => state.player
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingSheetOpen, setIsPlayingSheetOpen] = useState(false);
  const { position, duration } = useProgress(1000);
  const {
    data: artists,
    isLoading: isArtistsLoading,
    error: artistsError,
  } = useGetArtistsQuery();

  const getArtistName = (artistId: string | undefined) => {
    if (!artistId) return "Unknown Artist";
    const artist = artists?.data?.find((a: Artist) => a.id === artistId);
    return artist?.name || "Unknown Artist";
  };

  // Xử lý khi giá trị slider thay đổi
  const handleSliderChange = async (value: number[]) => {
    const seekPosition = value[0]; // Lấy giá trị đầu tiên từ mảng
    await TrackPlayer.seekTo(seekPosition);
  };

  // Xử lý nút Next và Previous
  const handleSkipNext = async () => {
    try {
      await skipToNext();
    } catch (error) {
      console.error("Skip Next Error:", error);
    }
  };

  const handleSkipPrevious = async () => {
    try {
      await skipToPrevious();
    } catch (error) {
      console.error("Skip Previous Error:", error);
    }
  };

  // Xử lý chế độ lặp
  const handleToggleLoop = async () => {
    try {
      await setLoopMode(
        loop === "off" ? "track" : loop === "track" ? "queue" : "off"
      );
    } catch (error) {
      console.error("Toggle Loop Error:", error);
    }
  };

  // Xử lý trường hợp không có bài hát
  if (!currentTrack) {
    return (
      <YStack flex={1} justify="center" items="center" bg="black">
        <Text fontSize="$6" color="#fff">
          No track is playing
        </Text>
        <Button
          onPress={() => navigation.goBack()}
          icon={<ChevronLeft size="$3" color="#fff" />}
          bg="transparent"
          mt="$4"
        >
          Go Back
        </Button>
      </YStack>
    );
  }

  return (
    <ImageBackground
      source={{
        uri:
          currentTrack.artwork ??
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
            onPress={() => navigation.goBack()}
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
                duration: 10000,
                loop: isPlaying,
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
                  currentTrack.artwork ??
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
              style={{ textAlign: "center" }}
              numberOfLines={1}
            >
              {currentTrack.title ?? "Unknown Title"}
            </Text>
          </YStack>
          <Text fontSize="$5" color="#fff" opacity={0.7}>
            {getArtistName(currentTrack.artist) ?? "Unknown Artist"}
          </Text>
        </YStack>

        {/* Progress Slider */}
        <YStack>
          <XStack justify="space-between" px="$2">
            <Text fontSize="$4" color="#fff" fontWeight="500">
              {formatTime(position)}
            </Text>
            <Text fontSize="$4" color="#fff" fontWeight="500">
              {formatTime(duration ?? 0)}
            </Text>
          </XStack>
          <Slider
            size="$2"
            my="$3"
            width="100%"
            value={[position]}
            max={duration || 100}
            step={1}
            onValueChange={handleSliderChange}
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
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
          >
            <MotiView
              animate={{ scale: isHovered ? 1.1 : 1 }}
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
      <SongBottomSheet
        isOpen={isPlayingSheetOpen}
        onClose={() => setIsPlayingSheetOpen(false)}
        screenType="playing"
        selectedSong={currentTrack}
        navigation={navigation}
      />
    </ImageBackground>
  );
};

export default PlayingScreen;
