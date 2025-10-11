import { Text, TouchableOpacity } from 'react-native';

interface TabItemProps {
  label: string;
  icon: (color: string) => React.ReactElement;
  active: boolean;
  onPress: () => void;
}

export function TabItem({ label, icon, active, onPress }: TabItemProps) {
  const iconColor = active ? '#3758F9' : '#637381'; // cor do ícone
  const textColor = active ? 'text-cor-primaria' : 'text-texto-c-primario'; // usando classes Tailwind
  const borderBottom = active ? 'border-b-2 border-b-cor-primaria' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center gap-[10px] py-[14px] ${borderBottom}`}>
      {icon(iconColor)}
      <Text className={`font-mulish-medium text-[16px] leading-[18px] ${textColor}`}>{label}</Text>
    </TouchableOpacity>
  );
}
