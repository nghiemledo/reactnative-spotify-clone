import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { YStack, XStack, Text, Input, Button } from "tamagui";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "@tamagui/linear-gradient";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { UserInfo } from "../../types/user";
import { useCreatePlaylistMutation } from "../../services/playlistServices";

interface AuthState {
  token: { accessToken: string; refreshToken: string } | null;
  user: UserInfo | null;
  role: string | null;
}

const CreatePlaylistScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useSelector((state: { auth: AuthState }) => state.auth.user);
  const [createPlaylist, { isLoading, error }] = useCreatePlaylistMutation();
  const [playlistName, setPlaylistName] = useState<string>("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) {
      console.error("Playlist name is required");
      return;
    }
    if (!user?.id) {
      console.error("User ID not found. Please log in.");
      return;
    }
    try {
      const response = await createPlaylist({
        title: playlistName,
        userId: user.id,
      }).unwrap();
      setPlaylistName("");
      navigation.navigate("DetailPlaylist", { id: response.data.id }); 
    } catch (err) {
      console.error("Failed to create playlist:", err);
    }
  };

  return (
    <>
      <LinearGradient
        flex={1}
        colors={["#D9F99D", "#000000"]}
        start={[0, 0]}
        end={[0, 1]}
      >
        <YStack flex={1} bg="transparent" p="$4" justify="center">
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
          {error && (
            <Text color="red" fontSize={16} text="center" mb="$4">
              Error: {JSON.stringify(error)}
            </Text>
          )}
          <Text
            color="white"
            fontSize={24}
            fontWeight="bold"
            text="center"
            mb="$6"
          >
            Give your playlist a name
          </Text>
          <Input
            placeholder="MY PLAYLIST"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            color="white"
            fontSize={26}
            borderWidth={0}
            borderBottomWidth={1}
            bg="transparent"
            fontWeight="bold"
            text="center"
            mb="$8"
            height="$7"
            pb={0}
            value={playlistName}
            onChangeText={setPlaylistName}
          />

          <XStack justify="center" space="$4">
            <Button
              size="$4"
              rounded="$10"
              bg="rgba(255, 255, 255, 0.2)"
              color="white"
              width="$8"
              fontWeight="bold"
              borderColor="white"
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Button>
            <Button
              size="$4"
              rounded="$10"
              width="$8"
              bg="#1DB954"
              color="black"
              fontWeight="bold"
              onPress={handleCreatePlaylist}
              disabled={isLoading || !playlistName.trim()}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </XStack>
        </YStack>
      </LinearGradient>
    </>
  );
};

export default CreatePlaylistScreen;