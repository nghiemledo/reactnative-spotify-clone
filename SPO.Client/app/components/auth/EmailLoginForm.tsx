import React, { useState, useCallback } from "react";
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  AnimatePresence,
  View,
} from "tamagui";
import { TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SlpashStackParamList } from "../../navigation/SplashNavigator";
import { useLoginMutation } from "../../services/AuthService";

type EmailLoginScreenNavigationProp = NativeStackNavigationProp<
  SlpashStackParamList,
  "EmailLogin"
>;

interface EmailLoginFormProps {
  navigation: EmailLoginScreenNavigationProp;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();

  const validateInputs = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    setLocalError("");
    if (!validateInputs()) return;

    try {
      setLoading(true);
      try {
        const response = await login({ email, password }).unwrap();
        if ((response as any).error) {
          setLocalError((response as any).error);
        } else {
          setLoading(false);
          navigation.navigate("Main");
        }
      } catch (error: any) {
        setLocalError(error?.data?.message || error?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    } catch (err) {
      const errorMessage = (err as any)?.message || "Login failed";
      setLocalError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [validateInputs, email, password, navigation]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const displayError = localError;

  return (
    <YStack flex={1} pb={32} px={16} bg="#000" pt={60}>
      <YStack mb={60}>
        {/* Error Message */}
        <AnimatePresence>
          {displayError ? (
            <View
              animation="quick"
              enterStyle={{ opacity: 0, y: -10 }}
              exitStyle={{ opacity: 0, y: -10 }}
            >
              <Text color="#ff4444" fontSize={14} mb={16}>
                {displayError}
              </Text>
            </View>
          ) : null}
        </AnimatePresence>

        {/* Email Input */}
        <YStack mb={32}>
          <Text color="white" fontSize={20} fontWeight="bold" mb={16}>
            Email
          </Text>
          <Input
            value={email}
            onChangeText={setEmail}
            bg="#444"
            color="white"
            rounded={7}
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
          <Text color="white" fontSize={20} fontWeight="bold" mb={16}>
            Password
          </Text>
          <XStack items="center" bg="#444" rounded={7}>
            <Input
              value={password}
              onChangeText={setPassword}
              bg="transparent"
              color="white"
              fontSize={18}
              width="85%"
              height={50}
              borderWidth={0}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={{ padding: 10 }}
            >
              {showPassword ? (
                <EyeOff size="$2" color="white" />
              ) : (
                <Eye size="$2" color="white" />
              )}
            </TouchableOpacity>
          </XStack>
        </YStack>
      </YStack>

      <XStack justify="center">
        <Button
          bg="#1DB954"
          rounded={32}
          width={160}
          height={60}
          onPress={handleLogin}
          disabled={loading || email.length === 0 || password.length === 0}
          animation="quick"
        >
          {loading ? (
            <Text color="#fff" fontWeight="bold" fontSize={16}>
              Loading...
            </Text>
          ) : (
            <Text color="#fff" fontWeight="bold" fontSize={16}>
              Login
            </Text>
          )}
        </Button>
      </XStack>
    </YStack>
  );
};

export default EmailLoginForm;
