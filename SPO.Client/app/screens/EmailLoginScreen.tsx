import React, { memo } from "react";
import { YStack, XStack, Button } from "tamagui";
import { TouchableOpacity, StatusBar } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import EmailLoginForm from "../components/EmailLoginForm";

type EmailLoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EmailLogin"
>;

const EmailLoginScreen = ({
  navigation,
}: {
  navigation: EmailLoginScreenNavigationProp;
}) => {
  return (
    <YStack flex={1} backgroundColor="#111" paddingHorizontal={24}  paddingTop={80} >

      <XStack
        position="absolute"
        top={0}
        left={0}
        right={0}
        height={60}
        alignItems="center"
        paddingHorizontal="$3"
        backgroundColor="#000"
        zIndex={1000}
        paddingTop={StatusBar.currentHeight || 20}
      >
        <XStack flex={1} justifyContent="flex-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Button
              size="$8"
              chromeless
              icon={<ArrowLeft color="white" />}
              color="white"
              padding={0}
              backgroundColor="transparent"
              pressStyle={{
                backgroundColor: "transparent",
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
};

export default memo(EmailLoginScreen);
