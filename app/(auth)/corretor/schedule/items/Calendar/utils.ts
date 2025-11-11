import { CalendarProps } from 'react-native-calendars';

import {
  DAY_NAMES,
  DAY_NAMES_SHORT,
  MONTH_NAMES,
  MONTH_NAMES_SHORT,
} from '~/constants/calendarConstants';

import { IDayState } from './types';

export const INITIAL_MEETING = [
  {
    id: '1',
    typeActivity: 'Reunião com o Cliente',
    client: 'Larissa Andrade',
    date: '2025-11-14',
    hours: '23:40',
    location: 'Praça da Sé',
    obs: 'Levar contrato e chaves extras para visita',
  },
  {
    id: '2',
    typeActivity: 'Visita no local',
    client: 'Larissa Andrade',
    date: '2025-11-07',
    hours: '15:00',
    location: 'Praça da Sé',
    obs: 'Cliente interessado em apartamento 2 quartos',
  },
];

export const DAY_ACCENT_COLOR: Record<IDayState, string> = {
  today: '#0d8366',
  past: '#74767c',
  future: '#0d8366',
};

export const CALENDAR_THEME: CalendarProps['theme'] = {
  backgroundColor: '#F6F6F6',
  todayTextColor: '#000',
  dayTextColor: '#374151',
  monthTextColor: '#000',
  textMonthFontSize: 12,
  textMonthFontWeight: '600',
  textDayFontSize: 17,
  textDayFontWeight: '400',
  textDayHeaderFontSize: 16,
  textDayHeaderFontWeight: '500',
};

export const LOCALES = {
  monthNames: MONTH_NAMES,
  monthNamesShort: MONTH_NAMES_SHORT,
  dayNames: DAY_NAMES,
  dayNamesShort: DAY_NAMES_SHORT,
  today: 'Hoje',
};
