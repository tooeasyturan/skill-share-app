/** @format */

import React, { useState, useEffect } from "react";
import FormView from "./FormView";
import useForm from "../useForm";
import { MeetingProps } from "../types.d";

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
  const [meetingInfo, setMeetingInfo] = useState<MeetingProps>(values);

  function submit() {
    setMeetingInfo(values);
  }

  useEffect(() => {
    const meeting = getMeeting();
    if (meeting) {
      setMeetingInfo(meeting);
    }
  }, []);

  const getMeeting = () => {
    return JSON.parse(localStorage.getItem("meeting"));
  };

  const addComment = (comment) => {
    let prevComments = meetingInfo.comments;
    const meetingFromLocalStorage = getMeeting();

    const updateLocalStorage = {
      ...meetingFromLocalStorage,
      comments: [...prevComments, comment],
    };

    localStorage.setItem("meeting", JSON.stringify(updateLocalStorage));
    setMeetingInfo({ ...meetingInfo, comments: [...prevComments, comment] });
  };

  return (
    <FormView
      values={values}
      handleChange={handleChange}
      meetingInfo={meetingInfo}
      handleFormSubmit={handleFormSubmit}
      addComment={addComment}
    />
  );
};

export default MeetingInfo;
