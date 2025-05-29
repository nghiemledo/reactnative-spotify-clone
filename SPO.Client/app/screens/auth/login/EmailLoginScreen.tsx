import React, { memo } from "react";
import { YStack, XStack, Button } from "tamagui";
import { TouchableOpacity, StatusBar } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import EmailLoginForm from "../../../components/auth/EmailLoginForm";
import { SplashStackParamList } from "../../../navigation/SplashNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const EmailLoginScreen = () => {
  const navigation = useNavigation<NavigationProp<SplashStackParamList>>();
  return (
    <YStack flex={1} bg="#111">
      <XStack
        position="absolute"
        t={-20}
        l={-10}
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
};

export default memo(EmailLoginScreen);
