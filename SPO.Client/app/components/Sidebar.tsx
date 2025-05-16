import React from "react";
import { YStack, XStack, Text, Avatar } from "tamagui";
import { User, Volume2, BarChart2, Info } from "@tamagui/lucide-icons";
import { StatusBar, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAppSelector } from "../store";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, navigation }) => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <YStack
      pt={StatusBar.currentHeight}
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableOpacity
        onPress={() => {
          onClose();
          navigation.navigate("Profile");
        }}
      >
        <XStack
          items="center"
          p={16}
          borderBottomWidth={1}
          borderBottomColor="#333"
        >
          <Avatar circular size="$5">
            <Avatar.Image
              accessibilityLabel="User Avatar"
              src={user?.urlAvatar}
              alt="User Avatar"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <YStack ml={12}>
            <Text color="white" fontSize={16} fontWeight="bold">
              {user?.fullName}
            </Text>
            <Text color="#bbb" fontSize={14}>
              View profile
            </Text>
          </YStack>
        </XStack>
      </TouchableOpacity>

      <SidebarItem
        icon={<BarChart2 color="#fff" size={24} />}
        title="What's new"
        onPress={() => {
          onClose();
          navigation.navigate("WhatsNew");
        }}
      />
      <SidebarItem
        icon={<Info color="#fff" size={24} />}
        title="Recents"
        onPress={() => {
          onClose();
          navigation.navigate("Recents");
        }}
      />
      <SidebarItem
        icon={<User color="#fff" size={24} />}
        title="Settings and privacy"
        onPress={() => {
          onClose();
          navigation.navigate("Settings");
        }}
      />
    </YStack>
  );
};

export default Sidebar;
