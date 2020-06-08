/** @format */

import React, { useContext, useEffect, useReducer } from "react";
import FormView from "./FormView";
import useForm from "../useForm";
import produce from "immer";
import { MeetingProps } from "../types.d";
import { MeetingContext } from "./MeetingContext";

const DEFAULT_MEETING = {
  title: "",
  presenter: "",
  summary: "",
  comments: [],
};

const MeetingInfo = () => {
  const { values, handleChange, handleFormSubmit } = useForm(
    DEFAULT_MEETING,
    submit
  );

  const { state, dispatch } = useContext(MeetingContext);

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
