import React, { useState, useEffect } from "react";
import { Dimensions, Alert } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { YStack, XStack, Text, Button } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { MotiView, MotiText } from "moti";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { playSong } from "../services/playerService";
import { Song } from "../types/song";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

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
    return !!song.audioUrl && !!song.id;
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
        Alert.alert(
          "Lỗi",
          "Mã QR không hợp lệ hoặc dữ liệu bài hát không đúng"
        );
        setScanned(false);
      }
    },
  });

  // Xử lý trạng thái quyền camera
  if (!hasPermission) {
    return (
      <YStack flex={1} justify="center" items="center" space="$4">
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
        >
          <Text fontSize={20} color="white">
            Không có quyền truy cập camera
          </Text>
          <Button
            size="$4"
            bg="#6366f1"
            color="white"
            mt="$4"
            rounded={8}
            onPress={requestPermission}
          >
            Yêu cầu lại quyền
          </Button>
        </MotiView>
      </YStack>
    );
  }

  // Xử lý trường hợp không có camera
  if (!device) {
    return (
      <YStack flex={1} justify="center" items="center" bg="#000000">
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
        >
          <Text fontSize={20} color="white">
            Không tìm thấy camera
          </Text>
        </MotiView>
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="#000000">
      {/* Gradient Background */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 600 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <LinearGradient
          colors={["#1a1a2e", "#16213e", "#0f3460"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: height,
          }}
        />
      </MotiView>

      {/* Nút X ở góc trên trái */}
      <MotiView
        from={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "timing", duration: 400 }}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <Button
          size="$4"
          ml={10}
          chromeless
          p={8}
          rounded={100}
          icon={<X size={28} color="white" />}
          bg="rgba(0,0,0,0.2)"
          onPress={() => navigation.goBack()}
        />
      </MotiView>
 
      {/* Camera and Overlay */}
      <YStack flex={1} justify="center" items="center" space="$4">
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 600 }}
          style={{
            width: width * 0.8,
            height: width * 0.8,
            borderRadius: 10,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Camera
            style={{
              width: "100%",
              height: "100%",
            }}
            device={device}
            isActive={!scanned}
            codeScanner={codeScanner}
          />
          {/* Overlay with Transparent Center */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ type: "timing", duration: 600 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <YStack
              width={width * 0.8}
              height={width * 0.8}
              borderWidth={2}
              borderColor="#6366f1"
              rounded={10}
              overflow="hidden"
            >
              {/* Scanning Line Animation */}
              <MotiView
                animate={{
                  translateY: scanned ? 0 : [0, width * 0.8 - 4],
                }}
                transition={{
                  type: "timing",
                  duration: 1500,
                  loop: !scanned,
                  delay: 600,
                }}
                style={{
                  height: 2,
                  backgroundColor: "#6366f1",
                  width: "100%",
                }}
              />
            </YStack>
          </MotiView>
        </MotiView>

        {/* Instructions Text */}
        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "white",
            textAlign: "center",
          }}
        >
          Quét mã QR để phát bài hát
        </MotiText>

        {/* Rescan Button with Pulse Effect */}
        <MotiView
          from={{ scale: 1 }}
          animate={{ scale: scanned ? [1, 1.05, 1] : 1 }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: scanned,
            delay: 600,
          }}
        >
          <Button
            size="$4"
            bg={scanned ? "#6366f1" : "#888"}
            color="white"
            rounded={8}
            onPress={() => setScanned(false)}
            // disabled={!scanned}
          >
            Scan again
          </Button>
        </MotiView>
      </YStack>
    </YStack>
  );
}
