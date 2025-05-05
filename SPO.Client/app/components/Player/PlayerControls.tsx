import { Pause, Play, SkipBack, SkipForward } from "lucide-react-native";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { Stack, XStack } from "tamagui";

interface PlayerControlsProps {
  onPrevious: () => void;
  onToggle: () => void;
  onNext: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  onPrevious,
  onToggle,
  onNext,
}) => {
  const playbackState = usePlaybackState();
  const isPlaying = playbackState.state === State.Playing;

  return (
    <XStack alignItems="center" space="$4" marginTop="$5">
      <SkipBack size="$3" color="#fff" onPress={onPrevious} />
      <Stack
        backgroundColor="#fff"
        borderRadius="$10"
        padding="$2"
        onPress={onToggle}
      >
        {isPlaying ? (
          <Pause size="$3" color="#000" />
        ) : (
          <Play size="$3" color="#000" />
        )}
      </Stack>
      <SkipForward size="$3" color="#fff" onPress={onNext} />
    </XStack>
  );
};
