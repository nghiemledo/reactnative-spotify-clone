import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, Dimensions } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { YStack, Text, Button } from "tamagui";
import { MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { playSong } from "../services/playerService";
import { Song } from "../types/song";
import { Track } from "../types/track";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ScanScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  // Xử lý quyền camera
  useEffect(() => {
    const requestCameraPermission = async () => {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Quyền truy cập camera",
          "Ứng dụng cần quyền camera để quét mã QR. Vui lòng cấp quyền trong cài đặt thiết bị.",
          [{ text: "OK" }]
        );
      }
    };
    requestCameraPermission();
  }, [requestPermission]);

  // Kiểm tra dữ liệu quét được từ mã QR
  const validateSongData = (song: Song): boolean => {
    return !!song.audioUrl && !!song.id; // Kiểm tra các trường bắt buộc
  };

  // Cấu hình quét mã QR
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (scanned || !codes[0]?.value) return;
      setScanned(true);

      try {
        const song: Song = JSON.parse(codes[0].value);
        if (!validateSongData(song)) {
          throw new Error("Dữ liệu bài hát không hợp lệ");
        }


        console.log("Quét mã QR:", song);

        playSong(song);
        navigation.navigate("Playing");
      } catch (error) {
        Alert.alert("Lỗi", "Mã QR không hợp lệ hoặc dữ liệu bài hát không đúng");
        setScanned(false);
      }
    },
  });

  // Xử lý trạng thái quyền camera
  if (!hasPermission) {
    return (
      <YStack flex={1} justify="center" items="center" space="$4">
        <Text fontSize="$5">Không có quyền truy cập camera</Text>
        <Button onPress={requestPermission}>Yêu cầu lại quyền</Button>
      </YStack>
    );
  }

  // Xử lý trường hợp không có camera
  if (!device) {
    return (
      <YStack flex={1} justify="center" items="center">
        <Text fontSize="$5">Không tìm thấy camera</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} justify="center" items="center">
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 500 }}
      >
        <YStack flex={1} justify="center" items="center" space="$4">
          <Camera
            style={styles.camera}
            device={device}
            isActive={!scanned} // Tạm dừng camera sau khi quét thành công
            codeScanner={codeScanner}
          />
          <Text fontSize="$4">Quét mã QR để chia sẻ bài hát</Text>
          <Button onPress={() => setScanned(false)} disabled={!scanned}>
            Quét lại
          </Button>
        </YStack>
      </MotiView>
    </YStack>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.8,
    borderRadius: 10,
    overflow: "hidden",
  },
});