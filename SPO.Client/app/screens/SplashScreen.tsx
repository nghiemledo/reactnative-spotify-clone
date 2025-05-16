import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { YStack, View, Image } from "tamagui";
import { MotiView } from "moti";
import { RootState, useAppSelector } from "../store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SlpashStackParamList } from "../navigation/SplashNavigator";
import { Text } from "tamagui";
import { HomeStackParamList } from "../navigation/HomeNavigator";

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<SlpashStackParamList>>();
  const user = useAppSelector((state: RootState) => state.auth.user);

  React.useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    }, 2000);
  }, [user, navigation]);

  return (
    <LinearGradient
      colors={["#1DB954", "#191414"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <YStack flex={1} justify="center" items="center" space="$4">
        {/* Spotify Logo with Moti animation */}
        <MotiView
          from={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ type: "timing", duration: 1000, loop: true }}
        >
          <Text fontSize={24} mb={20} fontWeight={600} color="white">
            Spotify Clone
          </Text>
        </MotiView>
        {/* Loading Dots */}
        <YStack flexDirection="row" space="$2">
          {[...Array(3)].map((_, index) => (
            <MotiView
              key={index}
              from={{ translateY: 0 }}
              animate={{ translateY: -10 }}
              transition={{
                type: "timing",
                duration: 500,
                delay: index * 200,
                loop: true,
              }}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "white",
              }}
            />
          ))}
        </YStack>
      </YStack>
    </LinearGradient>
  );
};

export default SplashScreen;
