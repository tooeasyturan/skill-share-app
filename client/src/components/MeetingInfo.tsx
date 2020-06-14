/** @format */

import React, { useContext, useEffect, useState } from "react";
import useForm from "./useForm";
import MeetingView from "./MeetingView";
import { MeetingContext } from "./MeetingContext";
import { getMeeting } from "./handleLocalStorage";
import { readMeeting, queryMeeting } from "../services/firebase";

declare global {
  interface Window {
    meetings: any;
  }
}

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

  const [meetings, setMeetings] = useState([]);

  function submit() {
    dispatch({ type: "add-meeting", payload: values });
  }

  useEffect(() => {
    const meeting = getMeeting("meeting");

    firebaseMeeting();

    if (meeting) {
      dispatch({ type: "get-meeting", payload: meeting });
    }
  }, []);

  const firebaseMeeting = async () => {
    const data = await queryMeeting();
    setMeetings(data);
  };

  // window.meetings = window.meetings;
  (window as any).meetings = meetings;

  return (
    <MeetingView
      values={values}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
      state={state}
    />
  );
};

export default MeetingInfo;
