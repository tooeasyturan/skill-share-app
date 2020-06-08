/** @format */

import React, { useReducer, createContext } from "react";
import produce from "immer";

export const MeetingContext = createContext(null);

const initialState = {
  meetingInfo: {
    title: "",
    presenter: "",
    summary: "",
    comments: [],
  },
  comment: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "get-meetings":
      return { ...state, meetingInfo: action.payload };
    case "add-meeting":
      return { ...state, meetingInfo: action.payload };
    case "update-comments":
      return produce(state, (draft) => {
        console.log("draft comment", draft.comment);
        draft.meetingInfo.comments = action.payload;
        draft.comment = "";
        console.log("draft comment after", draft.comment);
      });
    case "add-comment":
      console.log("added comment", action.payload);
      console.log("updated state", state);
      return { ...state, comment: action.payload };
    case "clear-comment":
      return { ...state, comment: "" };
    default:
      return state;
  }
}

export const MeetingProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MeetingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MeetingContext.Provider>
  );
};
