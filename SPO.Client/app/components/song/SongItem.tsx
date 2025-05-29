import React, { useEffect, useRef } from "react";
import { XStack, YStack, Text, Button } from "tamagui";
import { MoreVertical, X } from "@tamagui/lucide-icons";
import { TouchableOpacity, Animated, Easing } from "react-native";
import SafeImage from "../SafeImage";
import { Song } from "../../types/song";
import { useAppSelector } from "../../store";
import { playSong } from "../../services/playerService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

interface SongItemProps {
  song: Song;
  index?: number;
  showIndex?: boolean;
  showImage?: boolean;
  showArtistName?: boolean;
  imageSize?: number;
  screen: string;
  getArtistName?: (artistId: string | undefined) => string;
  onSongPress?: (song: Song) => void;
  onMorePress?: (song: Song) => void;
  onRemovePress?: (songId: string) => void;
  isPlaying?: boolean;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

export const SongItem: React.FC<SongItemProps> = ({
  song,
  index,
  showIndex = false,
  showImage = false,
  showArtistName = false,
  imageSize = 48,
  screen,
  getArtistName,
  onSongPress,
  onMorePress,
  onRemovePress,
  isPlaying: propIsPlaying = false,
  navigation,
}) => {
  const bar1Height = useRef(new Animated.Value(10)).current;
  const bar2Height = useRef(new Animated.Value(15)).current;
  const bar3Height = useRef(new Animated.Value(10)).current;
  const player = useAppSelector((store) => store.player);
  const isPlaying = player.currentTrack?.id === song.id || propIsPlaying;

  const handlePressSong = async () => {
    try {
      if (onSongPress) {
        onSongPress(song);
      } else {
        await playSong(song);
        if (navigation) {
          navigation.navigate("Playing");
        }
        console.log("Song pressed and playing:", song.title);
      }
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const handleMorePress = () => {
    if (onMorePress) {
      onMorePress(song);
    }
  };

  const handleRemovePress = () => {
    if (onRemovePress && song.id) {
      onRemovePress(song.id);
    }
  };

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

  useEffect(() => {
    if (isPlaying) {
      animateBars();
    } else {
      bar1Height.stopAnimation();
      bar2Height.stopAnimation();
      bar3Height.stopAnimation();
      bar1Height.setValue(10);
      bar2Height.setValue(15);
      bar3Height.setValue(10);
    }
  }, [isPlaying]);

  if (!song || !song.title ) {
    return (
      <XStack items="center" justify="space-between" py="$2">
        <Text color="white">Invalid song data</Text>
      </XStack>
    );
  }

  return (
    <XStack
      items="center"
      justify="space-between"
      py="$2"
      my={screen === "queue" ? "$2" : "$1.5"}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={handlePressSong}>
        <XStack items="center" gap="$3" flex={1}>
          {showIndex && (
            <Text color="#b3b3b3" width={20} fontSize={16}>
              {index !== undefined ? index + 1 : ""}
            </Text>
          )}
          {showImage &&
            (isPlaying ? (
              <XStack
                width={imageSize}
                height={imageSize}
                justify="center"
                items="center"
                bg="#1DB954"
                rounded={2}
                gap="$1"
              >
                <Animated.View
                  style={{
                    width: 6,
                    height: bar1Height,
                    backgroundColor: "white",
                    borderRadius: 3,
                  }}
                />
                <Animated.View
                  style={{
                    width: 6,
                    height: bar2Height,
                    backgroundColor: "white",
                    borderRadius: 3,
                  }}
                />
                <Animated.View
                  style={{
                    width: 6,
                    height: bar3Height,
                    backgroundColor: "white",
                    borderRadius: 3,
                  }}
                />
              </XStack>
            ) : (
              <SafeImage
                uri={song.coverImage || "https://via.placeholder.com/40"}
                width={imageSize}
                height={imageSize}
                borderRadius={2}
              />
            ))}
          <YStack flex={1}>
            <Text
              fontSize={16}
              fontWeight="400"
              color={isPlaying ? "#1DB954" : "white"}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {song.title || "Unknown Title"}
            </Text>
            {showArtistName && getArtistName && (
              <Text
                fontSize={13}
                color="rgba(255,255,255,0.7)"
                numberOfLines={1}
              >
                {getArtistName(song.artistId) || "Unknown Artist"}
              </Text>
            )}
          </YStack>
        </XStack>
      </TouchableOpacity>
      <XStack gap="$2">
        {screen === "queue" ? (
          !isPlaying ? (
            <Button
              bg="transparent"
              size="$2"
              p={0}
              onPress={handleRemovePress}
              icon={<X size={20} color="#b3b3b3" />}
            />
          ) : (
            // Hiển thị placeholder giữ layout
            <XStack width={36} height={36} />
          )
        ) : null}
        {screen !== "queue" && (
          <Button
            bg="transparent"
            size="$3"
            p={0}
            onPress={handleMorePress}
            icon={<MoreVertical size={20} color="#b3b3b3" />}
          />
        )}
      </XStack>
    </XStack>
  );
};
