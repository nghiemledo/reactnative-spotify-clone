import React, { useState } from "react";
import { YStack, XStack, Text, Checkbox } from "tamagui";
import { Linking, TouchableOpacity } from "react-native";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { CheckedState } from "tamagui";

interface TermsAndPreferencesComponentProps {
  onValidationChange: (isValid: boolean) => void;
}

export const TermsAndPreferencesComponent: React.FC<TermsAndPreferencesComponentProps> = ({
  onValidationChange,
}) => {
  const [noMarketing, setNoMarketing] = useState(false);
  const [shareData, setShareData] = useState(false);

  // Update validation when checkbox changes
  React.useEffect(() => {
    onValidationChange(noMarketing || shareData);
  }, [noMarketing, shareData, onValidationChange]);

  const openTerms = () => {
    Linking.openURL("https://example.com/privacy-policy").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openPrivacy = () => {
    Linking.openURL("https://example.com/privacy-policy").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  // Handle checked value to only take boolean
  const handleCheckedChange = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => (checked: CheckedState) => {
    if (checked === "indeterminate") {
      setState(false); // or handle according to your logic
    } else {
      setState(checked);
    }
  };

  return (
    <YStack mt="$4" items="flex-start" gap={"$3"} height={"50%"}>
      <Text color="#fff" fontSize="$1" fontWeight={"bold"}>
        By clicking "Create Account", you agree to our Terms of Use and Privacy Policy.
      </Text> 
      <TouchableOpacity onPress={openTerms}>
        <Text style={{ color: "#1DB954", fontSize: 12, fontWeight: "bold" }}>
          Terms of Use
        </Text>
      </TouchableOpacity>

      <Text color="#fff" fontSize="$1" fontWeight={"bold"}>
        To learn more about how we use, share, and protect your personal data, please review our Privacy Policy.
      </Text>
      <TouchableOpacity onPress={openPrivacy}>
        <Text style={{ color: "#1DB954", fontSize: 12, fontWeight: "bold" }}>
          Privacy Policy
        </Text>
      </TouchableOpacity>
      <XStack items="center" justify="space-between" width="100%">
        <Text color="#fff" fontSize="$1" fontWeight="bold" flex={1} mr={"$3"}>
          I do not want to receive marketing messages from this app.
        </Text>
        <Checkbox
          size="$4"
          backgroundColor="transparent"
          borderRadius={9999}
          borderWidth={2}
          borderColor="gray"
          checked={noMarketing}
          onCheckedChange={handleCheckedChange(setNoMarketing)}
        >
          <Checkbox.Indicator
            backgroundColor="#1DB954"
            borderColor="#1DB954"
            borderRadius={9999}
          >
            <CheckIcon color="black" />
          </Checkbox.Indicator>
        </Checkbox>
      </XStack>
      <XStack items="center" justify="space-between" width="100%">
        <Text color="#fff" fontSize="$1" fontWeight="bold" flex={1} mr={"$3"}>
          Share my registration data with our content providers for marketing purposes.
        </Text>
        <Checkbox
          size="$4"
          backgroundColor="transparent"
          borderRadius={9999}
          borderWidth={2}
          borderColor="gray"
          checked={shareData}
          onCheckedChange={handleCheckedChange(setShareData)}
        >
          <Checkbox.Indicator
            backgroundColor="#1DB954"
            borderColor="#1DB954"
            borderRadius={9999}
          >
            <CheckIcon color="black" />
          </Checkbox.Indicator>
        </Checkbox>
      </XStack>
    </YStack>
  );
};