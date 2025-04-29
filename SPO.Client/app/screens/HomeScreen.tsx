import { View, Text, Card, Colors, Image } from 'react-native-ui-lib';
import { FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useDispatch } from 'react-redux';
import { playSong } from '../store/playerSlice';

const playlists = [
  { id: '1', title: 'Chill Hits', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Top 50', image: 'https://via.placeholder.com/150' },
];


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const dispatch = useDispatch();

  return (
    <View flex bg-background padding-20>
      <Text white text30 marginB-20>
        Good Morning
      </Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            row
            marginB-10
            onPress={() => navigation.navigate('Album', { id: item.id })}
          >
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
            <View marginL-10>
              <Text white text70>
                {item.title}
              </Text>
            </View>
          </Card>
        )}
      />
      <Text
        white
        text70
        onPress={() => {
          dispatch(playSong('Song Title'));
          navigation.navigate('PlayerModal');
        }}
      >
        Play Song
      </Text>
    </View>
  );
}