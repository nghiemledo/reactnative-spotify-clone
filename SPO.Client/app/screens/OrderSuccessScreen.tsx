import React from "react";
import { YStack, Text, Button, XStack, AnimatePresence } from "tamagui";
import { CheckCircle } from "@tamagui/lucide-icons";
import { LinearGradient } from "@tamagui/linear-gradient";
import { PremiumStackParamList } from "../navigation/PremiumNavigator";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";

// Define navigation params type

const OrderSuccessScreen = () => {
  const navigation =
    useNavigation<NavigationProp<PremiumStackParamList>>();
  const route = useRoute<RouteProp<PremiumStackParamList, "OrderSuccess">>();
  const { plan, amount, currency, createTime } = route.params;
  const formatVND = (usdAmount: string) => {
    const exchangeRate = 23000;
    const vndAmount = parseFloat(usdAmount) * exchangeRate;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(vndAmount);
  };
  return (
    <YStack
      flex={1}
      bg="#121212"
      p="$5"
      items="center"
      justify="center"
      space="$4"
    >
      {/* Gradient Background Overlay */}
      <LinearGradient
        position="absolute"
        t={0}
        l={0}
        r={0}
        b={0}
        colors={["rgba(29, 185, 84, 0.2)", "transparent"]}
        start={[0, 0]}
        end={[0, 0.5]}
      />

      {/* Animated Check Circle Icon */}
      <AnimatePresence>
        <YStack
          animation="bouncy"
          enterStyle={{ scale: 0, opacity: 0 }}
          exitStyle={{ scale: 0, opacity: 0 }}
          scale={1}
          opacity={1}
          mb="$6"
        >
          <CheckCircle size={80} color="#1DB954" />
        </YStack>
      </AnimatePresence>

      {/* Success Message */}
      <Text
        color="#fff"
        fontSize={28}
        fontWeight="900"
        letterSpacing={-0.5}
        mb="$4"
        text="center"
        animation="lazy"
        enterStyle={{ y: 20, opacity: 0 }}
        y={0}
        opacity={1}
      >
        Account Upgraded Successfully!
      </Text>

      {/* Plan Information */}
      <Text
        color="#B3B3B3"
        fontSize={18}
        fontWeight="600"
        mb="$5"
        text="center"
      >
        Plan: {plan}
      </Text>

      {/* Order Details Card */}
      <YStack
        bg="#222222"
        p="$4"
        rounded={12}
        width="90%"
        mb="$6"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.3}
        shadowRadius={8}
        animation="lazy"
        enterStyle={{ y: 20, opacity: 0 }}
        y={0}
        opacity={1}
      >
        <XStack justify="space-between" mb="$2">
          <Text color="#B3B3B3" fontSize={14} fontWeight="500">
            Amount:
          </Text>
          <Text color="#fff" fontSize={14} fontWeight="700">
            {formatVND(amount)}
          </Text>
        </XStack>
        <XStack justify="space-between">
          <Text color="#B3B3B3" fontSize={14} fontWeight="500">
            Time:
          </Text>
          <Text color="#fff" fontSize={14} fontWeight="700">
            {new Date(createTime).toLocaleString()}
          </Text>
        </XStack>
      </YStack>

      {/* Back Button */}
      <Button
        items="center"
        justify="center"
        rounded={32}
        bg="#1DB954"
        height={48}
        width="60%"
        onPress={() => navigation.goBack()}
        hoverStyle={{ bg: "#17a34a" }}
        pressStyle={{ bg: "#17a34a" }}
        animation="bouncy"
      >
        <Text fontWeight="700" fontSize={16} color="#fff">
          Back to Premium
        </Text>
      </Button>
    </YStack>
  );
};

export default OrderSuccessScreen;
