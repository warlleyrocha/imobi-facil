import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { FormDataWithId } from '@/types/formProperty';

import { ExpandedItem } from './ExpandedItem';
import { MediumItem } from './MediumItem';
import { ReducedItem } from './ReducedItem';

interface Props {
  data: FormDataWithId[];
  activeTab: string;
  menuVisible: string | null;
  menuPosition: { x: number; y: number };
  setMenuVisible: (id: string | null) => void;
  setMenuPosition: (pos: { x: number; y: number }) => void;
  onEdit: (id: string) => void;
  onAddToFolder: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PropertyList = ({
  data,
  activeTab,
  menuVisible,
  menuPosition,
  setMenuVisible,
  setMenuPosition,
  onEdit,
  onAddToFolder,
  onDelete,
}: Props) => {
  if (data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <Text className="font-mulish text-[16px] text-dark-2">Nenhum imóvel cadastrado</Text>
      </View>
    );
  }

  let renderItem;
  let numColumns = 1;
  let horizontal = false;

  switch (activeTab) {
    case '1':
      renderItem = ({ item }: any) => <ReducedItem item={item} />;
      numColumns = 3;
      break;
    case '2':
      renderItem = ({ item }: any) => (
        <MediumItem
          item={item}
          menuVisible={menuVisible}
          menuPosition={menuPosition}
          setMenuVisible={setMenuVisible}
          setMenuPosition={setMenuPosition}
          onEdit={onEdit}
          onAddToFolder={onAddToFolder}
          onDelete={onDelete}
        />
      );
      break;
    case '3':
      renderItem = ({ item }: any) => (
        <ExpandedItem
          item={item}
          menuVisible={menuVisible}
          menuPosition={menuPosition}
          setMenuVisible={setMenuVisible}
          setMenuPosition={setMenuPosition}
          onEdit={onEdit}
          onAddToFolder={onAddToFolder}
          onDelete={onDelete}
        />
      );
      horizontal = true;
      break;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      key={activeTab}
      horizontal={horizontal}
      numColumns={horizontal ? undefined : numColumns}
      columnWrapperStyle={numColumns > 1 ? { gap: 8 } : undefined}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        horizontal ? { paddingBottom: 20, gap: 12 } : { paddingBottom: 20, gap: 8 }
      }
    />
  );
};
