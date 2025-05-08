import { registerRootComponent } from "expo";
import TrackPlayer, { Capability } from "react-native-track-player";
import App from "./App";

// (dịch vụ phát nhạc nền)
const PlaybackService = async () => {
  TrackPlayer.registerPlaybackService(() => {
    return async () => {
      // Xử lý các sự kiện phát nhạc nền nếu cần
      // Ví dụ: TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
    };
  });
};

// Hàm thiết lập TrackPlayer
async function TrackerSetup() {
  try {
    await TrackPlayer.setupPlayer();
    // Cập nhật các khả năng của TrackPlayer (các nút điều khiển trên thông báo/lock screen)
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
    await PlaybackService();
    console.log("TrackPlayer setup completed successfully");
  } catch (error) {
    console.error("Error setting up TrackPlayer:", error);
  }
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
TrackerSetup()
  .then(() => {
    registerRootComponent(App);
  })
  .catch((error) => {
    console.error("Failed to initialize app:", error);
  });
