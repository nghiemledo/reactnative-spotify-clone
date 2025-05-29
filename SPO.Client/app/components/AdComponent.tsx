import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
  AdEventType,
} from "react-native-google-mobile-ads";
import { YStack, Text, Button } from "tamagui";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-9256713212021306/9858205924";

interface AdComponentProps {
  onClose: () => void;
  onReward?: () => void;
}

const AdComponent: React.FC<AdComponentProps> = ({ onClose, onReward }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const maxRetries = 2; // Số lần thử lại tối đa

  useEffect(() => {
    // Tạo rewarded ad instance
    const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: false,
      keywords: ["game", "entertainment", "reward"], // Tăng tỷ lệ điền quảng cáo
    });

    // Thiết lập timeout 30 giây
    const timeout = setTimeout(() => {
      console.log("⏰ Hết thời gian sau 30 giây");
      setLoading(false);
      setErrorMessage("Không thể tải quảng cáo. Vui lòng thử lại sau.");
      if (retryCount < maxRetries) {
        console.log(`🔄 Thử lại lần ${retryCount + 1}`);
        setRetryCount(retryCount + 1);
        rewardedAd.load(); // Thử tải lại quảng cáo
      } else {
        onClose();
      }
    }, 30000);

    // Đăng ký các sự kiện quảng cáo
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log("✅ Quảng cáo đã tải");
        clearTimeout(timeout);
        setLoading(false);
        setErrorMessage(null);
        rewardedAd.show();
      }
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("✅ Người dùng nhận thưởng:", reward);
        if (onReward) onReward();
        clearTimeout(timeout);
        setLoading(false);
        setErrorMessage(null);
        onClose();
      }
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log("✅ Quảng cáo đã đóng");
        clearTimeout(timeout);
        setLoading(false);
        setErrorMessage(null);
        onClose();
      }
    );

    const unsubscribeError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error("❌ Lỗi quảng cáo:", error.message);
        clearTimeout(timeout);
        setLoading(false);
        setErrorMessage(`Lỗi tải quảng cáo: ${error.message}`);
        if (retryCount < maxRetries) {
          console.log(`🔄 Thử lại lần ${retryCount + 1}`);
          setRetryCount(retryCount + 1);
          rewardedAd.load(); // Thử tải lại quảng cáo
        } else {
          onClose();
        }
      }
    );

    // Tải quảng cáo
    console.log("⏳ Đang tải quảng cáo...");
    rewardedAd.load();

    // Dọn dẹp
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
      unsubscribeError();
      clearTimeout(timeout);
    };
  }, [onClose, onReward, retryCount]);

  return (
    <YStack
      flex={1}
      justify="center"
      items="center"
      bg="rgba(0,0,0,0.8)"
      position="absolute"
      t={0}
      l={0}
      r={0}
      b={0}
      z={9999}
    >
      <Text color="white" mb="$2" fontSize={16}>
        {errorMessage || "Đang chuẩn bị quảng cáo..."}
      </Text>
      {loading && <ActivityIndicator size="large" color="white" />}
      {errorMessage && !loading && (
        <Button
          onPress={() => {
            setErrorMessage(null);
            setLoading(true);
            setRetryCount(retryCount + 1);
            RewardedAd.createForAdRequest(adUnitId, {
              requestNonPersonalizedAdsOnly: false,
              keywords: ["game", "entertainment", "reward"],
            }).load();
          }}
          disabled={retryCount >= maxRetries}
        >
          Thử lại
        </Button>
      )}
    </YStack>
  );
};

export default AdComponent;
