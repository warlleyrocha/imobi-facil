import { View } from 'react-native';

import { GridAltIcon, LayoutAltIcon, LayoutAltSecondIcon } from '@/components/Icons/TabGroup';

import { TabItem } from './TabItem';

interface Props {
  selectedTab: string;
  onSelect: (id: string) => void;
}

const TAB_ITEMS = [
  { id: '1', icon: (color: string) => <GridAltIcon color={color} />, label: 'Reduzido' },
  { id: '2', icon: (color: string) => <LayoutAltSecondIcon color={color} />, label: 'Médio' },
  { id: '3', icon: (color: string) => <LayoutAltIcon color={color} />, label: 'Ampliado' },
];

export function TabList({ selectedTab, onSelect }: Props) {
  return (
    <View className="flex-row justify-between">
      {TAB_ITEMS.map((item) => (
        <TabItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          active={item.id === selectedTab}
          onPress={() => onSelect(item.id)}
        />
      ))}
    </View>
  );
}
