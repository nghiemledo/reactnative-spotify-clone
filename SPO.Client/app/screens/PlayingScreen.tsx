import React, { useCallback, useEffect } from "react";
import { View, Image, Text } from "react-native";
import TrackPlayer, { Capability, State } from "react-native-track-player";
import { Stack } from "tamagui";
import { TrackInfo } from "../components/Player/TrackInfo";
import { PlayerControls } from "../components/Player/PlayerControls";

const PlayingScreen: React.FC = () => {
  // Hàm khởi tạo TrackPlayer
  const setupPlayer = useCallback(async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

      // Thêm bài hát vào danh sách phát
      const track = {
        id: "1",
        url: "https://thantrieu.com/resources/music/1130295695.mp3",
        title: "Those of Us (8D Audio)",
        artist: "8D Tunes",
      };
      await TrackPlayer.add(track);
    } catch (error) {
      console.error("Error setting up TrackPlayer:", error);
    }
  }, []);

  const handleToggle = useCallback(async () => {
    try {
      const currentState = await TrackPlayer.getState();
      if (currentState === State.Paused || currentState === State.Ready) {
        await TrackPlayer.play();
      } else if (currentState === State.Playing) {
        await TrackPlayer.pause();
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  }, []);

  useEffect(() => {
    setupPlayer();
    return () => {
      TrackPlayer.reset();
    };
  }, [setupPlayer]);

  return (
    <View style={{ flex: 1, backgroundColor: "#4a4a4a" }}>
      <Stack justifyContent="center" alignItems="center" flex={1}>
        <Image
          source={{ uri: "https://via.placeholder.com/200" }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.5,
          }}
          resizeMode="cover"
          testID="background-image"
        />
        <TrackInfo title="Those of Us (8D Audio)" artist="8D Tunes" />
        <PlayerControls
          onPrevious={() => TrackPlayer.skipToPrevious()}
          onToggle={handleToggle}
          onNext={() => TrackPlayer.skipToNext()}
        />
        <Text style={{ color: "#fff", marginTop: 10, fontSize: 16 }}>
          0:20 / 2:30
        </Text>
      </Stack>
    </View>
  );
};

export default PlayingScreen;
