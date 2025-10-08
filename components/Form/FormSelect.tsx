import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type Option = {
  readonly label: string;
  readonly value: string;
};

type FormSelectProps = {
  readonly label: string;
  readonly required?: boolean;
  readonly options: Option[];
  readonly value: string | null;
  readonly onChange: (val: string) => void;
};

export function FormSelect({ label, required, options, value, onChange }: FormSelectProps) {
  return (
    <View className="gap-[10px] pb-[12px]">
      <Text className="font-mulish-medium text-[16px] text-dark-5">
        {label}
        {required && '*'}
      </Text>
      <Dropdown
        style={{
          height: 50,
          borderColor: '#DFE4EA',
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 20,
          backgroundColor: '#FAFAFA',
          paddingVertical: 12,
        }}
        data={options}
        labelField="label"
        valueField="value"
        placeholder="Selecione"
        value={value}
        onChange={(item) => onChange(item.value)}
      />
    </View>
  );
}
