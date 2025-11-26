import { useRef, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ClockIcon from '@/assets/icons-svg/clock.svg';

interface TimePickerInputProps {
  label: string;
  required?: boolean;
  value: string;
  onChangeTime: (time: string) => void;
  placeholder?: string;
}

export function TimePickerInput({
  label,
  required = false,
  value,
  onChangeTime,
  placeholder = '00:00',
}: TimePickerInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hourInput, setHourInput] = useState<string>('');
  const [minuteInput, setMinuteInput] = useState<string>('');
  const [focusedInput, setFocusedInput] = useState<'hour' | 'minute' | null>(null);

  const hourRef = useRef<TextInput>(null);
  const minuteRef = useRef<TextInput>(null);

  const openModal = () => {
    // Preencher inputs com valor atual ao abrir
    if (value) {
      const [h, m] = value.split(':');
      setHourInput(h);
      setMinuteInput(m);
    } else {
      setHourInput('15');
      setMinuteInput('00');
    }
    setIsOpen(true);
  };

  const handleConfirm = () => {
    // Validar e formatar
    const hour = Math.min(23, Math.max(0, parseInt(hourInput) || 0));
    const minute = Math.min(59, Math.max(0, parseInt(minuteInput) || 0));

    const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    onChangeTime(formattedTime);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleHourChange = (text: string) => {
    // Permitir apenas números e max 2 dígitos
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 2);
    setHourInput(cleaned);
  };

  const handleMinuteChange = (text: string) => {
    // Permitir apenas números e max 2 dígitos
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 2);
    setMinuteInput(cleaned);
  };

  return (
    <>
      {/* Input Display */}
      <View className="gap-[3px]">
        <View className="mb-2 flex-row">
          <Text className="font-mulish-medium text-[16px] text-dark-5">{label}</Text>
          {required && <Text className="ml-1 text-red-500">*</Text>}
        </View>

        <TouchableOpacity
          onPress={openModal}
          className="h-[48px] rounded-[8px] border border-stroke
            bg-white py-[12px] pl-[20px] pr-[16px] 
            font-mulish text-[16px]">
          <Text
            className={`ml-2 flex-1 font-mulish text-[16px] ${
              value ? 'text-dark' : 'text-gray-400'
            }`}>
            {value || placeholder}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Time Picker Modal */}
      <Modal visible={isOpen} animationType="fade" transparent onRequestClose={handleCancel}>
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="w-[282px] rounded-[28px] bg-white px-6 py-6">
            {/* Header */}
            <Text className="mb-6 text-start font-mulish-medium text-[12px] leading-[16px] text-texto-c-primario">
              Selecionar hora
            </Text>

            {/* Time Inputs */}
            <View className="mb-7 flex-row items-center justify-center gap-3">
              {/* Hour Input */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setFocusedInput('hour');
                  hourRef.current?.focus();
                }}
                className="items-start">
                <TextInput
                  ref={hourRef}
                  value={hourInput}
                  onChangeText={handleHourChange}
                  onFocus={() => setFocusedInput('hour')}
                  keyboardType="number-pad"
                  maxLength={2}
                  selectTextOnFocus
                  style={{
                    textAlignVertical: 'center',
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  className={`h-[72px] w-[100px] rounded-xl border-2 bg-blue-light-5 text-center font-inter text-[48px] ${
                    focusedInput === 'hour'
                      ? 'border-[#ADBCF2] text-[#3758F9]'
                      : 'border-transparent text-black'
                  }`}
                />
                <Text className="ml-1 mt-2 font-mulish text-[12px] text-texto-c-primario">
                  Hora
                </Text>
              </TouchableOpacity>

              {/* Separator */}
              <Text className="mb-8 font-inter-medium text-[48px] text-dark">:</Text>

              {/* Minute Input */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setFocusedInput('minute');
                  minuteRef.current?.focus();
                }}
                className="items-start">
                <TextInput
                  ref={minuteRef}
                  value={minuteInput}
                  onChangeText={handleMinuteChange}
                  onFocus={() => setFocusedInput('minute')}
                  keyboardType="number-pad"
                  maxLength={2}
                  selectTextOnFocus
                  style={{
                    textAlignVertical: 'center',
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  className={`h-[72px] w-[100px] rounded-xl border-2 bg-blue-light-5 text-center font-inter text-[48px] ${
                    focusedInput === 'minute'
                      ? 'border-[#ADBCF2] text-[#3758F9]'
                      : 'border-transparent text-black'
                  }`}
                />
                <Text className="ml-1 mt-2 font-inter text-[12px] text-texto-c-primario">
                  Minuto
                </Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View className="flex-row items-center justify-between px-[10px]">
              <ClockIcon />

              <View className="flex-row gap-10">
                <TouchableOpacity
                  onPress={handleCancel}
                  className="items-center justify-center py-3">
                  <Text className="font-mulish-bold text-[14px] text-texto-c-primario">
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleConfirm}
                  className="items-center justify-center py-3">
                  <Text className="font-mulish-bold text-[14px] text-[#5475E5]">OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
