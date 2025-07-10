import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  showBackButton?: boolean;
}

export default function Header({
  title,
  onBackPress,
  backgroundColor = '#white', // orange-600
  textColor = 'black',
  iconColor = 'black',
  showBackButton = true,
}: HeaderProps) {
  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
      <View className="flex-row items-center justify-center bg-white" style={{ backgroundColor }}>
        {/* Botão de Voltar */}
        <View className="w-10">
          {showBackButton && (
            <TouchableOpacity
              onPress={onBackPress}
              className="h-10 w-10 items-center justify-center rounded-full"
              activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={24} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>

        {/* Título */}
        <Text
          className="flex-1 text-center text-lg font-semibold"
          style={{ color: textColor }}
          numberOfLines={1}>
          {title}
        </Text>
        <View className="w-10" />
      </View>
    </>
  );
}
