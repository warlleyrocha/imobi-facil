import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { INITIAL_SELECTED_MEETING } from '../../utils';
import { IDeleteMeetingModal } from './types';

const DeleteMeetingModal = ({
  isOpen,
  setIsOpen,
  selectedMeeting,
  setSelectedMeeting,
}: IDeleteMeetingModal) => {
  const { data } = selectedMeeting;

  if (!data) return;

  const { id, typeActivity } = data;

  const onConfirm = () => {
    console.log('delete: ', id);

    setSelectedMeeting(INITIAL_SELECTED_MEETING);
  };

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent
      onRequestClose={() => setIsOpen(false)}>
      <View className="flex-1 items-center justify-end bg-black/50">
        <View className="mx-[24px] mb-8 h-[222px] w-[343px] rounded-2xl bg-white p-[24px]">
          <Text className="font-inter-medium text-[18px] leading-[22px] text-dark">
            Excluir compromisso?
          </Text>

          <Text className="mt-[24px] font-mulish text-[16px] leading-[18px] text-dark-5">
            O compromisso &quot;{typeActivity}&quot; será removido permanentemente. Esta ação não
            pode ser desfeita.
          </Text>
          <View className="mt-[24px] flex-row gap-[12px]">
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              className="flex-1 items-center justify-center rounded-lg px-[24px] py-[12px]">
              <Text className="font-mulish-semibold text-[16px] leading-[18px] text-cor-primaria">
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 items-center justify-center rounded-lg bg-[#F23030] px-[28px] py-[13px]">
              <Text className="font-mulish-semibold text-[16px] text-white">Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteMeetingModal;
