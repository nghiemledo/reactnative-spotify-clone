import React, { useState, useCallback } from "react";
import { YStack, XStack, Text, Button, Input, AnimatePresence, View } from "tamagui";
import { TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { login, setError } from "../../store/authSlice";
import { RootState, AppDispatch } from "../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

type EmailLoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EmailLogin"
>;

interface EmailLoginFormProps {
  navigation: EmailLoginScreenNavigationProp;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: apiError } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Vui lòng nhập địa chỉ email hợp lệ");
      return false;
    }
    if (password.length < 6) {
      setLocalError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    return true;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    setLocalError("");
    if (!validateInputs()) return;

    try {
      const result = await dispatch(login({ email, password })).unwrap(); 
      await AsyncStorage.setItem("authToken", result.token);
      await AsyncStorage.setItem("refreshToken", result.refreshToken);
      alert("Đăng nhập thành công!.");
      navigation.navigate("Main", { screen: "Home" });
    } catch (err) {
      // Error is handled by Redux state, no need to set local error
    }
  }, [validateInputs, email, password, dispatch, navigation]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Combine local and API errors for display
  const displayError = localError || apiError;

  // Clear API error when component unmounts or user retries
  React.useEffect(() => {
    return () => {
      if (apiError) {
        dispatch(setError(null));
      }
    };
  }, [apiError, dispatch]);

  return (
    <YStack flex={1} paddingBottom={32}>
      <YStack marginBottom={60}>
        {/* Error Message */}
        <AnimatePresence>
          {displayError ? (
            <View
              animation="quick"
              enterStyle={{ opacity: 0, y: -10 }}
              exitStyle={{ opacity: 0, y: -10 }}
            >
              <Text color="#ff4444" fontSize={14} marginBottom={16}>
                {displayError}
              </Text>
            </View>
          ) : null}
        </AnimatePresence>

        {/* Email Input */}
        <YStack marginBottom={32}>
          <Text color="white" fontSize={20} fontWeight="bold" marginBottom={16}>
            Email hoặc tên người dùng
          </Text>
          <Input
            value={email}
            onChangeText={setEmail}
            backgroundColor="#444"
            color="white"
            borderRadius={7}
            fontSize={18}
            placeholderTextColor="#bbb"
            width="100%"
            height={50}
            borderWidth={0}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </YStack>

        {/* Password Input */}
        <YStack>
          <Text color="white" fontSize={20} fontWeight="bold" marginBottom={16}>
            Mật khẩu
          </Text>
          <XStack alignItems="center" backgroundColor="#444" borderRadius={7}>
            <Input
              value={password}
              onChangeText={setPassword}
              backgroundColor="transparent"
              color="white"
              fontSize={18}
              width="85%"
              height={50}
              borderWidth={0}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={toggleShowPassword} style={{ padding: 10 }}>
              {showPassword ? (
                <EyeOff size="$2" color="white" />
              ) : (
                <Eye size="$2" color="white" />
              )}
            </TouchableOpacity>
          </XStack>
        </YStack>
      </YStack>

      <XStack justifyContent="center">
        <Button
          backgroundColor="#1DB954"
          borderRadius={32}
          width={160}
          height={60}
          onPress={handleLogin}
          disabled={loading || email.length === 0 || password.length === 0}
          animation="quick"
        >
          {loading ? (
            <Text color="#fff" fontWeight="bold" fontSize={16}>
              Đang tải...
            </Text>
          ) : (
            <Text color="#fff" fontWeight="bold" fontSize={16}>
              Đăng nhập
            </Text>
          )}
        </Button>
      </XStack>
    </YStack>
  );
};

export default EmailLoginForm;