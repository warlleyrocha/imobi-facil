import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface DeleteConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ visible, onCancel, onConfirm }: DeleteConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="mx-[24px] h-[222px] w-[343px] rounded-2xl bg-white p-[24px]">
          {/* Título */}
          <Text className="font-inter-medium text-[18px] leading-[22px] text-dark">
            Deseja excluir este imóvel?
          </Text>

          <Text className="mt-[24px] font-mulish text-[16px] leading-[18px] text-dark-5">
            Ao excluir, todos as informações sobre o imóvel serão removidos.
          </Text>
          {/* Botões */}
          <View className="mt-[24px] flex-row gap-[12px]">
            {/* Cancelar */}
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 items-center justify-center rounded-lg px-[24px] py-[12px]">
              <Text className="font-mulish-semibold text-[16px] leading-[18px] text-cor-primaria">
                Cancelar
              </Text>
            </TouchableOpacity>

            {/* Confirmar */}
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 items-center justify-center rounded-lg bg-[#F23030] px-[28px] py-[13px]">
              <Text className="font-mulish-semibold text-[16px] text-white">Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
