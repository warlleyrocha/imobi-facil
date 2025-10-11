import clsx from 'clsx';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArrowLeftIcon from '@/assets/icons-svg/arrow-left-black.svg';

interface HeaderProps {
  title?: string;
  paddingTopClass?: string;
  paddingBottomClass?: string;
  onBackPress?: () => void;
}

const Header = ({ title, onBackPress, paddingTopClass, paddingBottomClass }: HeaderProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    if (onBackPress) {
      onBackPress(); // chama callback customizado
    } else {
      router.back(); // fallback padrão
    }
  };

  // Classe padrão (com safe area)
  const defaultPaddingTop = `pt-[${insets.top + 16}px]`;
  const defaultPaddingBottom = 'pb-[32px]';

  return (
    <View
      className={`${paddingTopClass ?? defaultPaddingTop} ${paddingBottomClass ?? defaultPaddingBottom}`}>
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={goBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text className="font-mulish-bold text-[20px] leading-[22px] text-dark">{title}</Text>
        {/* view "fantasma" para equilibrar o layout */}
        <View className="w-[10px]" />
      </View>
    </View>
  );
};

export default Header;
