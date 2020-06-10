/** @format */

import React from "react";
import { MeetingInfo, MeetingState } from "../types.d";
import AddComment from "./AddComment";
import DeleteMeeting from "./DeleteMeeting";

type MeetingViewProps = {
  values: MeetingInfo;
  state: MeetingState;
  handleChange: (e: any) => void;
  handleFormSubmit: (e: any) => void;
};

const FormView = ({
  values,
  handleChange,
  state,
  handleFormSubmit,
}: MeetingViewProps) => {
  const { title, presenter, summary } = state.meetingInfo;

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
        {title !== "" ? (
          <div>
            <div>
              <h1>Title: {title}</h1> <DeleteMeeting />
              <p>
                By: <strong>{presenter}</strong>
              </p>
              <p>Summary: {summary}</p>
            </div>
            <div>
              <AddComment values={values} />
            </div>
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

export default FormView;
