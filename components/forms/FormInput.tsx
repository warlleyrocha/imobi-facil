import { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type FormInputProps = {
  label: string;
  required?: boolean;
  containerClassName?: string;
  textInputClassName?: string;
} & TextInputProps;

export function FormInput({
  label,
  required,
  containerClassName,
  textInputClassName,
  ...props
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`gap-[10px] pb-[12px] ${containerClassName ?? ''}`}>
      <Text className="font-mulish-medium text-[16px] text-dark-5">
        {label}
        {required && <Text style={{ color: '#EF4444' }}>*</Text>}
      </Text>

      <View className="relative">
        {/* Borda de foco (posicionada absolutamente) */}
        {isFocused && (
          <View
            className="absolute -inset-[3px] rounded-[8px] bg-[#DEEAFC]"
            style={{ zIndex: -1 }}
          />
        )}

        <TextInput
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`h-[48px] rounded-[8px] border border-stroke
            bg-white py-[12px] pl-[20px] pr-[16px] 
            font-mulish text-[16px] ${textInputClassName ?? ''}`}
          placeholderTextColor="#9CA3AF"
          style={{ color: '#1F2A37', fontSize: 16 }}
          {...props}
        />
      </View>
    </View>
  );
}
