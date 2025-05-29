import React, { useEffect } from "react";
import { TouchableOpacity, View, StatusBar } from "react-native";
import { Button, Text, XStack, YStack, Input, Dialog } from "tamagui";
import { X, Save, Pencil, XCircle } from "@tamagui/lucide-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import SafeImage from "../../components/SafeImage";
import { useAppSelector } from "../../store";
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from "../../services/AuthService";

type RootStackParamList = {
  Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const EditProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const user = useAppSelector((state) => state.auth.user);
  const userId = useAppSelector((state) => state.auth.user?.id);

  // Fetch user data at the top level
  const { data: userData, refetch } = useGetUserByIdQuery(userId || "", {
    skip: !userId,
  });

  // Initialize state with user data from Redux or API
  const [firstName, setFirstName] = React.useState(user?.firstName || "");
  const [lastName, setLastName] = React.useState(user?.lastName || "");
  const [urlAvatar, setUrlAvatar] = React.useState(user?.urlAvatar || "");
  const [openModal, setOpenModal] = React.useState(false);
  const [tempUrl, setTempUrl] = React.useState(user?.urlAvatar || "");
  const [isLoading, setIsLoading] = React.useState(false);

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  // Update state when userData changes (e.g., after refetch)
  useEffect(() => {
    if (userData?.data) {
      setFirstName(userData.data.firstName || "");
      setLastName(userData.data.lastName || "");
      setUrlAvatar(userData.data.urlAvatar || "");
      setTempUrl(userData.data.urlAvatar || "");
    }
  }, [userData]);

  const handleSave = async () => {
    if (!userId) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không tìm thấy thông tin người dùng.",
      });
      return;
    }

    try {
      // Update user profile
      const res = await updateUserProfile({
        Id: userId,
        FirstName: firstName || "",
        LastName: lastName || "",
      }).unwrap();

      console.log("res", res);

      // Refetch user data to update the UI
      await refetch();

      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Cập nhật thông tin thành công!",
      });
      console.log(userData);
      console.log(userId);
      console.log(firstName);
      console.log(lastName);

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Cập nhật thông tin thất bại. Vui lòng thử lại.",
      });
      console.error("Update profile error:", error);
    }
  };

  const handleClearFirstName = () => {
    setFirstName("");
  };

  const handleClearLastName = () => {
    setLastName("");
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
      setUrlAvatar(tempUrl);
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
          Edit Profile
        </Text>
        <TouchableOpacity onPress={handleSave} disabled={isUpdating}>
          <Save size={24} color={isUpdating ? "gray" : "white"} />
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
              resizeMode="cover"
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

        {/* FirstName Input */}
        <XStack items="center" px={16}>
          <Text color="#fff" fontSize={16} fontWeight="bold" mr={20}>
            First Name
          </Text>
          <Input
            flex={1}
            placeholder="Your first name"
            placeholderTextColor="rgba(255,255,255,0.3)"
            color="white"
            bg="transparent"
            borderWidth={0}
            value={firstName}
            onChangeText={setFirstName}
            fontSize={16}
          />
          {firstName ? (
            <TouchableOpacity
              onPress={handleClearFirstName}
              style={{ position: "absolute", right: 10, padding: 10 }}
            >
              <XCircle size={16} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          ) : null}
        </XStack>
        <XStack height={1} width="90%" bg="rgba(255,255,255,0.5)" />

        {/* LastName Input */}
        <XStack items="center" px={16}>
          <Text color="#fff" fontSize={16} fontWeight="bold" mr={20}>
            Last Name
          </Text>
          <Input
            flex={1}
            placeholder="Your last name"
            placeholderTextColor="rgba(255,255,255,0.3)"
            color="white"
            bg="transparent"
            borderWidth={0}
            value={lastName}
            onChangeText={setLastName}
            fontSize={16}
          />
          {lastName ? (
            <TouchableOpacity
              onPress={handleClearLastName}
              style={{ position: "absolute", right: 10, padding: 10 }}
            >
              <XCircle size={16} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          ) : null}
        </XStack>
      </YStack>
    </YStack>
  );
};
