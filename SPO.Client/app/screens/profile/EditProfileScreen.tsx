import React from "react";
import { TouchableOpacity, View, StatusBar } from "react-native";
import { Button, Text, XStack, YStack, Input, Dialog } from "tamagui";
import { X, Save, Pencil, XCircle } from "@tamagui/lucide-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import SafeImage from "../../components/SafeImage";

type RootStackParamList = {
  Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const userData = {
  urlAvatar:
    "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
  name: "Trà Nguyễn Văn Nhựt",
};

export const EditProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = React.useState("Nguyễn Văn A");
  const [urlAvatar, setUrlAvatar] = React.useState(userData.urlAvatar);
  const [openModal, setOpenModal] = React.useState(false);
  const [tempUrl, setTempUrl] = React.useState(urlAvatar);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSave = () => {
    // TODO: Lưu thay đổi (tên và URL avatar) vào backend hoặc trạng thái toàn cục
    console.log("Lưu thông tin:", { name, urlAvatar });
    navigation.goBack();
  };

  const handleClearName = () => {
    setName("");
  };

  const isValidImageUrl = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      const contentType = response.headers.get("content-type");
      return contentType?.startsWith("image/");
    } catch {
      return false;
    }
  };

  const handleSaveImage = async () => {
    if (tempUrl && (await isValidImageUrl(tempUrl))) {
      setUrlAvatar(tempUrl); // Cập nhật URL avatar
      setOpenModal(false);
    } else {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "URL không hợp lệ hoặc không phải hình ảnh.",
      });
    }
  };

  return (
    <YStack flex={1} bg="#121212" pt={StatusBar.currentHeight || 20}>
      {/* Header */}
      <XStack justify="space-between" items="center" p="$3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={24} color="white" />
        </TouchableOpacity>
        <Text fontSize={18} fontWeight="bold" color="white">
          EditProfile
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Save size={24} color="white" />
        </TouchableOpacity>
      </XStack>

      {/* Content */}
      <YStack flex={1} items="center">
        {/* Avatar */}
        <YStack p={16}>
          <View style={{ position: "relative", marginBottom: 30 }}>
            <SafeImage
              uri={urlAvatar}
              width={140}
              height={140}
              rounded={100}
              bg="#333"
              resizeMode="cover" // Sử dụng cover thay vì stretch
              onError={() => console.log("Image load error")}
            />
            <Button
              position="absolute"
              bg="#fff"
              b={0}
              r={0}
              chromeless
              rounded={5}
              width={35}
              height={35}
              justify="center"
              items="center"
              onPress={() => setOpenModal(true)}
            >
              <Pencil size={16} color="#000" />
            </Button>
          </View>
        </YStack>

        {/* Dialog để nhập URL hình ảnh */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <Dialog.Portal>
            <Dialog.Overlay
              bg="rgba(0,0,0,0.3)"
              onPress={() => setOpenModal(false)}
            />
            <Dialog.Content bordered elevate px="$4" py="$4" width="70%">
              <Dialog.Title fontSize="$5">Thay đổi ảnh đại diện</Dialog.Title>
              <Dialog.Description>Nhập URL hình ảnh mới</Dialog.Description>
              <Input
                placeholder="Nhập URL hình ảnh"
                value={tempUrl}
                bg="transparent"
                onChangeText={setTempUrl}
                width="100%"
                mt="$3"
                color="#000"
                placeholderTextColor="rgba(255,255,255,0.3)"
                fontSize={16}
              />
              {tempUrl ? (
                isLoading ? (
                  <Text color="white">Đang tải...</Text>
                ) : (
                  <SafeImage
                    uri={tempUrl}
                    width="100%"
                    height={200}
                    mt="$3"
                    resizeMode="contain"
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      console.log("Image preview load error");
                    }}
                  />
                )
              ) : null}
              <XStack justify="flex-end" mt="$4" gap="$3">
                <Button onPress={() => setOpenModal(false)}>Hủy</Button>
                <Button onPress={handleSaveImage}>Lưu</Button>
              </XStack>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>

        {/* Name Input */}
        <XStack items="center" px={16}>
          <Text color="#fff" fontSize={16} fontWeight="bold" mr={20}>
            Name
          </Text>
          <Input
            flex={1}
            placeholder="Tên của bạn"
            placeholderTextColor="rgba(255,255,255,0.3)"
            color="white"
            bg="transparent"
            borderWidth={0}
            value={name}
            onChangeText={setName}
            fontSize={16}
          />
          {name ? (
            <TouchableOpacity
              onPress={handleClearName}
              style={{
                position: "absolute",
                right: 10,
                padding: 10,
              }}
            >
              <XCircle size={16} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          ) : null}
        </XStack>
        <XStack height={1 / 5} width="100%" bg="rgba(255,255,255,0.5)" />
      </YStack>
    </YStack>
  );
};
