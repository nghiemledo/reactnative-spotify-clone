import { useState } from "react";
import { XStack, Text, Input as TamaguiInput } from "tamagui";
import { TouchableOpacity } from "react-native";
import { Calendar } from "@tamagui/lucide-icons";
import { DatePickerModal } from "react-native-paper-dates";

interface DatePickerComponentProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  placeholder = "DD/MM/YYYY",
  value,
  onChange,
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = ({ date }: { date: Date | undefined }) => {
    if (date) {
      const dayNumber = date.getDate();
      const monthNumber = date.getMonth() + 1;
      const day = dayNumber < 10 ? "0" + dayNumber : dayNumber.toString();
      const month = monthNumber < 10 ? "0" + monthNumber : monthNumber.toString();
      const year = String(date.getFullYear());
      onChange(`${day}/${month}/${year}`);
      setTempDate(date);
    }
    setDatePickerVisible(false);
  };

  return (
    <>
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
        <TamaguiInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType="default"
          secureTextEntry={false}
          bg="transparent"
          color="#fff"
          borderColor="transparent"
          focusStyle={{ borderColor: "transparent" }}
          borderWidth={0}
          p="$3"
          flex={1}
          text="center"
          editable
        />
        <TouchableOpacity onPress={showDatePicker} style={{ padding: 10 }}>
          <Calendar color="#fff" size={24} />
        </TouchableOpacity>
      </XStack>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={isDatePickerVisible}
        onDismiss={hideDatePicker}
        date={tempDate}
        onConfirm={handleConfirm}
        validRange={{
          startDate: new Date("1900-01-01"),
          endDate: new Date("2025-12-31"),
        }}
      />
    </>
  );
};