import { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import TrackPlayer, { Event, State, usePlaybackState, useProgress, Capability } from 'react-native-track-player';
import Slider from '@react-native-community/slider';

// Định nghĩa interface Track
interface Track {
  id: string;
  url: string;
  title?: string;
  artist?: string;
  artwork?: string;
}

const tracks: Track[] = [
  {
    id: 'track1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'SoundHelix Song 1',
    artist: 'SoundHelix',
    artwork: 'https://via.placeholder.com/150?text=Song+1',
  },
  {
    id: 'track2',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    title: 'SoundHelix Song 2',
    artist: 'SoundHelix',
    artwork: 'https://via.placeholder.com/150?text=Song+2',
  },
  {
    id: 'track3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    title: 'SoundHelix Song 3',
    artist: 'SoundHelix',
    artwork: 'https://via.placeholder.com/150?text=Song+3',
  },
];

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    console.log('TrackPlayer setup successfully');

    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
    });
    console.log('TrackPlayer options updated successfully');

    await TrackPlayer.add(tracks);
    console.log('Tracks added successfully');
  } catch (error) {
    console.error('Setup Player Error:', error);
  }
};

const App = () => {
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress(250);
  const [currentTrack, setCurrentTrack] = useState<{ title: string; artist: string; artwork: string } | null>(null);

  useEffect(() => {
    setupPlayer().catch((error) => console.error('Setup Player Error:', error));
    TrackPlayer.registerPlaybackService(() => require('./playbackService'));

    const trackChangeListener = TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (event) => {
      try {
        if (event.nextTrack !== null) {
          const track = await TrackPlayer.getTrack(event.nextTrack);
          if (track) {
            setCurrentTrack({
              title: track.title ?? 'Unknown Title',
              artist: track.artist ?? 'Unknown Artist',
              artwork: (typeof track.artwork === 'string' ? track.artwork : 'https://via.placeholder.com/150?text=No+Image') ?? 'https://via.placeholder.com/150?text=No+Image',
            });
            console.log('Track changed to:', track.title);
          } else {
            setCurrentTrack(null);
            console.log('No track found for index:', event.nextTrack);
          }
        }
      } catch (error) {
        console.error('Track Change Error:', error);
      }
    });

    return () => {
      try {
        TrackPlayer.reset();
        trackChangeListener.remove();
        console.log('Player reset successfully');
      } catch (error) {
        console.error('Cleanup Error:', error);
      }
    };
  }, []);

  const togglePlayback = async () => {
    try {
      if (playbackState === State.Playing) {
        await TrackPlayer.pause();
        console.log('Paused');
      } else if (playbackState === State.Paused || playbackState === State.Ready) {
        await TrackPlayer.play();
        console.log('Playing');
      }
    } catch (error) {
      console.error('Toggle Playback Error:', error);
    }
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      console.log('Skipped to next track');
    } catch (error) {
      console.error('Skip To Next Error:', error);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      console.log('Skipped to previous track');
    } catch (error) {
      console.error('Skip To Previous Error:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player Demo</Text>
      {currentTrack ? (
        <>
          <Image source={{ uri: currentTrack.artwork }} style={styles.artwork} />
          <Text style={styles.trackInfo}>{currentTrack.title}</Text>
          <Text style={styles.artistInfo}>{currentTrack.artist}</Text>
        </>
      ) : (
        <Text style={styles.trackInfo}>No track selected</Text>
      )}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#ccc"
      />
      <Text style={styles.time}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>
      <View style={styles.controls}>
        <Button title="Previous" onPress={skipToPrevious} />
        <Button
          title={playbackState === State.Playing ? 'Pause' : 'Play'}
          onPress={togglePlayback}
        />
        <Button title="Next" onPress={skipToNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  artwork: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  trackInfo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  artistInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  time: {
    fontSize: 16,
    marginVertical: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default App;