import React, { useEffect, useState } from "react";
import { YStack, XStack, Button, Text } from "tamagui";
import { TouchableOpacity } from "react-native";
import { InputComponent } from "../components/InputComponent";
import { DatePickerComponent } from "../components/DatePickerComponent";
import { GenderSelectionComponent } from "../components/GenderSelectionComponent";
import { TermsAndPreferencesComponent } from "../components/TermsAndPreferencesComponent";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { StatusBar } from "react-native";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { register, setError } from "../store/authSlice";
import { RootState, AppDispatch } from "../store";

// Define Zod schema for form validation
const formSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
  password: z.string().min(10, "Mật khẩu phải có ít nhất 10 ký tự"),
  dob: z.string().nonempty("Vui lòng chọn hoặc nhập ngày sinh"),
  phoneNumber: z.string().nonempty("Vui lòng nhập số điện thoại"),
  gender: z.string().nonempty("Vui lòng chọn giới tính"),
  firstname: z.string().nonempty("Vui lòng nhập tên"),
  lastname: z.string().nonempty("Vui lòng nhập họ"),
});

type FormSchemaKeys = keyof typeof formSchema.shape;
type PickObject = Partial<Record<FormSchemaKeys, true>>;

type RegisterFormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EmailRegister"
>;

interface RegisterFormScreenProps {
  navigation: RegisterFormScreenNavigationProp;
}

export default function EmailRegisterScreen({
  navigation,
}: RegisterFormScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

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

  const inputConfigs = [
    {
      label: "Email của bạn là gì?",
      placeholder: "Email",
      keyboardType: "email-address" as "email-address",
      secureTextEntry: false,
      key: "email",
    },
    {
      label: "Tạo một mật khẩu",
      placeholder: "Mật khẩu",
      keyboardType: "default" as "default",
      secureTextEntry: true,
      key: "password",
    },
    {
      label: "Ngày sinh của bạn là gì?",
      placeholder: "DD/MM/YYYY",
      keyboardType: "default" as "default",
      secureTextEntry: false,
      key: "dob",
      component: "dateInput",
    },
    {
      label: "Số điện thoại của bạn là gì?",
      placeholder: "Số điện thoại",
      keyboardType: "phone-pad" as "phone-pad",
      secureTextEntry: false,
      key: "phoneNumber",
    },
    {
      label: "Giới tính của bạn là gì?",
      placeholder: "",
      keyboardType: "default" as "default",
      secureTextEntry: false,
      key: "gender",
      component: "genderSelection",
    },
    {
      label: "Họ và tên của bạn là gì?",
      fields: [
        {
          label: "Họ",
          placeholder: "Họ",
          keyboardType: "default" as "default",
          secureTextEntry: false,
          key: "lastname",
        },
        {
          label: "Tên",
          placeholder: "Tên",
          keyboardType: "default" as "default",
          secureTextEntry: false,
          key: "firstname",
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
          [currentConfig.key]: formData[currentConfig.key as keyof typeof formData],
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
          alert("Ngày sinh không hợp lệ (DD/MM/YYYY)");
          return;
        }
        const daysInMonth = new Date(year, month - 1, 0).getDate();
        if (day > daysInMonth) {
          alert("Ngày không hợp lệ cho tháng này");
          return;
        }
      }

      // Validate terms and conditions for the last step
      if (step === 5 && !isTermsValid) {
        alert("Vui lòng chọn ít nhất một tùy chọn liên quan đến tiếp thị");
        return;
      }

      if (step < inputConfigs.length - 1) {
        setStep(step + 1);
      } else {
        // Gọi API đăng ký với các trường yêu cầu
        await dispatch(
          register({
            lastName: formData.lastname,
            firstName: formData.firstname,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
          })
        ).unwrap();

        console.log("Đăng ký với:", formData);
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigation.navigate("Main", { screen: "login" }); 
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
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  return (
    <YStack flex={1} backgroundColor="#000">
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Navbar */}
      <XStack
        position="absolute"
        top={0}
        left={0}
        right={0}
        height={60}
        alignItems="center"
        paddingHorizontal="$4"
        backgroundColor="#000"
        zIndex={1000}
        paddingTop={StatusBar.currentHeight || 20}
      >
        <XStack flex={1} justifyContent="flex-start">
          <TouchableOpacity onPress={handleBack} style={{ padding: 10 }}>
            <Button
              size="$8"
              chromeless
              icon={<ArrowLeft color="white" />}
              color="white"
              padding={0}
              backgroundColor="transparent"
              pressStyle={{
                backgroundColor: "transparent",
                borderBlockColor: "transparent",
              }}
            />
          </TouchableOpacity>
        </XStack>

        <XStack flex={1} justifyContent="center">
          <Text
            fontSize="$4"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            Tạo tài khoản
          </Text>
        </XStack>

        <XStack flex={1} />
      </XStack>

      <YStack
        alignItems="flex-start"
        justifyContent="center"
        padding="$4"
        paddingTop={80}
      >
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
            onChange={currentConfig.key ? handleChange(currentConfig.key) : () => {}}
            keyboardType={currentConfig.keyboardType}
            secureTextEntry={currentConfig.secureTextEntry}
          />
        )}
        {currentConfig.component === "nameInput" && (
          <TermsAndPreferencesComponent onValidationChange={setIsTermsValid} />
        )}
        <Button
          backgroundColor="#1DB954"
          borderRadius="$10"
          width="40%"
          height="$4"
          onPress={handleNext}
          margin="auto"
          marginTop="$4"
          disabled={step === 5 && (!isTermsValid || loading)}
        >
          <Text color="#fff" fontSize="$4" fontWeight="bold">
            {step === inputConfigs.length - 1 ? "Tạo tài khoản" : "Tiếp"}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
}