import TrackPlayer, { Event } from 'react-native-track-player';

export async function playbackService() {
  try {
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      TrackPlayer.play().catch((error) => console.error('Play Error:', error));
      console.log('Remote Play triggered');
    });

    TrackPlayer.addEventListener(Event.RemotePause, () => {
      TrackPlayer.pause().catch((error) => console.error('Pause Error:', error));
      console.log('Remote Pause triggered');
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
      TrackPlayer.skipToNext().catch((error) => console.error('Next Error:', error));
      console.log('Remote Next triggered');
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
      TrackPlayer.skipToPrevious().catch((error) => console.error('Previous Error:', error));
      console.log('Remote Previous triggered');
    });

    TrackPlayer.addEventListener(Event.RemoteStop, () => {
      TrackPlayer.reset().catch((error) => console.error('Stop Error:', error));
      console.log('Remote Stop triggered');
    });

    console.log('Playback service registered successfully');
  } catch (error) {
    console.error('Playback Service Error:', error);
  }
}