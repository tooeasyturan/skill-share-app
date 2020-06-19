/** @format */

import React, { useState, useEffect, useContext } from "react";
// import { MeetingInfo, MeetingState } from "../types.d";
import DeleteMeeting from "./DeleteMeeting";
import { queryMeeting, queryByRef } from "../services/firebase";
import useForm from "./useForm";
import { MeetingContext } from "./MeetingContext";
import AddComment from "./AddComment";

const DEFAULT_MEETING = {
  meeting: {
    title: "",
    presenter: "",
    summary: "",
  },
  comments: [],
  comment: "",
};

const Meeting = (props) => {
  const { values, handleChange, handleFormSubmit } = useForm(
    DEFAULT_MEETING,
    submit
  );
  const { state, dispatch } = useContext(MeetingContext);
  const [meeting, setMeeting] = useState(DEFAULT_MEETING);

  function submit() {
    console.log("need to update");
    // dispatch({ type: "ADD_MEETING", payload: values });
  }

  useEffect(() => {
    firebaseMeeting();
  }, []);

  const firebaseMeeting = async () => {
    const data = await queryByRef(props.match.params.id);
    setMeeting({ ...DEFAULT_MEETING, meeting: data });
  };

  return (
    <div className='App'>
      <form action=''>
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
        {meeting ? (
          <div>
            <div>
              <h1>Title: {meeting.meeting.title}</h1> <DeleteMeeting />
              <p>
                By: <strong>{meeting.meeting.presenter}</strong>
              </p>
              <p>Summary: {meeting.meeting.summary}</p>
            </div>
            <AddComment
              values={values}
              meeting={meeting}
              id={props.match.params.id}
            />
          </div>
        ) : (
          <div></div>
        )}

        {/* <h2>Submit a talk</h2>
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
        <button onClick={handleFormSubmit}>Submit</button> */}
      </form>
    </div>
  );
};

export default Meeting;
