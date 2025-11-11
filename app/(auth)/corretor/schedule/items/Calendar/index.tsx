import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { MarkedDates } from 'react-native-calendars/src/types';

import CheckboxIconSVG from '@/assets/icons-svg/check-box-alt.svg';
import ArrowLeftIcon from '@/assets/icons-svg/chevron-left.svg';
import ArrowRightIcon from '@/assets/icons-svg/chevron-right.svg';
import LocationIcon from '@/assets/icons-svg/map-marker.svg';
import HoursIconSVG from '@/assets/icons-svg/meeting-hours.svg';
import PlusIcon from '@/assets/icons-svg/plus.svg';
import PointsIcon from '@/assets/icons-svg/thumbnail.svg';
import UserIcon from '@/assets/icons-svg/user-alt.svg';
import { MONTH_NAMES } from '@/constants/calendarConstants';
import HeaderNew from '~/components/layouts/HeaderNew';

import { formatDateWords } from '../../functions';
import { IMeetingData, ISelectedMeeting } from '../../types';
import { INITIAL_SELECTED_MEETING } from '../../utils';
import MeetingDetailModal from '../MeetingDetailModal';
import { checkIsFutureMeeting, getDayState } from './functions';
import { CALENDAR_THEME, DAY_ACCENT_COLOR, INITIAL_MEETING, LOCALES } from './utils';

// Configuração de locale em português
LocaleConfig.locales['pt-br'] = LOCALES;
LocaleConfig.defaultLocale = 'pt-br';

export default function CustomCalendar() {
  const today = new Date().toISOString().split('T')[0];

  const [selected, setSelected] = useState<string>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(today);
  const [meeting, setMeeting] = useState<IMeetingData[]>(INITIAL_MEETING);
  const [selectedMeeting, setSelectedMeeting] =
    useState<ISelectedMeeting>(INITIAL_SELECTED_MEETING);

  const selectedDayState = getDayState(selected);

  // Reuniões do dia selecionado
  const getMeetingToday = useMemo(() => {
    return meeting.filter((m) => m.date === selected);
  }, [meeting, selected]);

  const getInitialMarkedDates = useCallback(() => {
    const InitialMarkedDates: MarkedDates = {};

    if (meeting?.length === 0) return {};

    meeting.forEach(({ date }) => {
      InitialMarkedDates[date] = { marked: true, dotColor: DAY_ACCENT_COLOR[getDayState(date)] };
    });

    return InitialMarkedDates;
  }, [meeting]);

  const markedDates = useMemo(() => {
    const markedDates: MarkedDates = getInitialMarkedDates();

    const commonContainerStyles: MarkingProps['customContainerStyle'] = {
      borderRadius: 50,
      width: 42,
      height: 42,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ translateY: -5 }],
    };

    markedDates[today] = {
      ...markedDates[today],
      dotColor: '#fff',
      customStyles: {
        container: { ...commonContainerStyles, backgroundColor: '#13c296' },
        text: { color: '#fff' },
      },
    };

    if (today !== selected)
      markedDates[selected] = {
        ...markedDates[selected],
        customStyles: {
          container: {
            ...commonContainerStyles,
            borderWidth: 1,
            borderColor: DAY_ACCENT_COLOR[selectedDayState],
          },
        },
      };

    return markedDates;
  }, [getInitialMarkedDates, selected, selectedDayState, today]);

  const handlePreviousMonth = (): void => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1);
    const newMonth = date.toISOString().split('T')[0];
    setCurrentMonth(newMonth);

    setSelected('');
  };

  const handleNextMonth = (): void => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);
    const newMonth = date.toISOString().split('T')[0];
    setCurrentMonth(newMonth);

    setSelected('');
  };

  const handleMonthChange = (month: any): void => {
    console.log('Calendar month changed to:', month.dateString);
    setCurrentMonth(month.dateString);
  };

  const renderHeader = (date: Date): React.ReactElement => {
    return (
      <View className="w-full flex-row items-center justify-between px-0 pb-4">
        <View className="flex flex-row gap-[16px]">
          <TouchableOpacity onPress={handlePreviousMonth}>
            <ArrowLeftIcon />
          </TouchableOpacity>

          <Text className="text-[18px] font-semibold leading-[22px] text-dark">
            {MONTH_NAMES[date.getMonth()]}
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

  const handleAddMeeting = () => {
    console.log('Adicionar reunião para:', selected);
  };

  const onPressMeeting = (selectedMeeting: IMeetingData) => {
    setSelectedMeeting({ data: selectedMeeting, isOpenDetailModal: true });
  };

  const renderSelectedDayMeetings = () => {
    if (getMeetingToday.length === 0)
      return (
        <View className="w-full items-center pt-[24px]">
          <Text className="mb-2 font-inter text-[18px] text-texto-c-secundario">
            Nenhum compromisso agendado
          </Text>
          <Text className="text-center font-mulish text-[16px] text-texto-c-secundario">
            Toque no botão de + para adicionar um novo compromisso
          </Text>
        </View>
      );

    return (
      <View className="mt-6 w-full">
        {getMeetingToday.map((meeting) => {
          const { id, typeActivity, client, location, hours } = meeting;

          return (
            <TouchableOpacity
              key={id}
              className="mb-3 rounded-xl px-[16px] py-[20px]"
              style={{ backgroundColor: DAY_ACCENT_COLOR[selectedDayState] }}
              onPress={() => onPressMeeting(meeting)}>
              {/* Primeira linha: Título e Horário */}
              <View className="flex-row items-center justify-between pb-[12px]">
                <Text className="flex-1 font-mulish-bold text-[18px] text-white">
                  {typeActivity}
                </Text>

                <View className="flex-row items-center gap-[6px]">
                  <Text className="text-[16px] text-white">{hours}</Text>
                  {checkIsFutureMeeting(meeting) ? (
                    <HoursIconSVG color="white" />
                  ) : (
                    <CheckboxIconSVG />
                  )}
                </View>
              </View>

              {/* Segunda linha: Cliente e Localização */}
              <View className="mt-3 flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center gap-[8px]">
                  <UserIcon />
                  <Text className="flex-1 text-[16px] text-white" numberOfLines={1}>
                    {client}
                  </Text>
                </View>

                {location && (
                  <View className="flex-row items-center gap-[8px]">
                    <Text className="text-[16px] text-white" numberOfLines={1}>
                      {location}
                    </Text>
                    <LocationIcon />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView
      className="flex bg-[#F6F6F6]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 6 }}>
      <HeaderNew title="ImobiFácil" />

      <Calendar
        key={currentMonth}
        current={currentMonth}
        markingType="custom"
        markedDates={markedDates}
        onDayPress={(day) => setSelected(() => (day.dateString === selected ? '' : day.dateString))}
        renderHeader={renderHeader}
        hideArrows={true}
        hideExtraDays={true}
        onMonthChange={handleMonthChange}
        theme={CALENDAR_THEME}
      />

      {selected && (
        <View className="items-start px-[16px] pt-[42px]">
          <Text className="pb-[4px] font-mulish-bold text-[20px] text-dark ">
            {formatDateWords(selected)}
          </Text>

          {renderSelectedDayMeetings()}
        </View>
      )}

      <View className="mt-16 w-full items-end px-[16px]">
        <TouchableOpacity
          className="fixed bottom-6 right-6 h-[56px] w-[56px] items-center justify-center rounded-full bg-cor-primaria shadow-lg"
          onPress={handleAddMeeting}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      {selectedMeeting.isOpenDetailModal && selectedMeeting.data && (
        <MeetingDetailModal
          selectedMeeting={selectedMeeting}
          setSelectedMeeting={setSelectedMeeting}
          isFutureMeeting={checkIsFutureMeeting(selectedMeeting.data)}
        />
      )}
    </ScrollView>
  );
}
