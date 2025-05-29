import React from "react"
import { YStack, Text, Image } from "tamagui"
import { MotiView } from "moti"
import { useAppSelector, RootState } from "../store"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { SplashStackParamList } from "../navigation/SplashNavigator"

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<SplashStackParamList>>()
  const user = useAppSelector((state: RootState) => state.auth.user)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Main")
    }, 2500)
    return () => clearTimeout(timer)
  }, [user, navigation])

  return (
    <YStack flex={1} bg="black" justify="center" items="center">
      {/* Logo trượt lên và phóng to */}
      <MotiView
        from={{ translateY: 0, opacity: 0.5, scale: 0.5 }}
        animate={{ translateY: -10, opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 1000 }}
        style={{
          marginBottom: 16,
          shadowColor: "#1DB954",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 30,
          elevation: 20,
        }}
      >
        <Image
          source={require("../assets/LogoSpotify.png")}
          style={{ width: 130, height: 130 }}
          resizeMode="contain"
        />
      </MotiView>

      {/* Chữ Spotify trượt xuống */}
      <MotiView
        from={{ translateY: 0, opacity: 0 }}
        animate={{ translateY: 10, opacity: 1 }}
        transition={{ delay: 300, duration: 1000, type: "timing" }}
      >
        <Text fontSize={30} fontWeight="800" color="#1DB954" text="center">
          Spotify
        </Text>
      </MotiView>
    </YStack>
  )
}

export default SplashScreen
