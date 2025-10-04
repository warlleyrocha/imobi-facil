// components/PurposeBadge.tsx
import { Text, View } from 'react-native';

interface PurposeBadgeProps {
  finalidade: string;
  className?: string;
}

export const PurposeBadge = ({ finalidade, className = '' }: PurposeBadgeProps) => {
  const isVenda = finalidade.toLowerCase() === 'venda';

  const bgColor = isVenda ? '#C2F3D6' : '#DEEAFC';
  const textColor = isVenda ? '#1A8245' : '#2553D0';

  return (
    <View
      style={{ backgroundColor: bgColor }}
      className={`h-[24px] items-center justify-center rounded-full px-[10px] ${className}`}>
      <Text style={{ color: textColor }} className="font-inter-medium text-[10px]">
        {finalidade}
      </Text>
    </View>
  );
};
