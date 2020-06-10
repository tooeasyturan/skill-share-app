/** @format */

import React, { useContext, useEffect } from "react";
import useForm from "./useForm";
import MeetingView from "./MeetingView";
import { MeetingContext } from "./MeetingContext";
import { getMeeting } from "./handleLocalStorage";

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
    const meeting = getMeeting("meeting");
    if (meeting) {
      dispatch({ type: "get-meetings", payload: meeting });
    }
  }, []);

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
