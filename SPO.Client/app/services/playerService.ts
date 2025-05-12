import TrackPlayer, {
  Event,
  State,
  Capability,
  AppKilledPlaybackBehavior,
  RepeatMode,
} from "react-native-track-player";
import { store } from "../store";
import {
  setPlaying,
  setPlaybackState,
  setCurrentTrack,
  setPosition,
  setDuration,
  setQueue,
  addTrackToQueue,
  removeTrackFromQueue,
  setShuffle,
  setLoop,
  setVolume,
} from "../store/playerSlice";

// Định nghĩa interface Track
interface Track {
  id: string;
  url: string;
  title?: string;
  artist?: string;
  artwork?: string;
}

// Danh sách tracks mẫu
const tracks: Track[] = [
  {
    id: "track1",
    url: "https://thantrieu.com/resources/music/1130295695.mp3",
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    artwork: "https://via.placeholder.com/150?text=Song+1",
  },
  {
    id: "track2",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    artwork: "https://via.placeholder.com/150?text=Song+2",
  },
  {
    id: "track3",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    artwork: "https://via.placeholder.com/150?text=Song+3",
  },
];

// Khởi tạo TrackPlayer và queue
export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    console.log("TrackPlayer setup successfully");

    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
    });
    console.log("TrackPlayer options updated successfully");

    // Thêm tracks mẫu vào TrackPlayer và Redux
    await TrackPlayer.add(tracks);
    store.dispatch(setQueue(tracks));
    console.log("Tracks added successfully");

    // Đặt track đầu tiên làm track hiện tại
    const track = await TrackPlayer.getTrack(0);
    if (track) {
      store.dispatch(
        setCurrentTrack({
          id: track.id,
          url: String(track.url),
          title: track.title,
          artist: track.artist,
        })
      );
    }

    // Khởi tạo âm lượng
    await TrackPlayer.setVolume(1.0);
  } catch (error) {
    console.error("Setup Player Error:", error);
  }
};

// Dịch vụ playback cho background
export async function playbackService() {
  try {
    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
      try {
        await TrackPlayer.play();
        store.dispatch(setPlaying(true));
        console.log("Remote Play triggered");
      } catch (error) {
        console.error("Remote Play Error:", error);
      }
    });

    TrackPlayer.addEventListener(Event.RemotePause, async () => {
      try {
        await TrackPlayer.pause();
        store.dispatch(setPlaying(false));
        console.log("Remote Pause triggered");
      } catch (error) {
        console.error("Remote Pause Error:", error);
      }
    });

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
      try {
        await skipToNext();
        console.log("Remote Next triggered");
      } catch (error) {
        console.error("Remote Next Error:", error);
      }
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
      try {
        await skipToPrevious();
        console.log("Remote Previous triggered");
      } catch (error) {
        console.error("Remote Previous Error:", error);
      }
    });

    TrackPlayer.addEventListener(Event.RemoteStop, async () => {
      try {
        await TrackPlayer.reset();
        store.dispatch(setPlaying(false));
        store.dispatch(setCurrentTrack(null));
        store.dispatch(setQueue([]));
        console.log("Remote Stop triggered");
      } catch (error) {
        console.error("Remote Stop Error:", error);
      }
    });

    TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (event) => {
      try {
        if (event.nextTrack !== null) {
          const track = await TrackPlayer.getTrack(event.nextTrack);
          if (track) {
            store.dispatch(
              setCurrentTrack({
                id: track.id,
                url: String(track.url),
                title: track.title,
                artist: track.artist,
              })
            );
            console.log("Track changed to:", track.title);
          } else {
            store.dispatch(setCurrentTrack(null));
            console.log("No track found for index:", event.nextTrack);
          }
        }
      } catch (error) {
        console.error("Track Change Error:", error);
      }
    });

    TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
      try {
        store.dispatch(setPlaybackState(State[state]));
        store.dispatch(setPlaying(state === State.Playing));
        console.log("Playback state changed:", state);
      } catch (error) {
        console.error("Playback State Error:", error);
      }
    });

    TrackPlayer.addEventListener(
      Event.PlaybackProgressUpdated,
      ({ position, duration }) => {
        try {
          store.dispatch(setPosition(position));
          store.dispatch(setDuration(duration));
        } catch (error) {
          console.error("Progress Update Error:", error);
        }
      }
    );

    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async () => {
      try {
        store.dispatch(setPlaying(false));
        store.dispatch(setCurrentTrack(null));
        console.log("Queue ended");
      } catch (error) {
        console.error("Queue Ended Error:", error);
      }
    });

    console.log("Playback service registered successfully");
  } catch (error) {
    console.error("Playback Service Error:", error);
  }
}

// Hàm điều khiển playback
export const togglePlayback = async () => {
  try {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
      store.dispatch(setPlaying(false));
      console.log("Paused");
    } else if (state === State.Paused || state === State.Ready) {
      await TrackPlayer.play();
      store.dispatch(setPlaying(true));
      console.log("Playing");
    }
  } catch (error) {
    console.error("Toggle Playback Error:", error);
  }
};

// Hàm hỗ trợ shuffle
const getRandomTrackIndex = (
  queue: Track[],
  currentTrack: Track | null
): number => {
  if (!queue.length) return -1;
  const availableTracks = queue.filter(
    (track) => !currentTrack || track.id !== currentTrack.id
  );
  if (!availableTracks.length) return -1;
  return Math.floor(Math.random() * availableTracks.length);
};

export const skipToNext = async () => {
  try {
    const state = store.getState().player;
    if (state.shuffle) {
      const queue = await TrackPlayer.getQueue();
      const mappedQueue = queue.map((track) => ({
        id: track.id || "",
        url: String(track.url || ""),
        title: track.title,
        artist: track.artist,
      }));
      const randomIndex = getRandomTrackIndex(mappedQueue, state.currentTrack);
      if (randomIndex !== -1) {
        await TrackPlayer.skip(randomIndex);
        console.log("Skipped to random track");
      }
    } else {
      await TrackPlayer.skipToNext();
      console.log("Skipped to next track");
    }
  } catch (error) {
    console.error("Skip To Next Error:", error);
  }
};

export const skipToPrevious = async () => {
  try {
    await TrackPlayer.skipToPrevious();
    console.log("Skipped to previous track");
  } catch (error) {
    console.error("Skip To Previous Error:", error);
  }
};

export const seekTo = async (position: number) => {
  try {
    await TrackPlayer.seekTo(position);
    store.dispatch(setPosition(position));
    console.log("Seek to:", position);
  } catch (error) {
    console.error("Seek Error:", error);
  }
};

// Hàm quản lý queue
export const addTrackToQ = async (track: Track) => {
  try {
    await TrackPlayer.add([track]);
    store.dispatch(addTrackToQueue(track) as any);
    console.log("Track added to queue:", track.title);
  } catch (error) {
    console.error("Add Track Error:", error);
  }
};

export const removeTrackFromQ = async (trackId: string) => {
  try {
    const queue = await TrackPlayer.getQueue();
    const trackIndex = queue.findIndex((track) => track.id === trackId);
    if (trackIndex !== -1) {
      await TrackPlayer.remove([trackIndex]);
      store.dispatch(removeTrackFromQueue(trackId));
      console.log("Track removed from queue:", trackId);
    } else {
      console.warn("Track not found in queue:", trackId);
    }
  } catch (error) {
    console.error("Remove Track Error:", error);
  }
};

export const clearQueue = async () => {
  try {
    await TrackPlayer.reset();
    store.dispatch(clearQueue() as any);
    store.dispatch(setCurrentTrack(null));
    store.dispatch(setPlaying(false));
    console.log("Queue cleared");
  } catch (error) {
    console.error("Clear Queue Error:", error);
  }
};

// Hàm quản lý shuffle
export const toggleShuffle = async () => {
  try {
    const currentShuffle = store.getState().player.shuffle;
    store.dispatch(setShuffle(!currentShuffle));
    console.log("Shuffle:", !currentShuffle ? "enabled" : "disabled");
  } catch (error) {
    console.error("Toggle Shuffle Error:", error);
  }
};

// Hàm quản lý loop
export const setLoopMode = async (mode: "off" | "track" | "queue") => {
  try {
    store.dispatch(setLoop(mode));
    if (mode === "off") {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
    } else if (mode === "track") {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
    } else if (mode === "queue") {
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    }
    console.log("Loop mode set to:", mode);
  } catch (error) {
    console.error("Set Loop Mode Error:", error);
  }
};

// Hàm quản lý âm lượng
export const setVol = async (volume: number) => {
  try {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    await TrackPlayer.setVolume(clampedVolume);
    store.dispatch(setVolume(clampedVolume));
    console.log("Volume set to:", clampedVolume);
  } catch (error) {
    console.error("Set Volume Error:", error);
  }
};
