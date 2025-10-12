import { FC } from 'react';
import { Text,TouchableOpacity, View } from 'react-native';

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
}

export const RadioButton: FC<RadioButtonProps> = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity
      className="h-[52px] w-[162px] flex-row items-center rounded-lg border border-stroke bg-white py-[12px] pl-[20px] pr-4"
      onPress={() => onPress(value)}
      activeOpacity={0.7}>
      <View
        className={`h-[20px] w-[20px] items-center justify-center rounded-full border-2 ${
          selected ? 'border-blue-500' : 'border-gray-400'
        }`}>
        {selected && <View className="h-[10px] w-[10px] rounded-full bg-blue-500" />}
      </View>
      <Text className="ml-[10px] font-mulish text-[16px] text-dark-2">{label}</Text>
    </TouchableOpacity>
  );
};
