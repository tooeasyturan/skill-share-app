/** @format */

import React, { FormEvent, useContext } from "react";
import io from "socket.io-client";
import { MeetingInfo } from "../types.d";
import { MeetingContext } from "./MeetingContext";
const socket = io("http://localhost:8000/");

export type Comments = {
  name: string;
  comment: string;
};

type CommentsProps = {
  values: MeetingInfo;
  addComment: (comment: Comments) => void;
};

const SocketComments = ({ values, addComment }: CommentsProps) => {
  const { state, dispatch } = useContext(MeetingContext);
  const { meetingInfo, comment } = state;

  socket.on("comment", (data) => {
    const newComment: Comments = {
      name: data.name,
      comment: data.comment,
    };
    addComment(newComment);
  });

  const handleCommentSubmit = (e: FormEvent) => {
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
      {meetingInfo.comments.map((comment: Comments) => {
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
