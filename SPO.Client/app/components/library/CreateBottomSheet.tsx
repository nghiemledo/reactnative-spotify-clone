import React, { useCallback, useRef, useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { YStack, XStack, Text } from "tamagui";
import {
  ListMusic,
  Users,
  Music2,
} from "@tamagui/lucide-icons"

interface CreateBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
}

const CreateBottomSheet: React.FC<CreateBottomSheetProps> = ({
  isOpen,
  onClose,
  onSelectOption,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;
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
      title: "Playlist",
      subtitle: "Create a playlist including notes and files",
      icon: ListMusic,
      value: "playlist_note",
    },
    {
      title: "Collaborative Playlist",
      subtitle: "Invite friends to create together",
      icon: Users,
      value: "collaborative_note",
    },
    {
      title: "Shared Melody",
      subtitle: "Shared melody",
      icon: Music2,
      value: "shared_melody",
    },
  ];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isOpen ? 0 : -1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#1A1A1A" }}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      enablePanDownToClose={true}
      onChange={(index) => {
        if (index === -1) onClose();
      }}
    >
      <BottomSheetView style={{ padding: 16 }}>
        <YStack gap="$3">
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSelectOption(option.value)}
            >
              <XStack items="center" gap="$3">
                <option.icon color="white" size={24} />
                <YStack>
                  <Text color="white" fontWeight="bold" fontSize={16}>
                    {option.title}
                  </Text>
                  <Text color="gray" fontSize={14}>
                    {option.subtitle}
                  </Text>
                </YStack>
              </XStack>
            </TouchableOpacity>
          ))}
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CreateBottomSheet;