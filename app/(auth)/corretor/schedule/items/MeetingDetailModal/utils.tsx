import { Text, View } from 'react-native';

import CalendarIconSVG from '@/assets/icons-svg/meeting-calendar.svg';
import HoursIconSVG from '@/assets/icons-svg/meeting-hours.svg';
import LocationIconSVG from '@/assets/icons-svg/meeting-location.svg';
import ObsIconSVG from '@/assets/icons-svg/meeting-obs.svg';
import UserIconSVG from '@/assets/icons-svg/meeting-user.svg';

import { formatDateWords } from '../../functions';
import { IMeetingItem } from './types';

export const meetingItems = (isFutureMeeting: boolean): IMeetingItem[] => {
  const svgColor = isFutureMeeting ? '#0D8366' : '#74767C';

  return [
    {
      field: 'date',
      icon: <CalendarIconSVG color={svgColor} />,
      customContent: ({ date, hours }) => (
        <View className="flex-column flex gap-2">
          <Text className="text-xl text-[#111928]">{formatDateWords(date, 'withYear')}</Text>
          <View className="flex flex-row items-center gap-2">
            <HoursIconSVG color={svgColor} />
            <Text className="text-xl text-[#111928]">{hours}</Text>
          </View>
        </View>
      ),
    },
    {
      field: 'client',
      icon: <UserIconSVG color={svgColor} />,
    },
    {
      field: 'location',
      icon: <LocationIconSVG color={svgColor} />,
    },
    {
      field: 'obs',
      icon: <ObsIconSVG color={svgColor} />,
    },
  ];
};
