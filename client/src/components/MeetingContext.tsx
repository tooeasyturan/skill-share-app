/** @format */

import React, { createContext, useReducer } from "react";
import { MeetingState } from "../types.d";

export const MeetingContext = createContext<MeetingContextType | undefined>(
  undefined
);

type MeetingContextType = {
  state: MeetingState[];
  dispatch: React.Dispatch<MeetingAction>;
};

export type MeetingAction =
  | { type: "GET_MEETINGS"; payload: MeetingState[] }
  | { type: "ADD_MEETING"; payload: MeetingState };

// const initialState = [
//   [
//     "",
//     {
//       presenter: "",
//       summary: "",
//       title: "",
//     },
//   ],
// ];

function reducer(state: MeetingState[], action: MeetingAction): MeetingState[] {
  switch (action.type) {
    case "GET_MEETINGS":
      return action.payload;
    case "ADD_MEETING":
      if (state) {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

export const MeetingProvider: React.FC<MeetingState[] | MeetingState> = (
  props
): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <MeetingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MeetingContext.Provider>
  );
};
