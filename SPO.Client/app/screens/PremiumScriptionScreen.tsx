import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Animated, Linking, Alert } from "react-native";
import { YStack, XStack, Text, Image, H3, Button } from "tamagui";
import {
  BellDot,
  VolumeX,
  CircleArrowDown,
  Shuffle,
  Headphones,
  Users,
  ListPlus,
  Star,
} from "@tamagui/lucide-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "@tamagui/linear-gradient";
import { PremiumStackParamList } from "../navigation/PremiumNavigator";

type PremiumSubscriptionScreenNavigationProp = NativeStackNavigationProp<
  PremiumStackParamList,
  "Premium"
>;

type PremiumSubscriptionScreenProps = {
  navigation: PremiumSubscriptionScreenNavigationProp;
};

export default function PremiumSubscriptionScreen({
  navigation,
}: PremiumSubscriptionScreenProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isProcessingIndividual, setIsProcessingIndividual] = useState(false);
  const [isProcessingStudent, setIsProcessingStudent] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Lắng nghe deep link
    const handleDeepLink = ({ url }: { url: string }) => {
      console.log("Deep Link URL:", url);
      if (url.includes("myapp://truong1510.com/success") && paymentId && plan) {
        // Lấy chi tiết thanh toán thực tế từ PayPal
        getPaymentDetails(paymentId)
          .then((paymentDetails) => {
            console.log("trạng thái: " + paymentDetails.state);

            if (paymentDetails.state === "created") {
              // Lấy thông tin chi tiết từ paymentDetails
              const amount = paymentDetails.transactions[0].amount.total;
              const currency = paymentDetails.transactions[0].amount.currency;
              const createTime = paymentDetails.create_time;
              navigation.navigate("OrderSuccess", {
                plan,
                amount,
                currency,
                createTime,
              });
            } else {
              Alert.alert(
                "Lỗi",
                "Thanh toán không thành công. Vui lòng thử lại."
              );
            }
          })
          .catch((error) => {
            console.error("Error fetching payment details:", error);
            Alert.alert(
              "Lỗi",
              "Không thể lấy chi tiết thanh toán. Vui lòng thử lại."
            );
          });
      } else if (url.includes("myapp://truong1510.com/cancel")) {
        Alert.alert("Hủy", "Thanh toán đã bị hủy.");
      }
    };

    // Lắng nghe URL khi ứng dụng đang chạy
    Linking.addEventListener("url", handleDeepLink);

    // Kiểm tra URL khi ứng dụng mở lần đầu
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      // Dọn dẹp listener
      Linking.removeAllListeners("url");
    };
  }, [navigation, paymentId, plan]);

  // Client ID và Secret từ PayPal Sandbox
  const PAYPAL_CLIENT_ID =
    "AfHGNGn0WTw_452kVntETCGTECssOjiom_ziHQo0st4fCufkNY9wVfZ3xAYxD9UN9oc_lwwvtxuqJfgI";
  const PAYPAL_SECRET =
    "ELXkp3xddZfrVSf3nDVCtKU0TF2vwlrA61-Xswcr7pjSaPRLKAdfCScsbi4aTnlGIZNPGuUtB_kYAX5u"; // Thay bằng Secret thật của bạn

  // Lấy access token từ PayPal
  const getAccessToken = async () => {
    try {
      const accessTokenResponse = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Language": "en_US",
            Authorization:
              "Basic " + btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`),
          },
          body: "grant_type=client_credentials",
        }
      );

      if (!accessTokenResponse.ok) {
        const errorData = await accessTokenResponse.json();
        console.error("Access Token Error Response:", errorData);
        throw new Error(
          `Không thể lấy access token: ${JSON.stringify(errorData)}`
        );
      }

      const tokenData = await accessTokenResponse.json();
      console.log("Access Token Response:", tokenData);
      return tokenData.access_token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  };

  // Tạo đơn hàng với PayPal API
  const createPayPalOrder = async (price: string, plan: string) => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) throw new Error("Không thể lấy access token");

      const response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/payments/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            intent: "sale",
            payer: { payment_method: "paypal" },
            redirect_urls: {
              return_url: "myapp://truong1510.com/success", // Deep link để quay lại ứng dụng
              cancel_url: "myapp://truong1510.com/cancel", // Deep link để xử lý hủy
            },
            transactions: [
              {
                amount: { total: price, currency: "USD" },
                description: `Payment for ${plan} Premium Subscription`,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Create Order Error Response:", errorData);
        throw new Error(`Không thể tạo đơn hàng: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();

      if (data.links) {
        const approvalUrl = data.links.find(
          (link: any) => link.rel === "approval_url"
        ).href;
        console.log("Approval URL:", approvalUrl);
        return { approvalUrl, paymentId: data.id };
      }
      throw new Error("Không thể tạo đơn hàng: Không tìm thấy approval URL");
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      throw error;
    }
  };

  // Lấy chi tiết thanh toán từ PayPal
  const getPaymentDetails = async (paymentId: string) => {
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(
        `https://api-m.sandbox.paypal.com/v1/payments/payment/${paymentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Get Payment Details Error Response:", errorData);
        throw new Error(
          `Không thể lấy chi tiết thanh toán: ${JSON.stringify(errorData)}`
        );
      }

      const paymentDetails = await response.json();
      console.log("Payment Details:", paymentDetails);
      return paymentDetails;
    } catch (error) {
      console.error("Error fetching payment details:", error);
      throw error;
    }
  };

  // Hàm xử lý thanh toán cho Individual plan
  const handlePaypalPaymentIndividual = async () => {
    setIsProcessingIndividual(true);
    try {
      const orderData = await createPayPalOrder(
        (59000 / 23000).toFixed(2),
        "Individual"
      ); // Chuyển VND sang USD
      if (!orderData) throw new Error("Không thể tạo đơn hàng");

      const { approvalUrl, paymentId } = orderData;
      setPaymentId(paymentId); // Lưu paymentId
      setPlan("Individual"); // Lưu plan

      // Mở trình duyệt mặc định với Linking
      await Linking.openURL(approvalUrl);
    } catch (error) {
      console.error("Payment error (Individual):", error);
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi thanh toán. Vui lòng kiểm tra log."
      );
    } finally {
      setIsProcessingIndividual(false);
    }
  };

  // Hàm xử lý thanh toán cho Student plan
  const handlePaypalPaymentStudent = async () => {
    setIsProcessingStudent(true);
    try {
      const orderData = await createPayPalOrder(
        (29000 / 23000).toFixed(2),
        "Student"
      ); // Chuyển VND sang USD
      if (!orderData) throw new Error("Không thể tạo đơn hàng");

      const { approvalUrl, paymentId } = orderData;
      setPaymentId(paymentId); // Lưu paymentId
      setPlan("Student"); // Lưu plan

      // Mở trình duyệt mặc định với Linking
      await Linking.openURL(approvalUrl);
    } catch (error) {
      console.error("Payment error (Student):", error);
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi thanh toán. Vui lòng kiểm tra log."
      );
    } finally {
      setIsProcessingStudent(false);
    }
  };

  return (
    <YStack flex={1} bg="#121212" pb={35}>
      <Animated.Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2019/02/08/17/57/cubes-3983666_1280.jpg",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 460,
        }}
        resizeMode="cover"
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <YStack height={200} />
        <LinearGradient
          flex={1}
          colors={["transparent", "#121212"]}
          start={[0, 0]}
          end={[0, 0.1]}
          p="$4"
        >
          <YStack>
            <XStack items="center">
              <Star size={30} color="yellow" fontWeight="bold" />
              <Text ml={7} color="#fff" fontSize={30} fontWeight="bold">
                Premium
              </Text>
            </XStack>
            <Text mb={10}>
              <H3 color="white" fontSize={30} fontWeight="bold">
                Get 4 months of Premium for ₫59,000 with Spotify
              </H3>
            </Text>
            <XStack
              bg="rgba(128, 128, 128, 0.2)"
              items="center"
              my={15}
              p={10}
              width={200}
              rounded={3}
            >
              <BellDot size={18} color="#1E90FF" mr={5} />
              <Text color="white" fontSize={16} fontWeight="400">
                Offer ends in 2 days
              </Text>
            </XStack>
            <Button
              items="center"
              rounded={50}
              bg="#fff"
              my={15}
              height={55}
              disabled={isProcessingIndividual}
              onPress={handlePaypalPaymentIndividual}
            >
              <Text fontWeight="bold" fontSize={18}>
                Try 4 months for ₫59,000
              </Text>
            </Button>

            <Text color="gray" my={15}>
              ₫59,000 for 4 months, then ₫59,000 per month after. Offer only
              available if you haven’t tried Premium before and you subscribe
              via Spotify. Offers via Google Play may differ. Terms apply. Offer
              ends May 19, 2025.
            </Text>
            <YStack my={15} py={30} bg="#222222" rounded={13} overflow="hidden">
              <Text
                fontWeight="bold"
                color="#fff"
                fontSize={20}
                px={20}
                pb={15}
              >
                Why join Premium?
              </Text>
              <XStack height={1} bg="#555555" />
              <XStack py={15} px={20}>
                <VolumeX color="#fff" />
                <Text ml={10} color="#fff">
                  Ad-free music listening
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <CircleArrowDown color="#fff" />
                <Text ml={10} color="#fff">
                  Download to listen offline
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <Shuffle color="#fff" />
                <Text ml={10} color="#fff">
                  Play songs in any order
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <Headphones color="#fff" />
                <Text ml={10} color="#fff">
                  High audio quality
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <Users color="#fff" />
                <Text ml={10} color="#fff">
                  Listen with friends in real time
                </Text>
              </XStack>
              <XStack pt={15} px={20}>
                <ListPlus color="#fff" />
                <Text ml={10} color="#fff">
                  Organize listening queue
                </Text>
              </XStack>
            </YStack>

            <Text
              borderBottomColor="#555555"
              fontWeight="bold"
              color="#fff"
              fontSize={20}
              pt={25}
              pb={15}
            >
              Available plans
            </Text>
            <YStack my={15} bg="#222222" rounded={13} overflow="hidden">
              <XStack
                p={5}
                bg="#FFCCCC"
                width={215}
                items="center"
                justify="center"
                borderBottomRightRadius={8}
              >
                <Text color="#000" fontSize={16} fontWeight="bold">
                  ₫59,000 for 4 months
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <Star color="#fff" />
                <Text ml={7} color="#fff" fontSize={16} fontWeight="bold">
                  Premium
                </Text>
              </XStack>
              <Text
                px={20}
                pb={15}
                color="#FFCCCC"
                fontSize={21}
                fontWeight="bold"
              >
                Individual
              </Text>
              <Text px={20} color="#fff" fontSize={17} fontWeight="bold">
                ₫59,000 for 4 months
              </Text>
              <Text px={20} pb={15} color="gray" fontSize={14}>
                ₫59,000 / month after
              </Text>
              <XStack height={1} bg="#555555" />
              <YStack pl={40} py={20}>
                <Text color="#fff" fontSize={16}>
                  • 1 Premium account
                </Text>
                <Text color="#fff" fontSize={16}>
                  • Cancel any time
                </Text>
                <Text color="#fff" fontSize={16}>
                  • Subscribe or one-time payment
                </Text>
              </YStack>
              <Button
                items="center"
                rounded={50}
                bg="#FFCCCC"
                my={15}
                mx={20}
                height={55}
                disabled={isProcessingIndividual}
                onPress={handlePaypalPaymentIndividual}
              >
                <Text fontWeight="bold" fontSize={18}>
                  Try 4 months for ₫59,000
                </Text>
              </Button>
              <Button
                items="center"
                rounded={50}
                bg="transparent"
                borderColor="#fff"
                my={5}
                mx={20}
                height={55}
                onPress={() =>
                  console.log(
                    "You bought Spotify Premium for Individual by One-time payment. Thank You!"
                  )
                }
              >
                <Text color="#fff" fontWeight="bold" fontSize={18}>
                  One-time payment
                </Text>
              </Button>
              <Text color="gray" mt={15} mb={20} mx={20} text="center">
                ₫59,000 for 4 months, then ₫59,000 per month after. Offer only
                available if you haven’t tried Premium before and you subscribe
                via Spotify. Offers via Google Play may differ. Terms apply.
                Offer ends May 19, 2025.
              </Text>
            </YStack>
            <YStack my={15} bg="#222222" rounded={13} overflow="hidden">
              <XStack
                p={5}
                bg="#9999CC"
                width={215}
                items="center"
                justify="center"
                borderBottomRightRadius={8}
              >
                <Text color="#000" fontSize={16} fontWeight="bold">
                  ₫29,000 for 3 months
                </Text>
              </XStack>
              <XStack py={15} px={20}>
                <Star color="#fff" />
                <Text ml={7} color="#fff" fontSize={16} fontWeight="bold">
                  Premium
                </Text>
              </XStack>
              <Text
                px={20}
                pb={15}
                color="#9999CC"
                fontSize={21}
                fontWeight="bold"
              >
                Student
              </Text>
              <Text px={20} color="#fff" fontSize={17} fontWeight="bold">
                ₫29,000 for 3 months
              </Text>
              <Text px={20} pb={15} color="gray" fontSize={14}>
                ₫29,000 / month after
              </Text>
              <XStack height={1} bg="#555555" />
              <YStack pl={40} py={20}>
                <Text color="#fff" fontSize={16}>
                  • 1 Premium account
                </Text>
                <Text color="#fff" fontSize={16}>
                  • Discount for eligible students
                </Text>
                <Text color="#fff" fontSize={16}>
                  • Cancel any time
                </Text>
                <Text color="#fff" fontSize={16}>
                  • Subscribe or one-time payment
                </Text>
              </YStack>
              <Button
                items="center"
                rounded={50}
                bg="#9999CC"
                my={15}
                mx={20}
                height={55}
                disabled={isProcessingStudent}
                onPress={handlePaypalPaymentStudent}
              >
                <Text fontWeight="bold" fontSize={18}>
                  Try 3 months for ₫29,000
                </Text>
              </Button>
              <Text color="gray" mt={15} mb={20} mx={20} text="center">
                ₫29,000 for 3 months, then ₫29,000 per month after. Offer only
                available if you haven’t tried Premium before and you subscribe
                via Spotify. Offers via Google Play may differ. Terms apply.
                Offer ends May 19, 2025.
              </Text>
            </YStack>
          </YStack>
        </LinearGradient>
      </ScrollView>
    </YStack>
  );
}