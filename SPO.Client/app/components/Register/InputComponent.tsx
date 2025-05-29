import React, { useState, useEffect } from "react";
import { YStack, Input, Text, XStack, Button } from "tamagui";
import { KeyboardTypeOptions } from "react-native";
import { Eye, EyeOff } from "@tamagui/lucide-icons";

interface InputComponentProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder = "",
  value,
  onChange,
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  // Reset state when secureTextEntry changes (e.g., moving to password step)
  useEffect(() => {
    if (secureTextEntry) {
      console.log("Resetting state: secureTextEntry=", secureTextEntry);
      setShowPassword(false);
      setHasTyped(false);
    }
  }, [secureTextEntry]);

  // Reset hasTyped and showPassword when value becomes empty
  useEffect(() => {
    if (secureTextEntry && value.length === 0) {
      console.log("Value is empty, resetting hasTyped and showPassword");
      setHasTyped(false);
      setShowPassword(false);
    }
  }, [value, secureTextEntry]);

  // Hide password when typing starts for the first time
  const handleChangeText = (text: string) => {
    if (secureTextEntry && !hasTyped && text.length > 0) {
      console.log("First character typed, hiding password");
      setHasTyped(true);
      setShowPassword(false);
    }
    onChange(text);
  };

  const togglePasswordVisibility = () => {
    console.log("Toggling password visibility, showPassword=", !showPassword);
    setShowPassword((prev) => !prev);
  };

  return (
    <YStack width="100%" items="flex-start">
      <Text fontSize="$8" fontWeight="bold" color="#fff" mb="$4">
        {label}
      </Text>
      <XStack
        width="100%"
        bg="#333"
        borderColor="transparent"
        borderWidth={1}
        rounded="$4"
        items="center"
        pr="$2"
      >
        <Input
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
          bg="transparent"
          color="#fff"
          borderColor="transparent"
          focusStyle={{
            borderColor: "transparent",
          }}
          borderWidth={0}
          p="$3"
          flex={1}
        />
        {secureTextEntry && (
          <Button
            size="$3"
            chromeless
            icon={
              showPassword ? (
                <EyeOff color="#fff" size={20} />
              ) : (
                <Eye color="#fff" size={20} />
              )
            }
            onPress={togglePasswordVisibility}
            p="$2"
            mr="$2"
            bg="transparent"
            pressStyle={{ bg: "transparent" }} 
          />
        )}
      </XStack>
    </YStack>
  );
};