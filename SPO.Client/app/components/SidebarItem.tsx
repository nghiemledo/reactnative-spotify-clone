import { TouchableOpacity } from "react-native";
import { Text } from "tamagui";
import { XStack } from "tamagui";

export const SidebarItem = ({
  icon,
  title,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <XStack items="center" gap={12} py={12} px={16}>
      {icon}
      <Text color="white" fontSize={16}>
        {title}
      </Text>
    </XStack>
  </TouchableOpacity>
);
