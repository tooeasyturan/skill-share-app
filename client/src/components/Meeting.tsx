/** @format */

import React, { useState, useEffect, useContext } from "react";
// import { MeetingInfo, MeetingState } from "../types.d";
import AddComment from "./AddComment";
import DeleteMeeting from "./DeleteMeeting";
import { queryMeeting, queryByRef } from "../services/firebase";
import useForm from "./useForm";
import { MeetingContext2 } from "./MeetingContext2";
import AddComment2 from "./AddComment2";

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
  const { state, dispatch } = useContext(MeetingContext2);
  const [meeting, setMeeting] = useState(DEFAULT_MEETING);
  const meetings = state.state;
  // const meeting = meetings.find(
  //   (meeting) => meeting[0] === props.match.params.id
  // );

  function submit() {
    dispatch({ type: "ADD_MEETING", payload: values });
  }

  // const query = queryByRef(props.match.params.id);
  // console.log("query", query);

  useEffect(() => {
    firebaseMeeting();
  }, [meetings]);

  const firebaseMeeting = async () => {
    const data = await queryByRef(props.match.params.id);
    setMeeting({ ...DEFAULT_MEETING, meeting: data });
  };

  // const findMeeting = async () => {
  //   const meeting = await meetings.find(
  //     (meeting) => meeting[0] === props.match.params.id
  //   );
  //   setMeeting(meeting);
  // };

  (window as any).meetings = meetings;
  // console.log("meeting", meeting);

  // console.log("meeting", meeting);
  return (
    // <h1>works</h1>
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
            <AddComment2
              values={values}
              meeting={meeting}
              id={props.match.params.id}
            />
          </div>
        ) : (
          <div></div>
        )}

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
        <button onClick={handleFormSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Meeting;
