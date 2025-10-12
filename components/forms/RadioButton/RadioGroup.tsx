import { FC } from 'react';
import { View } from 'react-native';

import { RadioButton } from './RadioButton';

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: Option[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  layout?: 'row' | 'column';
}

export const RadioGroup: FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onSelect,
  layout = 'row',
}) => {
  return (
    <View className={layout === 'row' ? 'flex-row pb-[10px] gap-[20px]' : 'flex-col'}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onPress={onSelect}
        />
      ))}
    </View>
  );
};
