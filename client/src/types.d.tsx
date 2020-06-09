/** @format */

export type Comments = {
  name: string;
  comment: string;
};

export type MeetingInfo = {
  title: string;
  presenter: string;
  summary: string;
  comments: Comments[];
};

export type MeetingState = {
  meetingInfo: MeetingInfo;
  comment: string;
};

export type MeetingContextType = {
  state: MeetingState;
  dispatch: React.Dispatch<MeetingAction>;
};

export type MeetingAction =
  | { type: "get-meetings"; payload: MeetingInfo }
  | { type: "add-meeting"; payload: MeetingInfo }
  | { type: "update-comments"; payload: any }
  | { type: "add-comment"; payload: string }
  | { type: "clear-comment"; payload: string };
