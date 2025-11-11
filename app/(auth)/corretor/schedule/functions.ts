import { DAY_NAMES, MONTH_NAMES } from '~/constants/calendarConstants';

export const formatDateWords = (dateString: string, format: 'withYear' | 'default' = 'default') => {
  const date = new Date(dateString);
  const dayName = DAY_NAMES[date.getDay() + 1];
  const dayNumber = date.getDate() + 1;
  const monthName = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${dayNumber} de ${monthName}${format === 'withYear' ? ` de ${year}` : ''}`;
};
