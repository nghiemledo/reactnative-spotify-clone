import React, { useEffect } from "react";
import { TouchableOpacity, View, StatusBar } from "react-native";
import { Button, Text, XStack, YStack, Input, Dialog } from "tamagui";
import { X, Save, Pencil, XCircle } from "@tamagui/lucide-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import SafeImage from "../../components/SafeImage";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} from "../../services/AuthService";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { setUser } from "../../store/authSlice";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const EditProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;

  // Fetch user data với refetch function
  const { data: userData, refetch } = useGetUserByIdQuery(userId || "", {
    skip: !userId, // Skip query nếu không có userId
  });

  // Initialize state
  const [firstName, setFirstName] = React.useState(user?.firstName || "");
  const [lastName, setLastName] = React.useState(user?.lastName || "");
  const [urlAvatar, setUrlAvatar] = React.useState(user?.urlAvatar || "");
  const [openModal, setOpenModal] = React.useState(false);
  const [tempUrl, setTempUrl] = React.useState(user?.urlAvatar || "");
  const [isLoading, setIsLoading] = React.useState(false);

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const dispatch = useAppDispatch();

  // Sync state with fetched user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUrlAvatar(user.urlAvatar || "");
      setTempUrl(user.urlAvatar || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!userId) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không tìm thấy thông tin người dùng.",
      });
      return;
    }

    // Validate required fields
    if (!firstName.trim() || !lastName.trim()) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Họ và tên không được để trống.",
      });
      return;
    }

    try {
      // Construct fullName
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

      // Update user profile
      await updateUserProfile({
        id: userId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName,
        urlAvatar: urlAvatar || "",
        email: user.email || "",
      }).unwrap();

      // Refetch user data để lấy dữ liệu mới
      const refetchResult = await refetch();
      
      if (refetchResult.data?.data) {
        // Update Redux store với dữ liệu mới
        dispatch(setUser({ user: refetchResult.data.data }));
        console.log("Updated user data:", refetchResult.data.data);
      }

      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Cập nhật thông tin thành công!",
      });

      navigation.goBack();
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "Cập nhật thông tin thất bại. Vui lòng thử lại.";
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: errorMessage,
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
    if (!url) return false;
    try {
      const response = await fetch(url, { method: "HEAD" });
      const contentType = response.headers.get("content-type");
      return contentType?.startsWith("image/");
    } catch {
      return false;
    }
  };

  const handleSaveImage = async () => {
    if (await isValidImageUrl(tempUrl)) {
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

        {/* Dialog for image URL */}
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