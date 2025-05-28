import React, { useCallback, useRef, useEffect } from "react";
import { YStack, Text, Button } from "tamagui";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions, TouchableOpacity } from "react-native";

interface TimerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTimer: (duration: number) => void; // Duration in minutes
}

const TimerBottomSheet: React.FC<TimerBottomSheetProps> = ({
  isOpen,
  onClose,
  onSelectTimer,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;
  const snapPoints = ["55%"];

  // Predefined timer durations (in minutes)
  const timerOptions = [5, 10, 15, 30, 45, 60];

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={() => {
          console.log("TimerBottomSheet backdrop pressed, calling onClose");
          onClose();
          bottomSheetRef.current?.close();
        }}
      />
    ),
    [onClose]
  );

  // Log when isOpen changes
  useEffect(() => {
    console.log("TimerBottomSheet isOpen changed:", isOpen);
    if (isOpen) {
      console.log("Expanding TimerBottomSheet");
      bottomSheetRef.current?.expand();
    } else {
      console.log("Closing TimerBottomSheet");
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isOpen ? 0 : -1} // Directly control index based on isOpen
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#1A1A1A" }}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      enablePanDownToClose={true}
      animateOnMount={true}
      onChange={(index) => {
        console.log("TimerBottomSheet onChange, index:", index);
        if (index === -1) {
          onClose();
        }
      }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          backgroundColor: "#1A1A1A",
          maxHeight: screenHeight * 0.4,
        }}
      >
        <YStack flex={1}>
          <Text
            color="white"
            fontSize={14}
            fontWeight="bold"
            padding="$2"
            borderBottomColor={"gray"}
            borderBottomWidth={1}
            width={"100%"}
            textAlign="center"
            marginBottom="$3"
          >
            Set Timer
          </Text>
          <YStack>
            {timerOptions.map((duration) => (
              <TouchableOpacity
                key={duration}
                onPress={() => {
                  console.log(`Timer option ${duration} selected`);
                  onSelectTimer(duration);
                  onClose();
                }}
              >
                <Text
                  color="white"
                  fontSize={16}
                  alignSelf="flex-start"
                  marginLeft="$2"
                  paddingBottom={"$3"}
                  paddingTop={"$3"}
                >
                  {duration === 60 ? "1 hour" : `${duration} minutes`}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => {
              console.log("Cancel option selected");
              onClose();
            }}>
              <Text
                color="white"
                fontSize={16}
                alignSelf="flex-start"
                marginLeft="$2"
                paddingBottom={"$3"}
                paddingTop={"$3"}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </YStack>
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default TimerBottomSheet;