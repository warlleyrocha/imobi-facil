import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import HoursIcon from '@/assets/icons-svg/check-box-alt.svg';
import ArrowLeftIcon from '@/assets/icons-svg/chevron-left.svg';
import ArrowRightIcon from '@/assets/icons-svg/chevron-right.svg';
import LocationIcon from '@/assets/icons-svg/map-marker.svg';
import PlusIcon from '@/assets/icons-svg/plus.svg';
import PointsIcon from '@/assets/icons-svg/thumbnail.svg';
import UserIcon from '@/assets/icons-svg/user-alt.svg';
import {
  DAY_NAMES,
  DAY_NAMES_SHORT,
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
} from '@/constants/calendarConstants';

import HeaderNew from './HeaderNew';

// Configuração de locale em português
LocaleConfig.locales['pt-br'] = {
  monthNames: MONTH_NAMES,
  monthNamesShort: MONTH_NAMES_SHORT,
  dayNames: DAY_NAMES,
  dayNamesShort: DAY_NAMES_SHORT,
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

interface MeetingProps {
  id: string;
  typeActivity: string;
  client: string;
  date: string;
  hours: string;
  location: string;
  obs: string;
}

export default function CustomCalendar() {
  const today = new Date().toISOString().split('T')[0];
  const [selected, setSelected] = useState<string>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(today);

  // No componente, adicione o estado para as reuniões
  const [meeting, setMeeting] = useState<MeetingProps[]>([
    {
      id: '1',
      typeActivity: 'Reunião com o Cliente',
      client: 'Larissa Andrade',
      date: '2025-11-04',
      hours: '14:00',
      location: 'Praça da Sé',
      obs: 'Cliente interessado em apartamento 2 quartos',
    },
  ]);

  // Função para filtrar reuniões do dia selecionado
  const getMeetingToday = (dateString: string): MeetingProps[] => {
    return meeting.filter((meeting) => meeting.date === dateString);
  };

  const getMarkedDates = () => {
    const marks: { [key: string]: any } = {};

    const currentDate = new Date(currentMonth);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const todayDate = new Date(today);

    // Marcar todos os dias passados
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];

      // Se a data é anterior a hoje
      if (date < todayDate) {
        marks[dateString] = {
          disabled: true,
          disableTouchEvent: true,
        };
      }
    }

    // Sobrescrever com o dia selecionado
    marks[selected] = {
      selected: true,
      selectedColor: '#10B981',
    };

    return marks;
  };

  const markedDates = getMarkedDates();

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
        <View className="flex flex-row gap-[16px]">
          <TouchableOpacity className="" onPress={handlePreviousMonth}>
            <ArrowLeftIcon />
          </TouchableOpacity>

          <Text className="text-[18px] font-semibold leading-[22px] text-dark">
            {monthNames[date.getMonth()]}
          </Text>

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

  const formatarData = (dateString: string): string => {
    const date = new Date(dateString);
    const diaSemana = DAY_NAMES[date.getDay()];
    const dia = date.getDate();
    const mes = MONTH_NAMES[date.getMonth()];

    return `${diaSemana}, ${dia} de ${mes}`;
  };
  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 6 }}>
      <HeaderNew title="ImobiFácil" />

      <Calendar
        key={currentMonth}
        current={currentMonth}
        markedDates={markedDates}
        onDayPress={(day: { dateString: string }) => {
          setSelected(day.dateString);
        }}
        renderHeader={renderHeader}
        hideArrows={true}
        hideExtraDays={true}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#000',
          selectedDayBackgroundColor: '#10B981',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#10B981',
          dayTextColor: '#374151',
          textDisabledColor: '#637381',
          monthTextColor: '#000',
          textMonthFontSize: 12,
          textMonthFontWeight: '600',
          textDayFontSize: 17,
          textDayFontWeight: '400',
          textDayHeaderFontSize: 16,
          textDayHeaderFontWeight: '500',
          dotColor: '#10B981',
          selectedDotColor: '#ffffff',
        }}
      />

      <View className="items-start px-[16px] pt-[42px]">
        <Text className="pb-[4px] font-mulish-bold text-[20px] text-dark">
          {formatarData(selected)}
        </Text>

        {getMeetingToday(selected).length === 0 ? (
          // Layout quando não há reuniões
          <View className="w-full items-center pt-[24px]">
            <Text className="mb-2 font-inter text-[18px] text-texto-c-secundario">
              Nenhum compromisso agendado
            </Text>
            <Text className="text-center font-mulish text-[16px] text-texto-c-secundario">
              Toque no botão de + para adicionar um novo compromisso
            </Text>
          </View>
        ) : (
          // Layout quando há reuniões
          <View className="mt-6 w-full">
            {getMeetingToday(selected).map((meeting) => (
              <TouchableOpacity
                key={meeting.id}
                className="mb-3 rounded-xl bg-[#74767C] px-[16px] py-[20px]">
                {/* Primeira linha: Título e Horário */}
                <View className="flex-row items-center justify-between pb-[12px]">
                  <Text className="flex-1 font-mulish-bold text-[18px] text-white">
                    {meeting.typeActivity}
                  </Text>
                  <View className="flex-row items-center gap-[6px]">
                    <Text className="text-[16px] text-white">{meeting.hours}</Text>
                    <HoursIcon />
                  </View>
                </View>

                {/* Segunda linha: Cliente e Localização */}
                <View className="mt-3 flex-row items-center justify-between">
                  <View className="flex-1 flex-row items-center gap-[8px]">
                    <UserIcon />
                    <Text className="flex-1 text-[16px] text-white" numberOfLines={1}>
                      {meeting.client}
                    </Text>
                  </View>
                  {meeting.location && (
                    <View className="flex-row items-center gap-[8px]">
                      <Text className="text-[16px] text-white" numberOfLines={1}>
                        {meeting.location}
                      </Text>
                      <LocationIcon />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View className="mt-16 w-full items-end px-[16px]">
        <TouchableOpacity className="h-[56px] w-[56px] items-center justify-center rounded-full bg-cor-primaria shadow-lg">
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
