/** @format */

import React, { useContext } from "react";
import { MeetingContext } from "./MeetingContext";
import useForm from "./useForm";
import { writeMeeting } from "../services/firebase";

const DEFAULT_MEETING = {
  title: "",
  presenter: "",
  summary: "",

  // comments: [],
  // comment: "",
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
    <div className='App'>
      <form onSubmit={handleFormSubmit}>
        <h1>Skill Sharing</h1>
        <div>
          <label htmlFor='user'>Your name:</label>
          <span>
            <input
              type='text'
              id='user'
              placeholder='Enter your name'
              value={values.presenter}
              name='presenter'
              onChange={handleChange}
            />
          </span>
        </div>

        <h2>Submit a talk</h2>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            name='title'
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='summary'>Summary:</label>
          <input
            type='text'
            id='summary'
            name='summary'
            value={values.summary}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AddMeeting;
