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
} from "../store/playerSlice";
import { Track } from "../types/track";
import { Song } from "../types/song";

// Định nghĩa interface Track

// Danh sách tracks mẫu
const tracks: Track[] = [
  {
    id: "track1",
    url: "https://thantrieu.com/resources/music/1130295695.mp3",
    duration: 200,
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    artwork: "https://thantrieu.com/resources/arts/1130295695.webp",
  },
  {
    id: "track2",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 200,
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    artwork: "https://thantrieu.com/resources/arts/1121429554.webp",
  },
  {
    id: "track3",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 200,
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    artwork: "https://thantrieu.com/resources/arts/1130295694.webp",
  },
];

// Khởi tạo TrackPlayer và queue
export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    console.log("TrackPlayer setup completed");
    await playbackService();
    console.log("Playback service started");
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
          id: track.id ?? "",
          url: String(track.url ?? ""),
          position: track.position,
          duration: track.duration,
          title: track.title,
          artist: track.artist,
          artwork:
            track.artwork !== undefined ? String(track.artwork) : undefined,
        })
      );
    }
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

export const playSong = async (song: Song) => {
  try {
    // Kiểm tra dữ liệu bài hát
    if (!song.audioUrl) {
      throw new Error("Invalid song URL");
    }
    if (!song.title) {
      throw new Error("Song title is missing");
    }

    // Chuyển đổi Song thành Track
    const track: Track = {
      id: song.id || `song-${song.title}`,
      url: song.audioUrl,
      title: song.title,
      artist: song.artistId || "Unknown Artist",
      artwork: song.coverImage || "https://via.placeholder.com/300?text=No+Image",
      duration: song.duration || 0,
    };

    // Lấy hàng đợi hiện tại
    const currentQueue = await TrackPlayer.getQueue();
    const mappedQueue = currentQueue.map((t) => ({
      id: t.id || "",
      url: String(t.url || ""),
      title: t.title,
      artist: t.artist,
      artwork: t.artwork,
      duration: t.duration,
    }));

    // Kiểm tra xem bài hát đã có trong hàng đợi chưa
    const trackIndex = mappedQueue.findIndex((t) => t.id === track.id);

    if (trackIndex === -1) {
      // Thêm vào cuối hàng đợi
      await TrackPlayer.add([track]);
      store.dispatch(addTrackToQueue(track));
      const updatedQueue = await TrackPlayer.getQueue();
      await TrackPlayer.skip(updatedQueue.length - 1);
    } else {
      // Chuyển đến bài hát trong hàng đợi
      await TrackPlayer.skip(trackIndex);
    }

    // Cập nhật Redux store
    store.dispatch(setCurrentTrack(track));
    store.dispatch(setPosition(0));

    // Phát bài hát
    await TrackPlayer.play();
    store.dispatch(setPlaying(true));
    console.log("Playing song:", track.title);
  } catch (error) {
    console.error("Play Song Error:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
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
    const queue = await TrackPlayer.getQueue();

    if (!queue.length) {
      console.warn("Queue is empty");
      store.dispatch(setPlaying(false));
      store.dispatch(setCurrentTrack(null));
      return;
    }

    let nextTrackIndex: number;
    if (state.shuffle) {
      const mappedQueue = queue.map((track) => ({
        id: track.id || "",
        url: String(track.url || ""),
        title: track.title,
        artist: track.artist,
        artwork: track.artwork ? String(track.artwork) : undefined,
        duration: track.duration,
      }));
      nextTrackIndex = getRandomTrackIndex(mappedQueue, state.currentTrack);
    } else {
      const currentIndex = await TrackPlayer.getCurrentTrack();
      nextTrackIndex = currentIndex !== null ? currentIndex + 1 : 0;
      if (nextTrackIndex >= queue.length && state.loop === "queue") {
        nextTrackIndex = 0; // Quay lại bài đầu nếu loop queue
      }
    }

    if (nextTrackIndex >= 0 && nextTrackIndex < queue.length) {
      await TrackPlayer.skip(nextTrackIndex);
      const nextTrack = await TrackPlayer.getTrack(nextTrackIndex);
      if (nextTrack) {
        store.dispatch(
          setCurrentTrack({
            id: nextTrack.id ?? "",
            url: String(nextTrack.url ?? ""),
            position: nextTrack.position || 0,
            duration: nextTrack.duration,
            title: nextTrack.title,
            artist: nextTrack.artist,
            artwork:
              nextTrack.artwork !== undefined ? String(nextTrack.artwork) : undefined,
          })
        );
        await TrackPlayer.play();
        store.dispatch(setPlaying(true));
        console.log("Skipped to next track:", nextTrack.title);
      }
    } else {
      console.warn("No next track available");
      store.dispatch(setPlaying(false));
      store.dispatch(setCurrentTrack(null));
    }
  } catch (error) {
    console.error("Skip To Next Error:", error);
  }
};

export const skipToPrevious = async () => {
  try {
    const state = store.getState().player;
    const queue = await TrackPlayer.getQueue();

    if (!queue.length) {
      console.warn("Queue is empty");
      store.dispatch(setPlaying(false));
      store.dispatch(setCurrentTrack(null));
      return;
    }

    let prevTrackIndex: number;
    if (state.shuffle) {
      const mappedQueue = queue.map((track) => ({
        id: track.id || "",
        url: String(track.url || ""),
        title: track.title,
        artist: track.artist,
        artwork: track.artwork ? String(track.artwork) : undefined,
        duration: track.duration,
      }));
      prevTrackIndex = getRandomTrackIndex(mappedQueue, state.currentTrack);
    } else {
      const currentIndex = await TrackPlayer.getCurrentTrack();
      prevTrackIndex = currentIndex !== null ? currentIndex - 1 : 0;
      if (prevTrackIndex < 0 && state.loop === "queue") {
        prevTrackIndex = queue.length - 1; // Quay lại bài cuối nếu loop queue
      }
    }

    if (prevTrackIndex >= 0 && prevTrackIndex < queue.length) {
      await TrackPlayer.skip(prevTrackIndex);
      const prevTrack = await TrackPlayer.getTrack(prevTrackIndex);
      if (prevTrack) {
        store.dispatch(
          setCurrentTrack({
            id: prevTrack.id ?? "",
            url: String(prevTrack.url ?? ""),
            position: prevTrack.position || 0,
            duration: prevTrack.duration,
            title: prevTrack.title,
            artist: prevTrack.artist,
            artwork:
              prevTrack.artwork !== undefined ? String(prevTrack.artwork) : undefined,
          })
        );
        await TrackPlayer.play();
        store.dispatch(setPlaying(true));
        console.log("Skipped to previous track:", prevTrack.title);
      }
    } else {
      console.warn("No previous track available");
      store.dispatch(setPlaying(false));
      store.dispatch(setCurrentTrack(null));
    }
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
