import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import LocationOnIcon from '@/assets/icons-svg/location_on.svg';
import OptionIconBlack from '@/assets/icons-svg/option.svg';
import { FormDataWithId } from '@/types/formProperty';
import { SuspenseMenuModal } from '~/components/modals/SuspenseMenuModal';
import { PurposeBadge } from '~/components/ui/PurposeBadge';

interface Props {
  item: FormDataWithId;
  menuVisible: string | null;
  menuPosition: { x: number; y: number };
  setMenuVisible: (id: string | null) => void;
  setMenuPosition: (pos: { x: number; y: number }) => void;
  onEdit: (id: string) => void;
  onAddToFolder: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MediumItem = ({
  item,
  menuVisible,
  menuPosition,
  setMenuVisible,
  setMenuPosition,
  onEdit,
  onAddToFolder,
  onDelete,
}: Props) => (
  <>
    <TouchableOpacity className="mb-4 h-[140px] flex-row overflow-hidden rounded-xl border border-gray-200 bg-white">
      <Image
        source={{ uri: item.midias?.[0] ?? 'https://via.placeholder.com/300' }}
        className="h-full w-[140px]"
        resizeMode="cover"
      />
      <View className="absolute left-3 top-2 h-[26px] min-w-[50px] justify-center rounded-[8px] bg-black/10 px-[4px]">
        <Text className="text-center font-mulish-black text-[14px] text-white">
          ID: {item.id ?? '123456'}
        </Text>
      </View>

      <View className="flex-1 justify-between p-[12px]">
        <View className="flex-row justify-between">
          <Text className="w-[160px] font-inter-semibold text-[12px] text-dark" numberOfLines={2}>
            {item.titulo ?? 'Sem título'}
          </Text>

          <TouchableOpacity
            onPress={(event) => {
              const target = event.currentTarget as any;
              target.measure(
                (
                  x: number,
                  y: number,
                  width: number,
                  height: number,
                  pageX: number,
                  pageY: number
                ) => {
                  setMenuPosition({ x: pageX, y: pageY + height });
                  setMenuVisible(item.id);
                }
              );
            }}>
            <OptionIconBlack />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center gap-1">
            <LocationOnIcon />
            <Text className="font-inter text-[12px] text-dark" numberOfLines={1}>
              {item.cidade}, {item.estado}
            </Text>
          </View>
          <PurposeBadge finalidade={item.finalidade} />
        </View>

        <Text className="font-mulish-bold text-[16px] text-cor-primaria">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(item.preco))}
        </Text>
      </View>
    </TouchableOpacity>

    <SuspenseMenuModal
      visible={menuVisible === item.id}
      onClose={() => setMenuVisible(null)}
      position={menuPosition}
      onEdit={() => onEdit(item.id)}
      onAddToFolder={() => onAddToFolder(item.id)}
      onDelete={() => onDelete(item.id)}
    />
  </>
);
