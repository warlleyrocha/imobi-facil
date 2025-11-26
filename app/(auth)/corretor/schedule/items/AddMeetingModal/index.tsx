import { useEffect, useState } from 'react';
import {
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import CloseIconSVG from '@/assets/icons-svg/close_small.svg';
import { FormInput } from '~/components/forms/FormInput';
import { TimePickerInput } from '~/components/modals/TimePickerInput';

import { IMeetingData } from '../../types';
import { INITIAL_MEETING } from './utils';

export interface IMeetingFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialMeeting?: IMeetingData | undefined | null;
  onSubmit: (meeting: IMeetingData) => void;
}

export default function MeetingFormModal({
  isOpen,
  setIsOpen,
  initialMeeting = undefined,
  onSubmit,
}: IMeetingFormModalProps) {
  const [form, setForm] = useState<IMeetingData>(INITIAL_MEETING);

  useEffect(() => {
    if (initialMeeting) setForm({ ...initialMeeting });
    else setForm(INITIAL_MEETING);
  }, [initialMeeting, isOpen]);

  const onChange = <K extends keyof IMeetingData>(key: K, value: IMeetingData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const close = () => setIsOpen(false);

  const confirm = () => {
    const id = form.id && form.id.length ? form.id : String(Date.now());

    const meetingToSubmit: IMeetingData = {
      ...form,
      id,
    };

    onSubmit(meetingToSubmit);
    close();
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent onRequestClose={close}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center bg-black/40 px-[16px]">
          <TouchableWithoutFeedback>
            <View className="rounded-[8px] bg-[#f6f6f6] px-[16px] py-[32px]">
              {/* Header */}
              <View className="flex-row items-center justify-between">
                <Text className="font-inter-medium text-[18px] leading-[22px] text-dark">
                  Novo compromisso
                </Text>

                <TouchableOpacity onPress={close}>
                  <CloseIconSVG />
                </TouchableOpacity>
              </View>

              <View className="mt-[16px]">
                {/* Tipo de atividade */}
                <FormInput
                  label="Tipo de atividade"
                  required
                  value={form.typeActivity}
                  onChangeText={(text) => onChange('typeActivity', text)}
                  placeholder="Descreva o tipo de atividade"
                />

                {/* Cliente */}
                <FormInput
                  label="Cliente"
                  required
                  value={form.client}
                  onChangeText={(text) => onChange('client', text)}
                  placeholder="Nome do Cliente"
                />

                {/* Data e Hora lado a lado */}
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <FormInput
                      label="Data"
                      required
                      value={form.date}
                      onChangeText={(text) => onChange('date', text)}
                      placeholder="dd/mm/aaaa"
                    />
                  </View>

                  <View className="flex-1">
                    <TimePickerInput
                      label="Hora"
                      required
                      value={form.hours}
                      onChangeTime={(time) => onChange('hours', time)}
                      placeholder="00:00"
                    />
                  </View>
                </View>

                {/* Local */}
                <FormInput
                  label="Local"
                  required
                  value={form.location}
                  onChangeText={(text) => onChange('location', text)}
                  placeholder="Endereço ou local do encontro"
                />

                {/* Observações */}
                <FormInput
                  style={{ height: 100, textAlignVertical: 'top' }}
                  label="Observações"
                  value={form.obs}
                  onChangeText={(text) => onChange('obs', text)}
                  placeholder="Detalhes adicionais"
                  multiline
                  numberOfLines={4}
                  textInputClassName="h-28 text-start"
                />

                <View className="-mt-2 w-full items-end">
                  <Text className="font-mulish text-[14px] text-texto-c-primario">
                    {/* Exemplo simples de contador */}
                    {form.obs?.length || 0}/50
                  </Text>
                </View>

                {/* Buttons: cancelar e confirmar */}
                <View className="flex-row gap-3 pt-[22px]">
                  <TouchableOpacity
                    onPress={close}
                    className="h-[44px] flex-1 items-center justify-center rounded-lg bg-white">
                    <Text className="font-mulish text-[16px] leading-[18px] text-cor-primaria">
                      Cancelar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={confirm}
                    className="h-[44px] flex-1 items-center justify-center rounded-lg bg-[#3758F9] p-3">
                    <Text className="font-mulish text-[16px] leading-[18px] text-white">
                      Confirmar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
