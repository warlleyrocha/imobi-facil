import { TouchableOpacity, View, Text } from 'react-native';
import { FC } from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
}

export const RadioButton: FC<RadioButtonProps> = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity
      className="w-[152px] flex-row items-center rounded-lg border border-stroke py-[12px] pl-[20px] pr-4"
      onPress={() => onPress(value)}
      activeOpacity={0.7}>
      <View
        className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
          selected ? 'border-blue-500' : 'border-gray-400'
        }`}>
        {selected && <View className="h-3 w-3 rounded-full bg-blue-500" />}
      </View>
      <Text className="ml-[10px] font-mulish text-base text-dark-2">{label}</Text>
    </TouchableOpacity>
  );
};
