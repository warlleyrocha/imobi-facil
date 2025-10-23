import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import ArrowLeftIcon from '@/assets/icons-svg/chevron-left.svg';
import ArrowRightIcon from '@/assets/icons-svg/chevron-right.svg';
import PointsIcon from '@/assets/icons-svg/thumbnail.svg';

// Configuração de locale em português
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

export default function CustomCalendar() {
  const today = new Date().toISOString().split('T')[0];
  const [selected, setSelected] = useState<string>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(today);

  const markedDates: { [key: string]: any } = {
    [selected]: {
      selected: true,
      selectedColor: '#10B981',
    },
  };

  const handlePreviousMonth = (): void => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1);
    setCurrentMonth(date.toISOString().split('T')[0]);
  };

  const handleNextMonth = (): void => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);
    setCurrentMonth(date.toISOString().split('T')[0]);
  };

  const renderHeader = (date: Date): React.ReactElement => {
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    return (
      <View className="w-full flex-row items-center justify-between px-0 pb-4">
        <View className="flex flex-row">
          <TouchableOpacity className="" onPress={handlePreviousMonth}>
            <ArrowLeftIcon />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-900">{monthNames[date.getMonth()]}</Text>

          <TouchableOpacity onPress={handleNextMonth}>
            <ArrowRightIcon />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="p-2">
          <PointsIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="w-full rounded-2xl bg-white p-6 shadow-sm">
      <Calendar
        key={currentMonth}
        current={currentMonth}
        markedDates={markedDates}
        onDayPress={(day: { dateString: string }) => {
          setSelected(day.dateString);
        }}
        renderHeader={renderHeader}
        hideArrows={true}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#6B7280',
          selectedDayBackgroundColor: '#10B981',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#10B981',
          dayTextColor: '#374151',
          textDisabledColor: '#D1D5DB',
          monthTextColor: '#111827',
          textMonthFontSize: 18,
          textMonthFontWeight: '600',
          textDayFontSize: 15,
          textDayFontWeight: '400',
          textDayHeaderFontSize: 13,
          textDayHeaderFontWeight: '500',
          arrowColor: '#374151',
          dotColor: '#10B981',
          selectedDotColor: '#ffffff',
        }}
      />

      {/*DEVELOPMENT */}
      <View className="mt-6 items-center border-t border-gray-200 pt-6">
        <Text className="text-sm text-gray-600">
          Data selecionada: <Text className="font-semibold text-gray-900">{selected}</Text>
        </Text>
      </View>
    </View>
  );
}
