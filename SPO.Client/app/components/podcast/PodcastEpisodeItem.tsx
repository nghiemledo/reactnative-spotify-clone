import { useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../navigation/HomeNavigator";
import { PodcastEpisode } from "../../types/podcast";
import { XStack, Text, Button, YStack } from "tamagui";
import {
  Play,
  Pause,
  Plus,
  ArrowDownCircle,
  Share,
  PlusCircle,
} from "@tamagui/lucide-icons";
import SafeImage from "../../components/SafeImage";
import { playPodcastEpisode } from "../../services/playerService";
import Toast from "react-native-toast-message";
import { useAppSelector, useAppDispatch } from "../../store";
import TrackPlayer from "react-native-track-player"; // Import TrackPlayer
import { RootStackParamList } from "../../navigation/AppNavigator";
import { setPlaying } from "../../store/playerSlice";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface PodcastEpisodeItemProps {
  episode: PodcastEpisode;
}

export const PodcastEpisodeItem = ({ episode }: PodcastEpisodeItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const formatDuration = useCallback((durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}hr ${remainingMinutes}min`;
    }
    return `${minutes}min`;
  }, []);

  // Lấy trạng thái từ Redux store
  const { isPlaying, currentTrack } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const isCurrentEpisodePlaying = isPlaying && currentTrack?.id === episode.id;

  const handlePlayPause = async () => {
    // Điều hướng ngay lập tức khi nhấn play
    // navigation.navigate("Playing");

    try {
      if (isCurrentEpisodePlaying) {
        // Nếu đang phát, tạm dừng
        await TrackPlayer.pause();
        dispatch(setPlaying(false)); // Cập nhật trạng thái trong Redux
        Toast.show({
          type: "info",
          text1: "Tạm dừng",
          text2: `Đã tạm dừng: ${episode.title}`,
        });
      } else {
        // Nếu không phát, phát lại
        if (currentTrack?.id !== episode.id) {
          // Nếu tập podcast không phải là track hiện tại, phát mới
          await playPodcastEpisode(episode);
        } else {
          // Nếu là track hiện tại, chỉ cần phát tiếp
          await TrackPlayer.play();
          dispatch(setPlaying(true)); // Cập nhật trạng thái trong Redux
        }
        Toast.show({
          type: "success",
          text1: "Đang phát",
          text2: `Đang phát: ${episode.title}`,
        });
      }
    } catch (error) {
      console.error("Error playing podcast episode:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi phát podcast",
        text2: "Không thể phát tập này. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <YStack>
      <TouchableOpacity
        onPress={() => navigation.navigate("PodcastEpisodeScreen", { episodeId: episode.id })}
      >
        <XStack items="center" mb="$4">
          <SafeImage
            uri={
              episode.coverImage
            }
            width={60}
            height={60}
            borderRadius={4}
            mr="$3"
          />
          <Text color="white" fontSize="$5" numberOfLines={1}>
            {episode.title}
          </Text>
        </XStack>
      </TouchableOpacity>

      <YStack flex={1}>
        <Text color="rgba(255,255,255,0.7)" fontSize="$3" numberOfLines={3}>
          {episode.description}
        </Text>
        <Text color="white" fontSize="$3">
          {new Date(episode.releaseDate).toLocaleDateString()} •{" "}
          {formatDuration(episode.duration || 0)}
        </Text>
      </YStack>
      <XStack justify="space-between" items="center" space="$2" mt={8}>
        <XStack>
          <Button chromeless p={0} mr={16}>
            <PlusCircle size={28} color="rgba(255,255,255,0.7)" />
          </Button>
          <Button chromeless p={0} mr={16}>
            <ArrowDownCircle size={28} color="rgba(255,255,255,0.7)" />
          </Button>
          <Button chromeless p={0} mr={16}>
            <Share size={28} color="rgba(255,255,255,0.7)" />
          </Button>
        </XStack>
        <Button
          bg="#1DB954"
          rounded={100}
          width={40}
          height={40}
          icon={
            isCurrentEpisodePlaying ? (
              <Pause size={20} fill="black" />
            ) : (
              <Play size={20} fill="black" />
            )
          }
          onPress={handlePlayPause}
        />
      </XStack>
      <XStack my={4} height={1} width="100%" bg="#555555" />
    </YStack>
  );
};
