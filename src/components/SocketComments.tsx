/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:8000/", {
//   transports: ["websockets", "polling"],
// });

const socket = io("http://localhost:8000/");

interface User {
  name: string;
  comment: string;
  meeting: string;
}

const SocketComments = ({ values, meetingInfo, addComment }) => {
  const [comment, setComment] = useState("");

  socket.on("comment", (data) => {
    const newComment = {
      name: data.name,
      comment: data.comment,
    };
    addComment(newComment);
  });

  // socket.on("user-connected", (name) => {
  //   console.log(`${name} connected`);
  // });

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    const newComment = {
      name: values.presenter,
      comment: comment,
    };
    // socket.emit("username", values.presenter)
    console.log("name to emit", values.presenter);
    socket.emit("new-user", values.presenter);
    socket.emit("send", comment);
    addComment(newComment);
    setComment("");
  };

  const handleCommentChange = (e: any) => {
    e.preventDefault();
    setComment(e.target.value);
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
