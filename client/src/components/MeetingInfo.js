/** @format */

import React, { useState, useEffect, useReducer } from "react";
import FormView from "./FormView";
import useForm from "../useForm";
import produce from "immer";
import { MeetingProps } from "../types.d";

const DEFAULT_MEETING = {
  title: "",
  presenter: "",
  summary: "",
  comments: [],
};

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

const MeetingInfo = () => {
  const { values, handleChange, handleFormSubmit } = useForm(
    DEFAULT_MEETING,
    submit
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  function submit() {
    dispatch({ type: "add-meeting", payload: values });
  }

  useEffect(() => {
    const meeting = getMeeting();
    if (meeting) {
      dispatch({ type: "get-meetings", payload: meeting });
    }
  }, []);

  const getMeeting = () => {
    return JSON.parse(localStorage.getItem("meeting"));
  };

  const addComment = (comment) => {
    let prevComments = state.meetingInfo.comments;
    const meetingFromLocalStorage = getMeeting();

    const updateLocalStorage = {
      ...meetingFromLocalStorage,
      comments: [...prevComments, comment],
    };

    localStorage.setItem("meeting", JSON.stringify(updateLocalStorage));
    dispatch({ type: "update-comments", payload: [...prevComments, comment] });
  };

  return (
    <FormView
      values={values}
      handleChange={handleChange}
      state={state}
      handleFormSubmit={handleFormSubmit}
      addComment={addComment}
      dispatch={dispatch}
    />
  );
};

export default MeetingInfo;
