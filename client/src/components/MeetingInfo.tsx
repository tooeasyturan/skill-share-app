/** @format */

import React, { useContext, useEffect } from "react";
import { Comments } from "../types.d";
import useForm from "../useForm";
import FormView from "./FormView";
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

  const addComment = (comment: Comments) => {
    let prevComments = state.meetingInfo.comments;
    const meetingFromLocalStorage = getMeeting();

    const updateLocalStorage: {
      meetingFromLocalStorage: string;
      comments: Comments[];
    } = {
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
      handleFormSubmit={handleFormSubmit}
      addComment={addComment}
      state={state}
    />
  );
};

export default MeetingInfo;
