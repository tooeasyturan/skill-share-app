/** @format */

import React, { useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:8000/");

interface User {
  name: string;
  comment: string;
  meeting: string;
}

const SocketComments = ({ values, state, addComment, dispatch }) => {
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
    console.log("NEW COMMENT", meetingInfo);
    addComment(newComment);
  };

  const handleCommentChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
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
