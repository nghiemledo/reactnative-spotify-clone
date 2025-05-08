import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { YStack, XStack, Text, Button } from "tamagui";
import { MotiView } from "moti";
import { Play, Pause, SkipBack, SkipForward } from "@tamagui/lucide-icons";
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { useAppSelector, useAppDispatch } from "../store";
import {
  playSong,
  pauseSong,
  skipToNext,
  skipToPrevious,
} from "../store/playerSlice";

const PlayerScreen = () => {
  const dispatch = useAppDispatch();
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const { currentSong, isPlaying } = useAppSelector((state) => state.player);

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      const song: Track = {
        id: 1,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" as string,
        title: "Collide (8D Audio)",
        artist: "8D Tunes",
      };
      await TrackPlayer.add(song);
      dispatch(playSong(song));
    };
    setupPlayer();
  }, [dispatch]);

  const togglePlayback = async () => {
    if (playbackState.state === State.Playing) {
      dispatch(pauseSong());
      await TrackPlayer.pause();
    } else {
      dispatch(playSong(currentSong));
      await TrackPlayer.play();
    }
  };

  const handleSkipToNext = async () => {
    const nextSong: Track = {
      id: "2",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      title: "Next Song",
      artist: "Next Artist",
    };
    await TrackPlayer.add(nextSong);
    await TrackPlayer.skipToNext();
    dispatch(skipToNext(nextSong));
  };

  const handleSkipToPrevious = async () => {
    const prevSong: Track = {
      id: "1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      title: "Collide (8D Audio)",
      artist: "8D Tunes",
    };
    await TrackPlayer.add(prevSong);
    await TrackPlayer.skipToPrevious();
    dispatch(skipToPrevious(prevSong));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <YStack
      flex={1}
      backgroundClip="transparent"
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundImage: "url(https://example.com/aurora-background.jpg)",
        backgroundSize: "cover",
      }}
    >
      <YStack flex={1} p="$4" justify="space-between">
        {/* Back Button */}
        <Button backgroundClip="transparent" pressStyle={{ opacity: 0.7 }}>
          <Text fontSize="$6" color="white">
            ⬅
          </Text>
        </Button>

        {/* Playlist Info */}
        <YStack verticalAlign="center">
          <Text color="white" fontSize="$4">
            ĐANG PHÁT TỪ DANH SÁCH PHÁT
          </Text>
          <Text color="white" fontSize="$5" fontWeight="bold">
            8D Music Hits | 8D Songs 2022
          </Text>
        </YStack>

        {/* Track Info */}
        <XStack verticalAlign="center" m="$5">
          <Image
            source={{ uri: "https://example.com/album-art.jpg" }}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
          <YStack flex={1} marginStart="$3">
            <Text color="white" fontSize="$6" fontWeight="bold">
              {"Collide (8D Audio)"}
            </Text>
            <Text color="#ccc" fontSize="$4">
              {"8D Tunes"}
            </Text>
          </YStack>
          <Button backgroundClip="transparent">
            <Text fontSize="$6" color="white">
              ➕
            </Text>
          </Button>
        </XStack>

        {/* Progress Bar with Moti Animation */}
        <XStack verticalAlign="center">
          <Text color="white" fontSize="$4">
            {formatTime(progress.position)}
          </Text>
          <YStack flex={1} m="$3">
            <YStack height={5} background="#555" borderEndStartRadius="$2">
              <MotiView
                from={{ width: "0%" }}
                animate={{
                  width: `${(progress.position / progress.duration) * 100}%`,
                }}
                transition={{ type: "timing", duration: 300 }}
                style={{
                  height: 5,
                  backgroundColor: "#1DB954",
                  borderRadius: 4,
                }}
              />
            </YStack>
          </YStack>
          <Text color="white" fontSize="$4">
            {formatTime(progress.duration)}
          </Text>
        </XStack>

        {/* Playback Controls with Moti Animation */}
        <XStack justify="center" verticalAlign="center">
          <Button
            background="transparent"
            m="$5"
            onPress={handleSkipToPrevious}
          >
            <SkipBack size={30} color="white" />
          </Button>

          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: isPlaying ? 1.1 : 1 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <Button background="transparent" onPress={togglePlayback}>
              {playbackState.state === State.Playing ? (
                <Pause size={50} color="white" />
              ) : (
                <Play size={50} color="white" />
              )}
            </Button>
          </MotiView>

          <Button background="transparent" m="$5" onPress={handleSkipToNext}>
            <SkipForward size={30} color="white" />
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default PlayerScreen;
