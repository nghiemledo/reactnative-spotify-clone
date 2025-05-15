import React, { useEffect } from "react";
import { YStack, XStack, Button, Text, Image } from "tamagui";
import { Mail, Smartphone } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { SlpashStackParamList } from "../../../navigation/SplashNavigator";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  SlpashStackParamList,
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
    <YStack flex={1} items="center" bg="#000" p="$4">
      <YStack height={"50%"} items="center" justify="center">
        <Text
          fontSize="$9"
          text="center"
          fontWeight="bold"
          color="#fff"
          mb="$2"
        >
          Sign up to start
        </Text>
        <Text fontSize="$9" text="center" fontWeight="bold" color="#fff">
          Listening
        </Text>
      </YStack>

      <YStack width={"100%"} justify="center">
        <Button
          bg="#1DB954"
          rounded="$10"
          my="$2"
          py="$3"
          height="$5"
          width="100%"
          flexDirection="row"
          items="center"
          justify="flex-start"
          onPress={handleEmailRegister}
        >
          <Mail color="black" size="$2" />
          <Text
            color="black"
            fontSize="$5"
            flex={1}
            text="center"
            fontWeight="bold"
          >
            Continue with email
          </Text>
        </Button>
        <Button
          bg="transparent"
          borderColor="#fff"
          borderWidth={1}
          rounded="$10"
          height="$5"
          my="$2"
          py="$3"
          width="100%"
          flexDirection="row"
          items="center"
          justify="flex-start"
        >
          <Smartphone color="#fff" size="$2" />
          <Text
            color="#fff"
            fontSize="$5"
            flex={1}
            text="center"
            fontWeight="bold"
          >
            Continue with phone number
          </Text>
        </Button>
        <Button
          bg="transparent"
          borderColor="#fff"
          borderWidth={1}
          rounded="$10"
          my="$2"
          height="$5"
          py="$3"
          width="100%"
          flexDirection="row"
          items="center"
          justify="flex-start"
        >
          <Image
            source={require("../../../assets/logo-gg.png")}
            height={"$3"}
            width={"$3"}
          />
          <Text
            color="#fff"
            fontSize="$5"
            flex={1}
            text="center"
            fontWeight="bold"
          >
            Continue with Google
          </Text>
        </Button>
        <XStack items="center" justify="center" mt="$4">
          <Text color="#fff" fontSize="$4">
            Already have an account?{" "}
          </Text>
          <Text
            color="#1DB954"
            fontSize="$4"
            fontWeight="bold"
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
