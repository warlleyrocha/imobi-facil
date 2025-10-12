import { clsx } from 'clsx';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'solid' | 'outline' | 'ghost';
  width?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onPress?: () => void;
}

export const ButtonOutline: React.FC<ButtonProps> = ({
  title,
  variant = 'outline',
  width = 'w-full',
  bgColor,
  textColor,
  borderColor,
  iconLeft,
  iconRight,
  className,
  onPress,
  ...rest
}) => {
  const baseStyle = clsx(
    'flex-row items-center justify-center rounded-full px-[28px] py-[12px] active:opacity-80',
    width,
    className
  );

  const variants = {
    solid: clsx('bg-blue-500', bgColor, !textColor && 'text-white'),
    outline: clsx(
      'border border-cor-primaria bg-transparent',
      borderColor,
      !textColor && 'text-cor-primaria'
    ),
    ghost: clsx('bg-transparent', !textColor && 'text-blue-500'),
  };

  const textStyle = clsx(
    'text-[16px] font-mulish-medium text-cor-primaria leading-[18px]',
    variant === 'solid' ? 'text-white' : 'text-cor-primaria',
    textColor
  );

  return (
    <TouchableOpacity className={clsx(baseStyle, variants[variant])} {...rest} onPress={onPress}>
      {iconLeft && <View className="mr-2">{iconLeft}</View>}
      <Text className={textStyle}>{title}</Text>
      {iconRight && <View className="ml-2">{iconRight}</View>}
    </TouchableOpacity>
  );
};
