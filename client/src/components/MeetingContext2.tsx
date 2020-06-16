/** @format */

import produce from "immer";
import React, { createContext, useReducer, useEffect } from "react";
import { MeetingInfo, MeetingState } from "../types.d";
import { queryMeeting } from "../services/firebase";

export const MeetingContext2 = createContext(undefined);

// type MeetingContextType = {
//   state: MeetingState;
//   dispatch: React.Dispatch<MeetingAction>;
// };

// export type MeetingAction =
//   | { type: "get-meeting"; payload: MeetingInfo }
//   | { type: "add-meeting"; payload: MeetingInfo }
//   | { type: "update-comments"; payload: any }
//   | { type: "add-comment"; payload: string }
//   | { type: "clear-comment"; payload: string };

const initialState = [
  "",
  {
    presenter: "",
    summary: "",
    title: "",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "GET_MEETINGS":
      return { ...state, state: action.payload };
    case "ADD_MEETING":
      return { ...state, state: action.payload };
    case "ADD_COMMENT":
      return { ...state, comment: action.payload };
    default:
      return state;
  }
}

export const MeetingProvider2 = (props) => {
  const [state, dispatch] = useReducer(reducer, []);

  // useEffect(() => {
  //   firebaseMeeting();
  // }, []);

  // const firebaseMeeting = async () => {
  //   const meetings = await queryMeeting();
  //   dispatch({ type: "GET_MEETINGS", payload: meetings });
  // };

  return (
    <MeetingContext2.Provider value={{ state, dispatch }}>
      {props.children}
    </MeetingContext2.Provider>
  );
};
