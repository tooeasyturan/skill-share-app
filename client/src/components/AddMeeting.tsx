/** @format */

import React, { useContext } from "react";
import { MeetingContext } from "./MeetingContext";
import useForm from "./useForm";
import { writeMeeting } from "../services/firebase";
import AddMeetingView from "./AddMeetingView";

const DEFAULT_MEETING = {
  title: "",
  presenter: "",
  summary: "",
};

const AddMeeting = () => {
  const { state, dispatch } = useContext(MeetingContext);
  const { values, handleChange, handleFormSubmit } = useForm(
    DEFAULT_MEETING,
    submit
  );

  function submit() {
    let key = writeMeeting(values);
    dispatch({ type: "ADD_MEETING", payload: [key, values] });
  }

  return (
    <AddMeetingView
      handleFormSubmit={handleFormSubmit}
      values={values}
      handleChange={handleChange}
    />
  );
};

export default AddMeeting;
