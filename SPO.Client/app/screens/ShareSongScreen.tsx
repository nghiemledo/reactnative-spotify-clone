import { useState } from "react";
import { View, Dimensions } from "react-native";
import { YStack, XStack, Text, Button } from "tamagui";
import { X, Scan } from "@tamagui/lucide-icons";
import { MotiView, MotiText, AnimatePresence } from "moti";
import QRCode from "react-native-qrcode-svg";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Song } from "../types/song";
import SafeImage from "../components/SafeImage";
import { LinearGradient } from "expo-linear-gradient";
import { useGetArtistByIdQuery } from "../services/ArtistService";

const { width, height } = Dimensions.get("window");

type ShareSongScreenRouteParams = {
  params: { song: Song };
};

export default function ShareSongScreen() {
  const route = useRoute<RouteProp<ShareSongScreenRouteParams, "params">>();
  const { song } = route.params || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isVisible, setIsVisible] = useState(true);
  const [qrGenerated, setQrGenerated] = useState(false);

  // Tạo dữ liệu cho mã QR (JSON string chứa thông tin bài hát)
  const qrData = JSON.stringify(song);

  const {
    data: artist,
    isLoading: isArtistLoading,
    error: artistError,
  } = useGetArtistByIdQuery(song?.artistId || "");

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => navigation.goBack(), 400);
  };

  // Trigger QR generation animation after component mounts
  useState(() => {
    const timer = setTimeout(() => setQrGenerated(true), 400);
    return () => clearTimeout(timer);
  });

  return (
    <YStack flex={1} bg="#000000">
      {/* Animated Background Gradient */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 600 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
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

      {/* Header with Simple Animation */}
      <AnimatePresence>
        {isVisible && (
          <MotiView
            from={{ translateY: -50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -50, opacity: 0 }}
            transition={{ type: "timing", duration: 400 }}
          >
            <XStack
              position="absolute"
              t="$4"
              l="$4"
              r="$4"
              z={1000}
              justify="space-between"
              items="center"
            >
              <Button
                size="$4"
                chromeless
                p={8}
                rounded={100}
                icon={<X size={30} color="white" />}
                bg="rgba(0,0,0,0.5)"
                onPress={handleClose}
              />
            </XStack>
          </MotiView>
        )}
      </AnimatePresence>

      {/* Main Content with Simplified Animations */}
      <YStack flex={1} justify="center" items="center" p="$6">
        <AnimatePresence>
          {isVisible && (
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 50 }}
              transition={{ type: "timing", duration: 600 }}
            >
              <YStack
                bg="rgba(255, 255, 255, 0.95)"
                backdropFilter="blur(20px)"
                p="$8"
                rounded="$8"
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 10 }}
                shadowOpacity={0.2}
                shadowRadius="$6"
                items="center"
                space="$6"
                width={width * 0.85}
              >
                {/* Song Info */}
                <YStack items="center" space="$4">
                  <XStack>
                    <SafeImage
                      uri={song?.coverImage}
                      width={80}
                      height={80}
                      rounded={5}
                      mr="$2"
                    />
                    <YStack items="flex-start" justify="center" space="$2">
                      <MotiText
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          type: "timing",
                          duration: 600,
                          delay: 200,
                        }}
                      >
                        <Text fontSize={20} fontWeight="bold" numberOfLines={1}>
                          {song?.title || "Unknown Song"}
                        </Text>
                      </MotiText>
                      <MotiText
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          type: "timing",
                          duration: 600,
                          delay: 300,
                        }}
                        style={{
                          fontSize: 15,
                          fontWeight: "500",
                          color: "#666",
                          textAlign: "center",
                        }}
                      >
                        {artist?.data?.name || "Unknown Artist"}
                      </MotiText>
                    </YStack>
                  </XStack>
                </YStack>

                {/* QR Code with Simple Animation */}
                <MotiView
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: qrGenerated ? 1 : 0,
                    scale: qrGenerated ? 1 : 0.8,
                  }}
                  transition={{ type: "timing", duration: 600, delay: 400 }}
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 20,
                    shadowColor: "#6366f1",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.05)",
                  }}
                >
                  <QRCode
                    value={qrData}
                    size={180}
                    backgroundColor="transparent"
                    color="#1a1a1a"
                    logoSize={30}
                    logoMargin={2}
                    logoBorderRadius={8}
                  />
                </MotiView>

                {/* Instructions */}
                <YStack items="center" space="$2">
                  <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 600, delay: 500 }}
                  >
                    <XStack items="center" space="$2">
                      <Scan size={20} color="#6366f1" />
                      <Text
                        fontSize="$4"
                        fontWeight="600"
                        color="#333"
                        text="center"
                      >
                        Scan to Listen
                      </Text>
                    </XStack>
                  </MotiView>
                  <MotiText
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 600, delay: 600 }}
                    style={{
                      fontSize: 14,
                      color: "#888",
                      textAlign: "center",
                      maxWidth: 250,
                    }}
                  >
                    Use any QR code scanner to access this song instantly
                  </MotiText>
                </YStack>
              </YStack>
            </MotiView>
          )}
        </AnimatePresence>
      </YStack>

      {/* Simplified Particle Effect
      {[...Array(5)].map((_, i) => (
        <MotiView
          key={`particle-${i}`}
          from={{ 
            translateY: height,
            translateX: Math.random() * width,
            opacity: 0
          }}
          animate={{ 
            translateY: 0,
            translateX: Math.random() * width,
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            type: "timing", 
            duration: 2000 + (i * 200), 
            loop: true,
            delay: 1000 + (i * 200)
          }}
          style={{
            position: 'absolute',
            width: 3,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: 'rgba(255,255,255,0.4)',
          }}
        />
      ))} */}
    </YStack>
  );
}
