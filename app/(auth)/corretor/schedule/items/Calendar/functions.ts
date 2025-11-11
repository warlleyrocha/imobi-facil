import { IMeetingData } from '../../types';
import { IDayState } from './types';

export const getDayState = (dateString: string): IDayState => {
  const today = new Date().toISOString().split('T')[0];
  const todayDate = new Date(today);
  const date = new Date(dateString);

  if (dateString === today) return 'today';

  return date < todayDate ? 'past' : 'future';
};

export const checkIsFutureMeeting = (meetingData: IMeetingData): boolean => {
  const { date, hours } = meetingData;

  const meetingDateHour = new Date(`${date}T${hours}:00`);

  const dateNow = new Date();

  return meetingDateHour > dateNow;
};
