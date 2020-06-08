/** @format */

import React, { useState, useContext } from "react";
import io from "socket.io-client";
import { MeetingContext } from "./MeetingContext";
const socket = io("http://localhost:8000/");

interface User {
  name: string;
  comment: string;
  meeting: string;
}

const SocketComments = ({ values, addComment }) => {
  const { state, dispatch } = useContext(MeetingContext);
  console.log("STATE!!!", state);
  const { meetingInfo, comment } = state;

  socket.on("comment", (data) => {
    console.log("data client", data);
    const newComment = {
      name: data.name,
      comment: data.comment,
    };
    addComment(newComment);
  });

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    const newComment = {
      name: values.presenter,
      comment: comment,
    };
    socket.emit("new-user", values.presenter);
    socket.emit("send", comment);
    addComment(newComment);
  };

  const handleCommentChange = (e: any) => {
    e.preventDefault();
    dispatch({ type: "add-comment", payload: e.target.value });
  };

  return (
    <div>
      {meetingInfo.comments.map((comment: any) => {
        return (
          <div key={Math.random()}>
            <strong>{comment.name}: </strong>
            {comment.comment}
          </div>
        );
      })}
      <label htmlFor='comment'></label>
      <input
        type='text'
        id='comment'
        name='comment'
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handleCommentSubmit}>Add comment</button>
    </div>
  );
};

export default SocketComments;
