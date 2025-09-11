import { Text, View } from "react-native";

type Props = {
  title: string;
};

export function FormSectionTitle({ title }: Props) {
  return (
    <View className="pb-[10px]">
      <Text className="font-inter-medium text-[18px] text-[#374151]">{title}</Text>
      <View className="h-px w-full bg-cor-secundaria mt-[4px]" />
    </View>
  );
}
