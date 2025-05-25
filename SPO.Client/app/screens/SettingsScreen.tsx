import React, { useState } from "react";
import { YStack, XStack, Text, Button, ScrollView } from "tamagui";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ArrowLeft,
  Music,
  Volume2,
  Lock,
  Bell,
  Smartphone,
  Download,
  BarChart2,
  Info,
  Loader,
} from "@tamagui/lucide-icons";
import { HomeStackParamList } from "../navigation/HomeNavigator";
import { useAppDispatch } from "../store";
import { logout } from "../store/authSlice";
import AdComponent from "../components/AdComponent";

// Settings Item Component
const SettingsItem = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <XStack items="flex-start" gap={16}>
      {icon}
      <YStack>
        <Text color="white" fontWeight="bold" fontSize={16}>
          {title}
        </Text>
        <Text color="#bbb" fontSize={14}>
          {subtitle}
        </Text>
      </YStack>
    </XStack>
  </TouchableOpacity>
);

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Settings"
>;

export default function SettingsScreen({
  navigation,
}: {
  navigation: SettingsScreenNavigationProp;
}) {
  const dispatch = useAppDispatch();
  const [showAd, setShowAd] = useState(false);
  const settingsOptions = [
    {
      icon: <Music color="#fff" size={24} />,
      title: "Content and display",
      subtitle: "Canvas • Allow explicit content",
      // onPress: () => navigation.navigate("ContentAndDisplay"),
    },
    {
      icon: <Volume2 color="#fff" size={24} />,
      title: "Playback",
      subtitle: "Gapless playback • Autoplay",
      // onPress: () => navigation.navigate("Playback"),
    },
    {
      icon: <Lock color="#fff" size={24} />,
      title: "Privacy and social",
      subtitle: "Recently played artists • Followers and following",
      // onPress: () => navigation.navigate("PrivacyAndSocial"),
    },
    {
      icon: <Bell color="#fff" size={24} />,
      title: "Notifications",
      subtitle: "Push • Email",
      // onPress: () => navigation.navigate("Notifications"),
    },
    {
      icon: <Smartphone color="#fff" size={24} />,
      title: "Apps and devices",
      subtitle: "Google Maps • Spotify Connect control",
      // onPress: () => navigation.navigate("AppsAndDevices"),
    },
    {
      icon: <Download color="#fff" size={24} />,
      title: "Data-saving and offline",
      subtitle: "Data saver • Downloads over cellular",
      // onPress: () => navigation.navigate("DataSaving"),
    },
    {
      icon: <BarChart2 color="#fff" size={24} />,
      title: "Media quality",
      subtitle: "Wi-Fi streaming quality • Cellular streaming quality",
      // onPress: () => navigation.navigate("MediaQuality"),
    },
    {
      icon: <Loader color="#fff" size={24} />,
      title: "Advertisements",
      subtitle: "Tailored ads",
      onPress: () => {
        setShowAd(true); // Hiển thị AdComponent khi nhấn
      },
    },
    {
      icon: <Info color="#fff" size={24} />,
      title: "About",
      subtitle: "Version • Privacy Policy",
      // onPress: () => navigation.navigate("About"),
    },
  ];

  return (
    <YStack flex={1} bg="black">
      {/* Header */}
      <XStack
        items="center"
        justify="center"
        px={16}
        height={60}
        bg="#222"
        position="relative"
      >
        <Button
          chromeless
          icon={<ArrowLeft size={24} />}
          size="$4"
          color="white"
          bg="transparent"
          p={0}
          position="absolute"
          l={16}
          onPress={() => navigation.goBack()}
        />
        <Text color="white" fontSize={20} fontWeight="bold">
          Settings
        </Text>
      </XStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack p={24}>
          {/* Free account & Go Premium */}
          <YStack items="center" justify="center">
            <Text color="white" fontSize={18} fontWeight="bold" mb={24}>
              Free account
            </Text>
            <Button
              bg="#fff"
              rounded={24}
              height={38}
              px={20}
              py={5}
              mb={32}
              // onPress={() => navigation.navigate("Premium")}
            >
              <Text color="#111" fontSize={12} fontWeight="bold">
                Go Premium
              </Text>
            </Button>
          </YStack>

          {/* Settings List */}
          <YStack gap={28}>
            {settingsOptions.map((option, index) => (
              <SettingsItem key={index} {...option} />
            ))}
          </YStack>

          {/* Log out button */}
          <Button
            bg="#fff"
            rounded={24}
            height={38}
            self="center"
            mt={24}
            mb={40}
            px={20}
            py={5}
            onPress={() => {
              dispatch(logout());
              navigation.navigate("Login");
            }}
          >
            <Text color="#111" fontSize={11} fontWeight="bold">
              Log out
            </Text>
          </Button>
        </YStack>
      </ScrollView>

      {/* Hiển thị AdComponent khi showAd là true */}
      {showAd && (
        <AdComponent
          onClose={() => setShowAd(false)} // Ẩn AdComponent khi quảng cáo đóng
          onReward={() => {
            console.log("🎉 Người dùng đã nhận thưởng từ quảng cáo!");
            setShowAd(false);
          }}
        />
      )}
    </YStack>
  );
}
