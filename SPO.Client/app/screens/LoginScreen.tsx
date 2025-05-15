import React from "react";
import { YStack, Button, Text, Image, XStack } from "tamagui";
import { Mail, Smartphone } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "login"
>;

export default function LoginScreen({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  return (
    <YStack
      flex={1}
      alignItems="center"
      backgroundColor="#000"
      padding="$4"
      space="$4"
    >
        <YStack height={"50%"} alignItems="center" justifyContent="center">
        <Text fontSize="$8" fontWeight="bold" color="#fff" marginBottom="$6">
          Spotify
        </Text>
        <Text fontSize="$9" textAlign="center" fontWeight="bold" color="#fff">
          Đăng nhập đến Spotify
        </Text>
      </YStack>

      <YStack width="100%" space="$3">
        {[
          {
            icon: <Mail color="black" size="$2" />,
            text: "Đăng nhập với email",
            bg: "#1DB954",
            textColor: "black",
            onPress: () => navigation.navigate("EmailLogin"),
            accessibilityLabel: "Đăng nhập bằng email",
          },
          {
            icon: <Smartphone color="#fff" size="$2" />,
            text: "Đăng nhập bằng số điện thoại",
            bg: "transparent",
            borderColor: "#fff",
            borderWidth: 1,
            textColor: "#fff",
            // onPress: () => navigation.navigate('PhoneLogin'),
            accessibilityLabel: "Đăng nhập bằng số điện thoại",
          },
          {
            icon: (
              <Image
                source={require("../assets/logo-gg.png")}
                width="$2"
                height="$2"
                resizeMode="contain"
              />
            ),
            text: "Đăng nhập với Google",
            bg: "transparent",
            borderColor: "#fff",
            borderWidth: 1,
            textColor: "#fff",
            // onPress: () => navigation.navigate('GoogleAuth'),
            accessibilityLabel: "Đăng nhập bằng Google",
          },
        ].map(
          (
            {
              icon,
              text,
              bg,
              textColor,
              borderColor,
              borderWidth,
              onPress,
              accessibilityLabel,
            },
            index
          ) => (
            <Button
              key={index}
              backgroundColor={bg}
              borderColor={borderColor}
              borderWidth={borderWidth}
              borderRadius="$10"
              height="$5"
              paddingVertical="$3"
              width="100%"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              onPress={onPress}
              accessibilityLabel={accessibilityLabel}
            >
              {icon}
              <Text
                color={textColor}
                fontSize="$5"
                flex={1}
                textAlign="center"
                fontWeight="bold"
              >
                {text}
              </Text>
            </Button>
          )
        )}
      </YStack>

      <XStack alignItems="center" justifyContent="center" marginTop="$4">
        <Text color="#fff" fontSize="$4">
          Bạn chưa có tài khoản?{" "}
        </Text>
        <Text
          color="#1DB954"
          fontSize="$4"
          fontWeight="bold"
          onPress={() => navigation.navigate("Main", { screen: "register" })}
        >
          Đăng ký
        </Text>
      </XStack>
    </YStack>
  );
}
