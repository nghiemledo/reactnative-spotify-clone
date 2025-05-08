import { Button, YStack } from "tamagui";
import { AnimatePresence, MotiView } from "moti";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Text } from "react-native";
import { Play } from "@tamagui/lucide-icons";

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
    setIsOpen(true);
  };

  return (
    <BottomSheetModalProvider>
      <YStack flex={1}>
        <AnimatePresence>
          {isOpen && (
            <MotiView
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Text>Animated Content</Text>
            </MotiView>
          )}
        </AnimatePresence>
        <Button onPress={openBottomSheet} icon={Play}>
          Open Bottom Sheet
        </Button>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["25%", "50%"]}
          onDismiss={() => setIsOpen(false)}
        >
          <YStack p="$4">
            <Text>Bottom Sheet Content</Text>
          </YStack>
        </BottomSheetModal>
      </YStack>
    </BottomSheetModalProvider>
  );
}
