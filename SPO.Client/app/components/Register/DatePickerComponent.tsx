import React, { useState } from "react";
import { XStack, Text, Input as TamaguiInput } from "tamagui";
import { TouchableOpacity } from "react-native";
import { Calendar } from "@tamagui/lucide-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DatePickerComponentProps {
  label: string;
  placeholder?: string; // Made optional to fix TypeScript error
  value: string;
  onChange: (value: string) => void;
}

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  placeholder = "DD/MM/YYYY", // Default value if undefined
  value,
  onChange,
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    onChange(`${day}/${month}/${year}`);
    hideDatePicker();
  };

  return (
    <>
      <Text fontSize="$8" fontWeight="bold" color="#fff" marginBottom="$4">
        {label}
      </Text>
      <XStack
        width="100%"
        backgroundColor="#333"
        borderColor="transparent"
        borderWidth={1}
        borderRadius="$4"
        alignItems="center"
        paddingRight="$2"
      >
        <TamaguiInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType="default"
          secureTextEntry={false}
          backgroundColor="transparent"
          color="#fff"
          borderColor="transparent"
          focusStyle={{ borderColor: "transparent" }}
          borderWidth={0}
          padding="$3"
          flex={1}
          textAlign="center"
          editable
        />
        <TouchableOpacity onPress={showDatePicker} style={{ padding: 10 }}>
          <Calendar color="#fff" size={24} />
        </TouchableOpacity>
      </XStack>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={new Date()}
        minimumDate={new Date("1900-01-01")}
        maximumDate={new Date("2025-12-31")} 
      />
    </>
  );
};