import { Image, Text, TouchableOpacity, View } from 'react-native';

import LocationOnIcon from '@/assets/icons-svg/location_on.svg';
import OptionIconBlack from '@/assets/icons-svg/option.svg';
import { PurposeBadge } from '@/components/PurposeBadge';
import { SuspenseMenuModal } from '@/components/SuspenseMenuModal';
import { FormDataWithId } from '@/types/formProperty';

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
export const ExpandedItem = ({
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
    <TouchableOpacity className="mb-4 h-[354px] w-[232px] overflow-hidden rounded-[8px] border border-stroke bg-white shadow">
      <View>
        <Image
          source={{ uri: item.midias?.[0] ?? 'https://via.placeholder.com/400' }}
          className="h-[189.5px] w-full"
          resizeMode="cover"
        />
        {/* Overlay escuro com gradiente */}
        <View className="absolute left-4 top-4 h-[26px] min-w-[50px] justify-center rounded-[8px] bg-black/10 px-[4px]">
          <Text className="text-center font-mulish-black text-[14px] leading-[18.2px] text-white">
            ID: {item.id ?? '123456'}
          </Text>
        </View>
      </View>

      <View className="px-[12px] pt-[10px]">
        <View className="flex-row justify-between">
          <Text className="w-[180px] font-inter-semibold text-[12px] text-dark" numberOfLines={2}>
            {item.titulo ?? 'Sem título'}
          </Text>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
            }}
            onPressIn={(event) => {
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

        <View className="flex-row items-center gap-1 pb-[18px] pt-[5px]">
          <LocationOnIcon />
          <Text className="font-inter text-[12px] text-dark">
            {item.cidade}, {item.estado}
          </Text>
        </View>

        <PurposeBadge className="w-[56px]" finalidade={item.finalidade} />

        <View className="mt-[22px] flex-row items-center justify-between">
          <Text className="font-mulish-bold text-[18px] text-cor-primaria">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(item.preco))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    {/* Menu Options Modal */}
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
