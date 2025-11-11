export interface IMeetingData {
  id: string;
  typeActivity: string;
  client: string;
  date: string;
  hours: string;
  location: string;
  obs: string;
}

export interface ISelectedMeeting {
  data: IMeetingData | undefined;
  isOpenDetailModal: boolean;
}
