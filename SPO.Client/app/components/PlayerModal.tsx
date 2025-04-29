import { View, Text, Button, Colors } from 'react-native-ui-lib';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { pauseSong } from '../store/playerSlice';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';


type PlayerModalNavigationProp = StackNavigationProp<RootStackParamList, 'PlayerModal'>;

export default function PlayerModal({ navigation }: { navigation: PlayerModalNavigationProp }) {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state: RootState) => state.player);

  return (
    <View flex center padding-20 bg-background>
      <Text white text40>
        Now Playing
      </Text>
      <Text white text60 marginV-10>
        {currentSong || 'No Song Selected'}
      </Text>
      <View row center>
        <Ionicons name="play-skip-back" size={30} color={Colors.white} />
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={40}
          color={Colors.primary}
          style={{ marginHorizontal: 20 }}
          onPress={() => dispatch(pauseSong())}
        />
        <Ionicons name="play-skip-forward" size={30} color={Colors.white} />
      </View>
      <Button
        label="Close"
        backgroundColor={Colors.primary}
        marginT-20
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}