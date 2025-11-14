import { Dispatch, SetStateAction } from 'react';

import { ISelectedMeeting } from '../../types';

export interface IDeleteMeetingModal {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedMeeting: ISelectedMeeting;
  setSelectedMeeting: Dispatch<SetStateAction<ISelectedMeeting>>;
}
