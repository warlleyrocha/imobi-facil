import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={`items-center bg-indigo-500 rounded-[28px] shadow-md p-4 ${touchableProps.className}`}>
      <Text className='text-white text-lg font-semibold text-center'>{title}</Text>
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';
