import React, { useState } from "react";
import { YStack, XStack, Text, Checkbox } from "tamagui";
import { Linking, TouchableOpacity } from "react-native";
import { CheckIcon } from "lucide-react-native";
import { CheckedState } from "tamagui";

interface TermsAndPreferencesComponentProps {
  onValidationChange: (isValid: boolean) => void;
}

export const TermsAndPreferencesComponent: React.FC<TermsAndPreferencesComponentProps> = ({
  onValidationChange,
}) => {
  const [noMarketing, setNoMarketing] = useState(false);
  const [shareData, setShareData] = useState(false);

  // Cập nhật validation khi checkbox thay đổi
  React.useEffect(() => {
    onValidationChange(noMarketing || shareData);
  }, [noMarketing, shareData, onValidationChange]);

  const openTerms = () => {
    Linking.openURL("https://example.com/privacy-policy").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openPrivacy = () => {
    Linking.openURL("https://example.com/privacy-policy").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  // Hàm xử lý giá trị checked để chỉ lấy boolean
  const handleCheckedChange = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => (checked: CheckedState) => {
    if (checked === "indeterminate") {
      setState(false); // hoặc xử lý theo logic của bạn
    } else {
      setState(checked);
    }
  };

  return (
    <YStack marginTop="$4" alignItems="flex-start" gap={"$3"} height={"50%"}>
      <Text color="#fff" fontSize="$1" fontWeight={"bold"}>
        Bằng việc nhấn vào "Tạo tài khoản", bạn đồng ý với Điều khoản sử dụng
        và Chính sách quyền riêng tư của chúng tôi.
      </Text>
      <TouchableOpacity onPress={openTerms}>
        <Text style={{ color: "#1DB954", fontSize: 12, fontWeight: "bold" }}>
          Điều khoản sử dụng
        </Text>
      </TouchableOpacity>

      <Text color="#fff" fontSize="$1" fontWeight={"bold"}>
        Để tìm hiểu thêm về các chức năng của chúng tôi, sử dụng, chia sẻ và
        bảo vệ dữ liệu cá nhân của bạn, vui lòng xem chính sách quyền riêng tư
        của chúng tôi.
      </Text>
      <TouchableOpacity onPress={openPrivacy}>
        <Text style={{ color: "#1DB954", fontSize: 12, fontWeight: "bold" }}>
          Chính sách quyền riêng tư
        </Text>
      </TouchableOpacity>
      <XStack alignItems="center" justifyContent="space-between" width="100%">
        <Text color="#fff" fontSize="$1" fontWeight="bold" flex={1} marginRight={"$3"}>
          Tôi không muốn nhận tin nhắn tiếp thị từ ứng dụng này.
        </Text>
        <Checkbox
          size="$4"
          backgroundColor="transparent"
          borderRadius={9999}
          borderWidth={2}
          borderColor="gray"
          checked={noMarketing}
          onCheckedChange={handleCheckedChange(setNoMarketing)}
        >
          <Checkbox.Indicator
            backgroundColor="#1DB954"
            borderColor="#1DB954"
            borderRadius={9999}
          >
            <CheckIcon color="black" />
          </Checkbox.Indicator>
        </Checkbox>
      </XStack>
      <XStack alignItems="center" justifyContent="space-between" width="100%">
        <Text color="#fff" fontSize="$1" fontWeight="bold" flex={1} marginRight={"$3"}>
          Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung chúng tôi nhằm mục đích tiếp thị.
        </Text>
        <Checkbox
          size="$4"
          backgroundColor="transparent"
          borderRadius={9999}
          borderWidth={2}
          borderColor="gray"
          checked={shareData}
          onCheckedChange={handleCheckedChange(setShareData)}
        >
          <Checkbox.Indicator
            backgroundColor="#1DB954"
            borderColor="#1DB954"
            borderRadius={9999}
          >
            <CheckIcon color="black" />
          </Checkbox.Indicator>
        </Checkbox>
      </XStack>
    </YStack>
  );
};