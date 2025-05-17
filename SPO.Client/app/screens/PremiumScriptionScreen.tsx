import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Animated,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import { YStack, XStack, Text, Image, H3, Button } from "tamagui";
import {
  ArrowLeft,
  CheckCircle,
  Download,
  Shuffle,
  Headphones,
  Users,
  List,
  MoreVertical,
  Play,
  BellDot,
  VolumeX,
  CircleArrowDown,
  ListPlus,
  Star,
} from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/HomeNavigator";
import { LinearGradient } from "@tamagui/linear-gradient";

type PremiumSubscriptionScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Premium"
>;

export default function PremiumSubscriptionScreen({
  navigation,
}: {
  navigation: PremiumSubscriptionScreenNavigationProp;
}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <YStack flex={1} bg="#121212">
      <Animated.Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2019/02/08/17/57/cubes-3983666_1280.jpg",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 460,
        }}
        resizeMode="cover"
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack height={200} />
        <LinearGradient
          flex={1}
          colors={["transparent", "#121212"]}
          start={[0, 0]}
          end={[0, 0.1]}
          p="$4"
        >
          <YStack>
            <XStack items="center">
                <Star size={30} color="#fff" />
                <Text ml={7} color="#fff" fontSize={30} fontWeight="bold">
                  Premium
                </Text>
              </XStack> 
            <Text mb={10}>
              <H3 color="white" fontSize={30} fontWeight="bold">
                Get 4 months of Premium for ₫59,000 with Spotify
              </H3>
            </Text>
            <XStack
              bg="rgba(128, 128, 128, 0.2)"
              items="center"
              my={15}
              p={10}
              width={200}
              rounded={3}
            >
              <BellDot size={18} color="#1E90FF" mr={5} />
              <Text color="white" fontSize={16} fontWeight="400">
                Offer ends in 2 days
              </Text>
            </XStack>
            <Button
              items="center"
              rounded={50}
              bg="#fff"
              my={15}
              height={55}
              onPress={() =>
                console.log("You bought Spotify Premium. Thank You!")
              }
            >
              <Text fontWeight="bold" fontSize={18}>
                Try 4 months for ₫59,000
              </Text>
            </Button>

            <Text color="gray" my={15}>
              ₫59,000 for 4 months, then ₫59,000 per month after. Offer only
              available if you haven’t tried Premium before and you subscribe
              via Spotify. Offers via Google Play may differ. Terms apply. Offer
              ends May 19, 2025.
            </Text>
            <YStack my={15} py={30} bg="#222222" rounded={13} overflow="hidden">
              <Text
                fontWeight="bold"
                color="#fff"
                fontSize={20}
                px={20}
                pb={15}
              >
                Why join Premium?
              </Text>
              <XStack height={1} bg="#555555"></XStack>
              <XStack py={15} px={20}>
                <VolumeX color="#fff" />
                <Text ml={10} color="#fff">
                  Ad-free music listening
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <CircleArrowDown color="#fff" />
                <Text ml={10} color="#fff">
                  Download to listen offline
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <Shuffle color="#fff" />
                <Text ml={10} color="#fff">
                  Play songs in any order
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <Headphones color="#fff" />
                <Text ml={10} color="#fff">
                  High audio quality
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <Users color="#fff" />
                <Text ml={10} color="#fff">
                  Listen with friends in real time
                </Text>
              </XStack>
              <XStack pt={15} px={20}>
                <ListPlus color="#fff" />
                <Text ml={10} color="#fff">
                  Organize listening queue
                </Text>
              </XStack>
            </YStack>

            <Text
              borderBottomColor="#555555"
              fontWeight="bold"
              color="#fff"
              fontSize={20}
              pt={25}
              pb={15}
            >
              Available plans
            </Text>
            <YStack my={15} bg="#222222" rounded={13} overflow="hidden">
              <XStack
                p={5}
                bg="#FFCCCC"
                width={215}
                items="center"
                justify="center"
                borderBottomRightRadius={8}
              >
                <Text color="#000" fontSize={16} fontWeight="bold">
                  ₫59,000 for 4 months
                </Text>
              </XStack>
              <XStack py={15} px={20} >
                <Star color="#fff" />
                <Text ml={7} color="#fff" fontSize={16} fontWeight="bold">
                  Premium
                </Text>
              </XStack> 
              <Text px={20} pb={15} color="#FFCCCC" fontSize={21} fontWeight="bold">
                Individual
              </Text>
              <Text px={20} color="#fff" fontSize={17} fontWeight="bold">
                ₫59,000 for 4 months
              </Text>
              <Text px={20} pb={15} color="gray" fontSize={14}>
                ₫59,000 / month after
              </Text>
              <XStack height={1} bg="#555555"></XStack>
              <YStack pl={40} py={20}>
                <Text color="#fff" fontSize={16}>•  1 Premium account</Text>
                <Text color="#fff" fontSize={16}>•  Cancle any time</Text>
                <Text color="#fff" fontSize={16}>•  Subcribe or one-time payment</Text>
              </YStack>
              <Button
              items="center"
              rounded={50}
              bg="#FFCCCC"
              my={15} 
              mx={20}
              height={55}
              onPress={() =>
                console.log("You bought Spotify Premium for Individual. Thank You!")
              }
            >
              <Text fontWeight="bold" fontSize={18}>
                Try 4 months for ₫59,000
              </Text>
            </Button>
            <Button
              items="center"
              rounded={50}
              bg="transparent"
              borderColor="#fff"
              my={5}
              mx={20}
              height={55}
              onPress={() =>
                console.log("You bought Spotify Premium for Individual by One-time payment. Thank You!")
              }
            >
              <Text color="#fff" fontWeight="bold" fontSize={18}>
                One-time payment
              </Text>
            </Button>
            <Text color="gray" mt={15} mb={20} mx={20} text="center">
              ₫59,000 for 4 months, then ₫59,000 per month after. Offer only
              available if you haven’t tried Premium before and you subscribe
              via Spotify. Offers via Google Play may differ. Terms apply. Offer
              ends May 19, 2025.
            </Text>
            </YStack>
            <YStack my={15} bg="#222222" rounded={13} overflow="hidden">
              <XStack
                p={5}
                bg="#9999CC"
                width={215}
                items="center"
                justify="center"
                borderBottomRightRadius={8}
              >
                <Text color="#000" fontSize={16} fontWeight="bold">
                  ₫29,000 for 3 months
                </Text>
              </XStack>
              <XStack py={15} px={20} >
                <Star color="#fff" />
                <Text ml={7} color="#fff" fontSize={16} fontWeight="bold">
                  Premium
                </Text>
              </XStack> 
              <Text px={20} pb={15} color="#9999CC" fontSize={21} fontWeight="bold">
                Student
              </Text>
              <Text px={20} color="#fff" fontSize={17} fontWeight="bold">
                ₫29,000 for 3 months
              </Text>
              <Text px={20} pb={15} color="gray" fontSize={14}>
                ₫29,000 / month after
              </Text>
              <XStack height={1} bg="#555555"></XStack>
              <YStack pl={40} py={20}>
                <Text color="#fff" fontSize={16}>•  1 Premium account</Text>
                <Text color="#fff" fontSize={16}>•  Discount for eligible students</Text>
                <Text color="#fff" fontSize={16}>•  Cancle any time</Text>
                <Text color="#fff" fontSize={16}>•  Subcribe or one-time payment</Text>
              </YStack>
              <Button
              items="center"
              rounded={50}
              bg="#9999CC"
              my={15}
              mx={20}
              height={55}
              onPress={() =>
                console.log("You bought Spotify Premium Individual. Thank You!")
              }
            >
              <Text fontWeight="bold" fontSize={18}>
                Try 3 months for ₫29,000
              </Text>
            </Button>
            <Text color="gray" mt={15} mb={20} mx={20} text="center">
              ₫29,000 for 3 months, then ₫29,000 per month after. Offer only
              available if you haven’t tried Premium before and you subscribe
              via Spotify. Offers via Google Play may differ. Terms apply. Offer
              ends May 19, 2025.
            </Text>
            </YStack>
          </YStack>
        </LinearGradient>
      </ScrollView>
    </YStack>
  );
}