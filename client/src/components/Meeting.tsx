/** @format */

import React, { useState, useEffect, useContext } from "react";
// import { MeetingInfo, MeetingState } from "../types.d";
import DeleteMeeting from "./DeleteMeeting";
import { queryMeeting, queryByRef } from "../services/firebase";
import useForm from "./useForm";
import { MeetingContext } from "./MeetingContext";
import AddComment from "./AddComment";

const DEFAULT_MEETING = {
  title: "",
  presenter: "",
  summary: "",

  comments: [],
  comment: "",
};

const Meeting = (props) => {
  const { values, handleChange } = useForm(DEFAULT_MEETING);
  const { state, dispatch } = useContext(MeetingContext);
  const [meeting, setMeeting] = useState(DEFAULT_MEETING);

  useEffect(() => {
    firebaseMeeting();
  }, []);

  const firebaseMeeting = async () => {
    const data = await queryByRef(props.match.params.id);
    setMeeting(data);
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
              <h1>Title: {meeting.title}</h1> <DeleteMeeting />
              <p>
                By: <strong>{meeting.presenter}</strong>
              </p>
              <p>Summary: {meeting.summary}</p>
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
      </form>
    </div>
  );
};

export default Meeting;
