import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import ArrowLeftIcon from '@/assets/icons-svg/arrow-left-black.svg';

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <View className="pb-[32px] pt-[72px]">
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
