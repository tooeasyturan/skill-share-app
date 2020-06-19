/** @format */

import React, { FormEvent, ChangeEvent } from "react";

interface MeetingViewProps {
  handleFormSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
  values: {
    presenter: string;
    title: string;
    summary: string;
  };
}

const AddMeetingView = ({
  handleFormSubmit,
  handleChange,
  values,
}: MeetingViewProps) => {
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

export default AddMeetingView;
