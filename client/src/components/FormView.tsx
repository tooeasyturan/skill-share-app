/** @format */

import React from "react";
import Comments from "./Comments";
import SocketComments from "./SocketComments";

const FormView = ({
  values,
  handleChange,
  state,
  handleFormSubmit,
  addComment,
  dispatch,
}: any) => {
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
        {state.meetingInfo.title !== "" ? (
          <div>
            <div>
              <h1>Title: {state.meetingInfo.title}</h1>
              <p>
                By: <strong>{state.meetingInfo.presenter}</strong>
              </p>
              <p>Summary: {state.meetingInfo.summary}</p>
            </div>
            <div>
              {/* <Comments
                values={values}
                meetingInfo={meetingInfo}
                addComment={addComment}
              /> */}
              <SocketComments
                values={values}
                // state={state}
                addComment={addComment}
                // dispatch={dispatch}
              />
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
