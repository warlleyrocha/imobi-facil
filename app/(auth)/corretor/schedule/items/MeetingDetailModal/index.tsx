import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import EditIconSVG from '@/assets/icons-svg/meeting-edit.svg';
import TrashIconSVG from '@/assets/icons-svg/meeting-trash.svg';

import { INITIAL_SELECTED_MEETING } from '../../utils';
import { IMeetingDetailModal } from './types';
import { meetingItems } from './utils';

const MeetingDetailModal = ({
  selectedMeeting: { data, isOpenDetailModal },
  setSelectedMeeting,
  isFutureMeeting,
}: IMeetingDetailModal) => {
  if (!data) return;

  const { typeActivity } = data;

  const onCloseModal = () => {
    setSelectedMeeting(INITIAL_SELECTED_MEETING);
  };

  const meetingFieldsBackgroundColor = isFutureMeeting ? '#effffb' : '#f8faff';

  const getMeetingFields = () => {
    return meetingItems(isFutureMeeting).map(({ field, icon, customContent }) => (
      <View
        key={field}
        className="mb-4 flex-row items-start gap-4 rounded-lg border border-[#dfe4ea] p-4"
        style={{ backgroundColor: meetingFieldsBackgroundColor }}>
        {icon}

        {customContent?.(data) || (
          <Text className="mr-2 text-xl text-[#111928]">{data[field]}</Text>
        )}
      </View>
    ));
  };

  return (
    <Modal
      visible={isOpenDetailModal}
      animationType="slide"
      transparent
      onRequestClose={onCloseModal}>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View className="flex-1 justify-end bg-black/40">
          <TouchableWithoutFeedback>
            <View className="rounded-t-3xl bg-[#f6f6f6] p-5 pt-3">
              <TouchableOpacity className="items-center py-2" onPress={onCloseModal}>
                <View className="h-1.5 w-16 rounded-full bg-[#1f2a37]" />
              </TouchableOpacity>

              <Text className="mb-6 mt-4 text-2xl font-semibold text-[#111928]">
                {typeActivity}
              </Text>

              {getMeetingFields()}

              {isFutureMeeting && (
                <View>
                  <TouchableOpacity className="mb-4 flex-row items-center justify-center gap-2 rounded-lg bg-white p-3 shadow-sm">
                    <EditIconSVG color="#3758F9" />
                    <Text className="text-xl text-[#3758F9]">Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="mb-4 flex-row  items-center justify-center gap-2 rounded-lg bg-white p-3 shadow-sm">
                    <TrashIconSVG color="#E10E0E" />
                    <Text className="text-xl text-[#E10E0E]">Excluir</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MeetingDetailModal;
