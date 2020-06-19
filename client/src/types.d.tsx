/** @format */

export type Comments = {
  name: string;
  comment: string;
};

// export type MeetingInfo = {
//   title: string;
//   presenter: string;
//   summary: string;
//   comments: Comments[];
// };

// export type MeetingState = {
//   meetingInfo: MeetingInfo;
//   comment: string;
// };

export type MeetingState = [
  string,
  {
    presenter: string;
    summary: string;
    title: string;
  }
];

export type Meeting = {
  presenter: string;
  title: string;
  summary: string;
};
