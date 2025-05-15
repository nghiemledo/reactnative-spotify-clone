import React, { memo } from "react";
import { YStack, XStack, Button } from "tamagui";
import { TouchableOpacity, StatusBar } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import EmailLoginForm from "../../../components/EmailLoginForm";
import { SlpashStackParamList } from "../../../navigation/SplashNavigator";

type EmailLoginScreenNavigationProp = NativeStackNavigationProp<
  SlpashStackParamList,
  "EmailLogin"
>;

export default function EmailLoginScreen({
  navigation,
}: {
  navigation: EmailLoginScreenNavigationProp;
}) {
  return (
    <YStack flex={1} bg="#111">
      <XStack
        position="absolute"
        t={0}
        l={0}
        r={0}
        height={60}
        items="center"
        px="$3"
        bg="#000"
        z={1000}
        pt={StatusBar.currentHeight || 20}
      >
        <XStack flex={1} justify="flex-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Button
              size="$8"
              chromeless
              icon={<ArrowLeft color="white" />}
              color="white"
              p={0}
              bg="transparent"
              pressStyle={{
                bg: "transparent",
                borderBlockColor: "transparent",
              }}
            />
          </TouchableOpacity>
        </XStack>

        <XStack flex={1} />
      </XStack>

      {/* Form */}
      <EmailLoginForm navigation={navigation} />
    </YStack>
  );
}
