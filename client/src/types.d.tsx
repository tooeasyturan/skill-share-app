/** @format */

export type Comments = {
  name: string;
  comment: string;
};

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

type GetComments = Array<
  [
    string,
    {
      comment: string;
      name: string;
    }
  ]
>;
