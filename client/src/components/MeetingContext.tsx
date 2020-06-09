/** @format */

import produce from "immer";
import React, { createContext, useReducer } from "react";
import { MeetingAction, MeetingContextType, MeetingState } from "../types.d";

export const MeetingContext = createContext<MeetingContextType | undefined>(
  undefined
);

const initialState = {
  meetingInfo: {
    title: "",
    presenter: "",
    summary: "",
    comments: [],
  },
  comment: "",
};

function reducer(state: MeetingState, action: MeetingAction): MeetingState {
  switch (action.type) {
    case "get-meetings":
      return { ...state, meetingInfo: action.payload };
    case "add-meeting":
      return { ...state, meetingInfo: action.payload };
    case "update-comments":
      return produce(state, (draft) => {
        draft.meetingInfo.comments = action.payload;
        draft.comment = "";
      });
    case "add-comment":
      return { ...state, comment: action.payload };
    case "clear-comment":
      return { ...state, comment: "" };
    default:
      return state;
  }
}

export const MeetingProvider: React.FC<MeetingState> = (props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MeetingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MeetingContext.Provider>
  );
};
