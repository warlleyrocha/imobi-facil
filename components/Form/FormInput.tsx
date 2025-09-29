import { Text, TextInput, TextInputProps,View } from "react-native";

type FormInputProps = {
  label: string;
  required?: boolean;
  containerClassName?: string;
} & TextInputProps;

export function FormInput({ label, required, containerClassName, ...props }: FormInputProps) {
  return (
    <View className={`gap-[10px] pb-[12px] ${containerClassName ?? ""}`}>
      <Text className="font-mulish-medium text-[16px] text-dark-5">
        {label}{required && "*"}
      </Text>
      <TextInput
        className="h-[48px] font-mulish rounded-[8px] text-[16px] border border-stroke bg-white py-[12px] pl-[20px] pr-[16px]"
        placeholderTextColor="#9CA3AF"
        style={{ color: "#1F2A37", fontSize: 16 }}
        {...props}
      />
    </View>
  );
}
