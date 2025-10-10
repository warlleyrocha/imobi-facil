import { BlurView } from 'expo-blur';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { FormDataWithId } from '@/types/formProperty';

interface Props {
  item: FormDataWithId;
}

export const ReducedItem = ({ item }: Props) => (
  <TouchableOpacity className="w-[108px]">
    <View className="relative w-full">
      <Image
        source={{ uri: item.midias?.[0] ?? 'https://via.placeholder.com/100' }}
        className="h-[110px] w-full rounded-lg"
        resizeMode="cover"
      />
      <BlurView
        intensity={40}
        tint="dark"
        className="absolute bottom-0 left-0 right-0 h-[36px] justify-center overflow-hidden"
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.18)',
        }}>
        <Text className="text-center font-mulish-black text-[14px] text-white">
          ID: {item.id ?? '123456'}
        </Text>
      </BlurView>
    </View>
  </TouchableOpacity>
);
