import { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';

import { IMeetingData, ISelectedMeeting } from '../../types';

export interface IMeetingDetailModal {
  selectedMeeting: ISelectedMeeting;
  setSelectedMeeting: Dispatch<SetStateAction<ISelectedMeeting>>;
  isFutureMeeting: boolean;
}

export interface IMeetingItem {
  field: keyof IMeetingData;
  icon: ReactNode;
  customContent?: (meetingData: IMeetingData) => ReactElement;
}
