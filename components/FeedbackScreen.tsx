import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FeedbackScreenProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  autoRedirectMs?: number;
  onAutoRedirect?: () => void;
}

export function FeedbackScreen({
  icon,
  title,
  description,
  onClose,
  showCloseButton = true,
  autoRedirectMs,
  onAutoRedirect,
}: FeedbackScreenProps) {
  // Se precisar do auto-redirect, use useEffect aqui
  // useEffect(() => {
  //   if (autoRedirectMs && onAutoRedirect) {
  //     const timer = setTimeout(onAutoRedirect, autoRedirectMs);
  //     return () => clearTimeout(timer);
  //   }
  // }, [autoRedirectMs, onAutoRedirect]);

  return (
    <View className="flex-1 items-center justify-center bg-white px-[16px] py-[10px]">
      <View className="relative h-[350px] w-[343px] items-center justify-center gap-[12px] rounded-[8px] border border-[#DFE4EA] bg-[#F9FAFB]">
        <View className="relative">
          <View className="inset-0 items-center justify-center">
            <View className="rounded-full bg-[#ACEFC8] p-3 shadow-lg">{icon}</View>
          </View>
        </View>

        <Text className="px-[40px] text-center text-[20px] font-bold text-[#262626]">{title}</Text>
        <Text className="px-[100px] text-center text-[14px] text-[#606268]">{description}</Text>
      </View>
    </View>
  );
}
