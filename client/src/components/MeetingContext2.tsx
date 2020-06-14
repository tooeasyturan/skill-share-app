/** @format */

import produce from "immer";
import React, { createContext, useReducer } from "react";
import { MeetingInfo, MeetingState } from "../types.d";

export const MeetingContext = createContext(undefined);

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

function reducer(state, action) {
  switch (action.type) {
    case "GET_MEETINGS":
      return { ...state, state: action.payload };
    default:
      return state;
  }
}

export const MeetingProvider: React.FC<MeetingState> = (props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <MeetingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MeetingContext.Provider>
  );
};
