import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import MenuIcon from '@/assets/icons-svg/menu.svg';

interface HeaderNewProps {
  title?: string;
}

export default function HeaderNew({ title }: HeaderNewProps) {
  return (
    <View className="px-[16px] pb-[20px] pt-[65px]">
      <View className="flex-row items-center justify-center">
        <TouchableOpacity className="absolute left-0">
          <MenuIcon />
        </TouchableOpacity>

        <Text className="font-mulish-bold text-[20px] leading-[22px] text-dark">{title}</Text>
      </View>
    </View>
  );
}
