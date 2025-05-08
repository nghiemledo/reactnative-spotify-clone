import React, { useState } from "react";
import { YStack, XStack, Button, Text } from "tamagui";

interface GenderSelectionComponentProps {
  onSelect: (gender: string) => void;
  initialGender?: string;
}

export const GenderSelectionComponent: React.FC<GenderSelectionComponentProps> = ({
  onSelect,
  initialGender = "",
}) => {
  const [selectedGender, setSelectedGender] = useState(initialGender);

  const genders = [
    { label: "Nữ", value: "female" },
    { label: "Nam", value: "male" },
    { label: "Phân nhị giới", value: "gay" },
    { label: "Khác", value: "other" },
    { label: "Không muốn nêu cụ thể", value: "none" },
  ];

  const handleSelect = (value: string) => {
    setSelectedGender(value);
    onSelect(value);
  };

  return (
    <YStack width="100%">
      <Text fontSize="$8" fontWeight="bold" color="#fff" marginBottom="$4">
        Giới tính của bạn là gì?
      </Text>
      <XStack space="$2" flexWrap="wrap">
        {genders.map((gender) => (
          <Button
            key={gender.value}
            backgroundColor={selectedGender === gender.value ? "#1DB954" : "#333"}
            borderColor="#fff"
            borderWidth={1}
            borderRadius="$10"
            paddingVertical="$1"
            paddingHorizontal="$3"
            margin="$1"
            onPress={() => handleSelect(gender.value)}
          >
            <Text color="#fff" fontSize="$4">
              {gender.label}
            </Text>
          </Button>
        ))}
      </XStack>
    </YStack>
  );
};