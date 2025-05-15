import React from "react";
import { YStack, XStack, Text, Button, ScrollView } from "tamagui";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ArrowLeft,
  Search,
  User,
  Music,
  Volume2,
  Lock,
  Bell,
  Smartphone,
  Download,
  BarChart2,
  Info,
} from "@tamagui/lucide-icons";
import { StatusBar } from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";

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
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <XStack alignItems="flex-start" gap={16}>
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
  RootStackParamList,
  "Settings"
>;

export default function SettingsScreen({
  navigation,
}: {
  navigation: SettingsScreenNavigationProp;
}) {
  const settingsOptions = [
    {
      icon: <User color="#fff" size={24} />,
      title: "Account",
      subtitle: "Username",
      onPress: () => navigation.navigate("Account"),
    },
    {
      icon: <Music color="#fff" size={24} />,
      title: "Content and display",
      subtitle: "Canvas • Allow explicit content",
      onPress: () => navigation.navigate("ContentAndDisplay"),
    },
    {
      icon: <Volume2 color="#fff" size={24} />,
      title: "Playback",
      subtitle: "Gapless playback • Autoplay",
      onPress: () => navigation.navigate("Playback"),
    },
    {
      icon: <Lock color="#fff" size={24} />,
      title: "Privacy and social",
      subtitle: "Recently played artists • Followers and following",
      onPress: () => navigation.navigate("PrivacyAndSocial"),
    },
    {
      icon: <Bell color="#fff" size={24} />,
      title: "Notifications",
      subtitle: "Push • Email",
      onPress: () => navigation.navigate("Notifications"),
    },
    {
      icon: <Smartphone color="#fff" size={24} />,
      title: "Apps and devices",
      subtitle: "Google Maps • Spotify Connect control",
      onPress: () => navigation.navigate("AppsAndDevices"),
    },
    {
      icon: <Download color="#fff" size={24} />,
      title: "Data-saving and offline",
      subtitle: "Data saver • Downloads over cellular",
      onPress: () => navigation.navigate("DataSaving"),
    },
    {
      icon: <BarChart2 color="#fff" size={24} />,
      title: "Media quality",
      subtitle: "Wi-Fi streaming quality • Cellular streaming quality",
      onPress: () => navigation.navigate("MediaQuality"),
    },
    {
      icon: <Info color="#fff" size={24} />,
      title: "Advertisements",
      subtitle: "Tailored ads",
      onPress: () => navigation.navigate("Advertisements"),
    },
    {
      icon: <Info color="#fff" size={24} />,
      title: "About",
      subtitle: "Version • Privacy Policy",
      onPress: () => navigation.navigate("About"),
    },
  ];

  return (
    <YStack
      flex={1}
      backgroundColor="#111"
      paddingTop={StatusBar.currentHeight}
    >
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      {/* Header */}
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={16}
        height={60}
        backgroundColor="#222"
      >
        <Button
          chromeless
          icon={<ArrowLeft size={24} />}
          size="$4"
          color="white"
          backgroundColor="transparent"
          padding={0}
          onPress={() => navigation.goBack()}
        />
        <Text color="white" fontSize={20} fontWeight="bold">
          Settings
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Button
            chromeless
            icon={<Search size={24} />}
            size="$4"
            color="white"
            backgroundColor="transparent"
            padding={0}
          />
        </TouchableOpacity>
      </XStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding={24}>
          {/* Free account & Go Premium */}
          <YStack alignItems="center" justifyContent="center">
            <Text
              color="white"
              fontSize={18}
              fontWeight="bold"
              marginBottom={24}
            >
              Free account
            </Text>
            <Button
              backgroundColor="#fff"
              borderRadius={24}
              height={38}
              paddingHorizontal={20}
              paddingVertical={5}
              marginBottom={32}
              onPress={() => navigation.navigate("Premium")}
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
            backgroundColor="#fff"
            borderRadius={24}
            height={38}
            alignSelf="center"
            marginTop={24}
            marginBottom={40}
            paddingHorizontal={20}
            paddingVertical={5}
            onPress={() => navigation.navigate("Login")}
          >
            <Text color="#111" fontSize={11} fontWeight="bold">
              Log out
            </Text>
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
