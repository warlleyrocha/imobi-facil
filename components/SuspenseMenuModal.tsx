import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

import NewFolderIcon from '@/assets/icons-svg/create_new_folder_black.svg';
import EditIcon from '@/assets/icons-svg/pencil-alt.svg';
import TrashIcon from '@/assets/icons-svg/trash.svg';

interface SuspenseMenuModalProps {
  visible: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onEdit: () => void;
  onAddToFolder: () => void;
  onDelete: () => void;
}

export function SuspenseMenuModal({
  visible,
  onClose,
  position,
  onEdit,
  onAddToFolder,
  onDelete,
}: SuspenseMenuModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/30" onPress={onClose}>
        <View
          style={{
            position: 'absolute',
            right: 28,
            top: position.y,
          }}
          className="w-[200px] rounded-[8px] bg-white shadow-2xl">
          {/* Editar Imóvel */}
          <TouchableOpacity
            onPress={() => {
              onEdit();
              onClose();
            }}
            className="flex-row gap-[10px] px-[16px] py-[14px]">
            <EditIcon />
            <Text className="font-mulish-medium text-[16px] leading-[18px] text-dark">
              Editar Imóvel
            </Text>
          </TouchableOpacity>

          {/* Adicionar à pasta */}
          <TouchableOpacity
            onPress={() => {
              onAddToFolder();
              onClose();
            }}
            className="flex-row gap-[10px] px-[16px] py-[14px]">
            <NewFolderIcon />
            <Text className="font-mulish-medium text-[16px] leading-[18px] text-dark">
              Adicionar a pasta
            </Text>
          </TouchableOpacity>

          {/* Deletar */}
          <TouchableOpacity
            onPress={() => {
              onDelete();
              onClose();
            }}
            className="flex-row gap-[10px] px-[16px] py-[14px]">
            <TrashIcon />
            <Text className="font-mulish-medium text-[16px] leading-[18px] text-red-dark">
              Excluir imóvel
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}
