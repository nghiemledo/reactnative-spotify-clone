import React, { useCallback, useRef, useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { YStack, XStack, Text } from "tamagui";
import { ListMusic, Users, Music2, Check } from "@tamagui/lucide-icons";

interface SortBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
  selectedOption: string; 
}

const SortBottomSheet: React.FC<SortBottomSheetProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  selectedOption,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["35%"];

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => {
          onClose();
          bottomSheetRef.current?.close();
        }}
      />
    ),
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  const options = [
    {
      title: "Recents",
      icon: ListMusic,
      value: "recents",
    },
    {
      title: "Recently added",
      icon: Users,
      value: "recentlyAdded",
    },
    {
      title: "Alphabetical",
      icon: Music2,
      value: "alphabetical",
    },
    {
      title: "Creator",
      icon: Music2,
      value: "creator",
    },
  ];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isOpen ? 0 : -1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#1A1A1A" }}
      handleIndicatorStyle={{ backgroundColor: "white", padding: 0 }}
      enablePanDownToClose={true}
      onChange={(index) => {
        if (index === -1) onClose();
      }}
    >
      <BottomSheetView>
        <Text
          color="white"
          text="center"
          fontWeight="bold"
          fontSize={16}
          borderColor="gray"
          pb="$2"
          borderBottomWidth={1}
        >
           Sort by
        </Text>
        <YStack gap="$5" mt="$2" px="$3">
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSelectOption(option.value)}
            >
              <XStack items="center" justify="space-between">
                <XStack items="center" gap="$3">
                  <Text color="white" fontSize={16}>
                    {option.title}
                  </Text>
                </XStack>
                {selectedOption === option.value && (
                  <Check color="#1DB954" size={24} />
                )}
              </XStack>
            </TouchableOpacity>
          ))}
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SortBottomSheet;