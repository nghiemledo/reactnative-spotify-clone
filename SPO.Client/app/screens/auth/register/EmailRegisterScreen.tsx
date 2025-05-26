import React, { useEffect, useState } from "react";
import { YStack, XStack, Button, Text } from "tamagui";
import { TouchableOpacity } from "react-native";
import { InputComponent } from "../../../components/InputComponent";
import { DatePickerComponent } from "../../../components/DatePickerComponent";
import { GenderSelectionComponent } from "../../../components/auth/GenderSelectionComponent";
import { TermsAndPreferencesComponent } from "../../../components/auth/TermsAndPreferencesComponent";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { z } from "zod";
import { SplashStackParamList } from "../../../navigation/SplashNavigator";
import { useRegisterMutation } from "../../../services/AuthService";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dob: z.string().nonempty("Please enter your date of birth"),
  phoneNumber: z.string().nonempty("Please enter your phone number"),
  gender: z.string().nonempty("Please enter your gender"),
  firstname: z.string().nonempty("Please enter first name"),
  lastname: z.string().nonempty("Please enter last name"),
});

type FormSchemaKeys = keyof typeof formSchema.shape;
type PickObject = Partial<Record<FormSchemaKeys, true>>;

const EmailRegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<SplashStackParamList>>();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    dob: "",
    phoneNumber: "",
    gender: "",
    firstname: "",
    lastname: "",
  });
  const [isTermsValid, setIsTermsValid] = useState(false);
  const [register] = useRegisterMutation();

  const inputConfigs = [
    {
      label: "Your email",
      placeholder: "Please enter your email",
      keyboardType: "email-address" as "email-address",
      secureTextEntry: false,
      key: "email",
    },
    {
      label: "Password",
      placeholder: "Please enter your password",
      keyboardType: "default" as "default",
      secureTextEntry: true,
      key: "password",
    },
    {
      label: "Birth date",
      placeholder: "DD/MM/YYYY",
      keyboardType: "default" as "default",
      secureTextEntry: false,
      key: "dob",
      component: "dateInput",
    },
    {
      label: "Phone number",
      placeholder: "Please enter your phone number",
      keyboardType: "phone-pad" as "phone-pad",
      secureTextEntry: false,
      key: "phoneNumber",
    },
    {
      label: "Gender",
      placeholder: "",
      keyboardType: "default" as "default",
      secureTextEntry: false,
      key: "gender",
      component: "genderSelection",
    },
    {
      label: "Name",
      fields: [
        {
          label: "First name",
          placeholder: "Please enter your first name",
          keyboardType: "default" as "default",
          secureTextEntry: false,
          key: "firstname",
        },
        {
          label: "Last name",
          placeholder: "Please enter your last name",
          keyboardType: "default" as "default",
          secureTextEntry: false,
          key: "lastname",
        },
      ],
      component: "nameInput",
    },
  ];

  const currentConfig = inputConfigs[step];

  const handleChange = (key: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = async () => {
    try {
      // Validate current field(s) using Zod
      if (currentConfig.component === "nameInput") {
        const currentFields = {
          lastname: formData.lastname,
          firstname: formData.firstname,
        };
        const pickObject: PickObject = { lastname: true, firstname: true };
        formSchema.pick(pickObject).parse(currentFields);
      } else if (currentConfig.key) {
        const currentField = {
          [currentConfig.key]:
            formData[currentConfig.key as keyof typeof formData],
        };
        const pickObject: PickObject = { [currentConfig.key]: true };
        formSchema.pick(pickObject).parse(currentField);
      }

      if (step === 2) {
        const [day, month, year] = formData.dob.split("/").map(Number);
        if (
          !day ||
          !month ||
          !year ||
          day < 1 ||
          day > 31 ||
          month < 1 ||
          month > 12 ||
          year < 1900 ||
          year > 2025
        ) {
          alert("Date of birth invalid (DD/MM/YYYY)");
          return;
        }
        const daysInMonth = new Date(year, month - 1, 0).getDate();
        if (day > daysInMonth) {
          alert("Invalid date for the selected month");
          return;
        }
      }

      // Validate terms and conditions for the last step
      if (step === 5 && !isTermsValid) {
        alert("Please accept the terms and conditions");
        return;
      }

      if (step < inputConfigs.length - 1) {
        setStep(step + 1);
      } else {
        try {
          const response = await register({
            lastName: formData.lastname,
            firstName: formData.firstname,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
          }).unwrap();
          if (response) {
            alert("Registration successful");
            navigation.navigate("Login");
          } else {
            alert("Registration failed");
          }
        } catch (err: any) {
          // Handle error thrown by unwrap()
          alert(err?.data?.message || "Registration failed");
          return;
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors[0].message);
      } else {
        alert("Đã xảy ra lỗi, vui lòng thử lại");
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      try {
        navigation.goBack();
      } catch (error) {
        console.error("goBack failed:", error);
        navigation.navigate("Register");
      }
    }
  };

  // Hiển thị lỗi từ API nếu có
  // useEffect(() => {
  //   if (error) {
  //     alert(error);
  //     dispatch(setError(null));
  //   }
  // }, [error, dispatch]);

  return (
    <YStack flex={1} bg="#000">
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Navbar */}
      <XStack
        position="absolute"
        t={0}
        l={0}
        r={0}
        height={60}
        items="center"
        px="$4"
        bg="#000"
        z={1000}
        pt={StatusBar.currentHeight || 20}
      >
        <XStack flex={1} justify="flex-start">
          <TouchableOpacity onPress={handleBack} style={{ padding: 10 }}>
            <Button
              size="$8"
              chromeless
              icon={<ArrowLeft color="white" />}
              color="white"
              p={0}
              bg="transparent"
              pressStyle={{
                bg: "transparent",
                borderBlockColor: "transparent",
              }}
            />
          </TouchableOpacity>
        </XStack>

        <XStack flex={1} justify="center">
          <Text fontSize="$4" fontWeight="bold" color="white" text="center">
            Tạo tài khoản
          </Text>
        </XStack>

        <XStack flex={1} />
      </XStack>

      <YStack items="flex-start" justify="center" p="$4" pt={80}>
        {currentConfig.component === "dateInput" ? (
          <DatePickerComponent
            label={currentConfig.label}
            placeholder={currentConfig.placeholder}
            value={formData.dob}
            onChange={handleChange("dob")}
          />
        ) : currentConfig.component === "genderSelection" ? (
          <GenderSelectionComponent
            onSelect={handleChange("gender")}
            initialGender={formData.gender}
          />
        ) : currentConfig.component === "nameInput" ? (
          <YStack width="100%" space="$4">
            {currentConfig.fields!.map((field) => (
              <InputComponent
                key={field.key}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.key as keyof typeof formData]}
                onChange={handleChange(field.key)}
                keyboardType={field.keyboardType}
                secureTextEntry={field.secureTextEntry}
              />
            ))}
          </YStack>
        ) : (
          <InputComponent
            key={`input-step-${step}`}
            label={currentConfig.label}
            placeholder={currentConfig.placeholder}
            value={formData[currentConfig.key as keyof typeof formData]}
            onChange={
              currentConfig.key ? handleChange(currentConfig.key) : () => {}
            }
            keyboardType={currentConfig.keyboardType}
            secureTextEntry={currentConfig.secureTextEntry}
          />
        )}
        {currentConfig.component === "nameInput" && (
          <TermsAndPreferencesComponent onValidationChange={setIsTermsValid} />
        )}
        <Button
          bg="#1DB954"
          rounded="$10"
          width="40%"
          height="$4"
          onPress={handleNext}
          m="auto"
          mt="$4"
          // disabled={step === 5 && (!isTermsValid || loading)}
        >
          <Text color="#fff" fontSize="$4" fontWeight="bold">
            {step === inputConfigs.length - 1 ? "Tạo tài khoản" : "Tiếp"}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
};

export default EmailRegisterScreen;
