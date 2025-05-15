import React from "react";
import { YStack, XStack, Text, Avatar } from "tamagui";
import { User, Volume2, BarChart2, Info } from "@tamagui/lucide-icons";
import { StatusBar, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

// Sidebar Item Component
const SidebarItem = ({
  icon,
  title,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <XStack
      items="center"
      gap={12}
      py={12}
      px={16}
    >
      {icon}
      <Text color="white" fontSize={16}>
        {title}
      </Text>
    </XStack>
  </TouchableOpacity>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, navigation }) => {
  return (
    <YStack
      pt={StatusBar.currentHeight}
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableOpacity
        onPress={() => {
          onClose(); // Đóng sidebar
          navigation.navigate("Profile"); // Chuyển hướng ngay lập tức
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
              src="https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <YStack ml={12}>
            <Text color="white" fontSize={16} fontWeight="bold">
              Trần Nguyễn Văn Nhựt
            </Text>
            <Text color="#bbb" fontSize={14}>
              View profile
            </Text>
          </YStack>
        </XStack>
      </TouchableOpacity>
      <SidebarItem
        icon={<Volume2 color="#fff" size={24} />}
        title="Add account"
        onPress={() => {
          onClose(); // Đóng sidebar
          navigation.navigate("AddAccount"); // Chuyển hướng ngay lập tức
        }}
      />
      <SidebarItem
        icon={<BarChart2 color="#fff" size={24} />}
        title="What's new"
        onPress={() => {
          onClose(); // Đóng sidebar
          navigation.navigate("WhatsNew"); // Chuyển hướng ngay lập tức
        }}
      />
      <SidebarItem
        icon={<Info color="#fff" size={24} />}
        title="Recents"
        onPress={() => {
          onClose(); // Đóng sidebar
          navigation.navigate("Recents"); // Chuyển hướng ngay lập tức
        }}
      />
      <SidebarItem
        icon={<User color="#fff" size={24} />}
        title="Settings and privacy"
        onPress={() => {
          onClose(); // Đóng sidebar
          navigation.navigate("Settings"); // Chuyển hướng ngay lập tức
        }}
      />
    </YStack>
  );
};

export default Sidebar;