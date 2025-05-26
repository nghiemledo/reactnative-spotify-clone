import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { YStack, Text, Button } from "tamagui";
import QRCode from "react-native-qrcode-svg";
import { MotiView } from "moti";
import { Song } from "../types/song";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ShareSongScreenRouteParams = {
  song: Song;
};

export default function ShareSongScreen({ song }: { song: Song }) {
  const route =
    useRoute<RouteProp<{ params: ShareSongScreenRouteParams }, "params">>();
  const { song: routeSong } = route.params || {};
  // Tạo dữ liệu cho mã QR (có thể là JSON string chứa thông tin bài hát)
  const qrData = JSON.stringify(routeSong);
  const [isVisible, setIsVisible] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <YStack space="$4" p="$4" items="center" justify="center">
      <MotiView
        from={{ opacity: 0, translateY: 100 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          translateY: isVisible ? 0 : 100,
        }}
        transition={{ type: "spring", duration: 500 }}
      >
        <YStack
          flex={1}
          justify="center"
          items="center"
          space="$4"
          bg="$background"
        >
          <Text fontSize="$6" fontWeight="bold">
            Share: {routeSong.title}
          </Text>
          <QRCode value={qrData} size={200} />
          <Button
            onPress={() => {
              setIsVisible(false);
              navigation.goBack();
            }}
          >
            Close
          </Button>
        </YStack>
      </MotiView>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
