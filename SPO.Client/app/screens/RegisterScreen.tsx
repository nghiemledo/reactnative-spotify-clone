import React, { useEffect } from "react";
import { YStack, XStack, Button, Text, Image } from "tamagui";
import { Mail, Smartphone } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

export default function RegisterScreen({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) {
  const handleEmailRegister = () => {
    navigation.navigate("EmailRegister");
  };

  return (
    <YStack flex={1} alignItems="center" backgroundColor="#000" padding="$4">
      <YStack height={"50%"} alignItems="center" justifyContent="center">
        <Text fontSize="$8" fontWeight="bold" color="#fff" marginBottom="$6">
          Spotify
        </Text>
        <Text
          fontSize="$9"
          textAlign="center"
          fontWeight="bold"
          color="#fff"
          marginBottom="$2"
        >
          Đăng ký để bắt đầu để nghe
        </Text>
      </YStack>

      <YStack width={"100%"} justifyContent="center">
        <Button
          backgroundColor="#1DB954"
          borderRadius="$10"
          marginVertical="$2"
          paddingVertical="$3"
          height="$5"
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          onPress={handleEmailRegister}
        >
          <Mail color="black" size="$2" />
          <Text
            color="black"
            fontSize="$5"
            flex={1}
            textAlign="center"
            fontWeight="bold"
          >
            Tiếp tục với email
          </Text>
        </Button>
        <Button
          backgroundColor="transparent"
          borderColor="#fff"
          borderWidth={1}
          borderRadius="$10"
          height="$5"
          marginVertical="$2"
          paddingVertical="$3"
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Smartphone color="#fff" size="$2" />
          <Text
            color="#fff"
            fontSize="$5"
            flex={1}
            textAlign="center"
            fontWeight="bold"
          >
            Tiếp tục bằng số điện thoại
          </Text>
        </Button>
        <Button
          backgroundColor="transparent"
          borderColor="#fff"
          borderWidth={1}
          borderRadius="$10"
          marginVertical="$2"
          height="$5"
          paddingVertical="$3"
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Image
            source={require("../assets/logo-gg.png")}
            height={"$3"}
            width={"$3"}
          />
          <Text
            color="#fff"
            fontSize="$5"
            flex={1}
            textAlign="center"
            fontWeight="bold"
          >
            Tiếp tục bằng Google
          </Text>
        </Button>
        <XStack alignItems="center" justifyContent="center" marginTop="$4">
          <Text color="#fff" fontSize="$4">
            Bạn đã có tài khoản?{" "}
          </Text>
          <Text
            color="#1DB954"
            fontSize="$4"
            fontWeight="bold"
            onPress={() => navigation.navigate("Main", { screen: "login" })}
          >
            Đăng nhập
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
