import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
  AdEventType,
} from "react-native-google-mobile-ads";
import { YStack, Text } from "tamagui";

// const adUnitId = __DEV__
//   ? TestIds.REWARDED
//   : "ca-app-pub-9256713212021306/3967670711";
const adUnitId = "ca-app-pub-9256713212021306/3967670711";

interface AdComponentProps {
  onClose: () => void;
  onReward?: () => void;
}

const AdComponent: React.FC<AdComponentProps> = ({ onClose, onReward }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [rewarded, setRewarded] = useState<RewardedAd | null>(null);

  useEffect(() => {
    // Tạo rewarded ad instance
    const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    setRewarded(rewardedAd);

    // Thiết lập timeout 10 giây
    const timeout = setTimeout(() => {
      console.log("⏰ Hết thời gian sau 10 giây");
      setLoading(false);
      onClose();
    }, 10000);

    // Đăng ký các sự kiện quảng cáo với event types đúng
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log("✅ Quảng cáo đã tải");
        clearTimeout(timeout);
        setLoading(false);
        rewardedAd.show();
      }
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("✅ Người dùng nhận thưởng:", reward);
        if (onReward) onReward();
      }
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log("✅ Quảng cáo đã đóng");
        clearTimeout(timeout);
        setLoading(false);
        onClose();
      }
    );

    const unsubscribeError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error("❌ Lỗi quảng cáo:", error);
        clearTimeout(timeout);
        setLoading(false);
        onClose();
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
  }, [onClose, onReward]);

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
        Đang chuẩn bị quảng cáo...
      </Text>
      {loading && <ActivityIndicator size="large" color="white" />}
    </YStack>
  );
};

export default AdComponent;
