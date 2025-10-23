import { ReactNode, useEffect } from 'react';
import { Text, View } from 'react-native';

interface FeedbackScreenProps {
  readonly icon: ReactNode;
  readonly title: string;
  readonly description: string;
  readonly onClose?: () => void;
  readonly showCloseButton?: boolean;
  readonly autoRedirectMs?: number;
  readonly onAutoRedirect?: () => void;
  readonly descriptionPaddingX?: number; // novo prop opcional
  readonly titleMarginTop?: number;
}

export function FeedbackScreen({
  icon,
  title,
  description,
  onClose,
  showCloseButton = true,
  autoRedirectMs,
  onAutoRedirect,
  descriptionPaddingX = 58,
  titleMarginTop,
}: FeedbackScreenProps) {
  // Se precisar do auto-redirect, use useEffect aqui
  useEffect(() => {
    if (autoRedirectMs && onAutoRedirect) {
      const timer = setTimeout(onAutoRedirect, autoRedirectMs);
      return () => clearTimeout(timer);
    }
  }, [autoRedirectMs, onAutoRedirect]);

  return (
    <View className="flex-1 items-center justify-center bg-[#F1F2F6] px-[16px] py-[10px]">
      <View className="relative h-[350px] w-[343px] items-center justify-center gap-[12px] rounded-[8px] border border-[#DFE4EA] bg-[#F9FAFB]">
        <View className="relative">
          <View className="inset-0 items-center justify-center">
            <View className="rounded-full bg-[#ACEFC8] p-3 shadow-lg">{icon}</View>
          </View>
        </View>

        <Text
          className="px-[40px] text-center text-[20px] font-bold text-[#262626]"
          style={{ marginTop: titleMarginTop }}>
          {title}
        </Text>
        <Text
          className="text-center text-[14px] leading-[22px] text-[#606268]"
          style={{ paddingHorizontal: descriptionPaddingX }}>
          {description}
        </Text>
      </View>
    </View>
  );
}
