import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View, XStack } from "tamagui";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { YStack } from "tamagui";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { Animated } from "react-native";
import { HomeStackParamList } from "../../navigation/HomeNavigator";

type AddSongPlaylistsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddSongPlaylists"
>;
export const AddSongPlaylistsScreen = ({
  navigation,
}: {
  navigation: AddSongPlaylistsScreenNavigationProp;
}) => {
  return (
    <YStack flex={1} bg="#121212">
      <XStack
        items="center"
        justify="center"
        px={16}
        height={60}
        bg="#222"
        position="relative"
      >
        <Button
          chromeless
          icon={<ArrowLeft size={24} />}
          size="$4"
          color="white"
          bg="transparent"
          p={0}
          position="absolute"
          l={16}
          onPress={() => navigation.goBack()}
        />
        <Text color="white" fontSize={20} fontWeight="bold">
          Add to playlist
        </Text>
      </XStack>
      <Button
        bg="white"
        my={30}
        mx="auto"
        rounded={50}
        height={50}
        // onPress={() => navigation.navigate("AddPlaylist")}
      >
        <Text fontWeight="bold" fontSize={18}>
          New playlist
        </Text>
      </Button>
    </YStack>
  );
};
