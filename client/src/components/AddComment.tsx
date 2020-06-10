/** @format */

import React, { FormEvent, useContext } from "react";
import io from "socket.io-client";
import { MeetingInfo } from "../types.d";
import { getMeeting } from "./handleLocalStorage";
import { MeetingContext } from "./MeetingContext";
const socket = io("http://localhost:8000/");

export type Comments = {
  name: string;
  comment: string;
};

type CommentsProps = {
  values: MeetingInfo;
};

const AddComment = ({ values }: CommentsProps) => {
  const { state, dispatch } = useContext(MeetingContext);
  const { meetingInfo, comment } = state;

  socket.on("comment", (data) => {
    addComment(newComment(data.name, data.comment));
  });

  const newComment = (name: string, comment: string) => {
    return { name, comment };
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("new-user", values.presenter);
    socket.emit("send", comment);
    addComment(newComment(values.presenter, comment));
  };

  const addComment = (comment: Comments) => {
    let prevComments = state.meetingInfo.comments;
    const meetingFromLocalStorage = getMeeting("meeting");

    const updateLocalStorage: {
      meetingFromLocalStorage: string;
      comments: Comments[];
    } = {
      ...meetingFromLocalStorage,
      comments: [...prevComments, comment],
    };

    localStorage.setItem("meeting", JSON.stringify(updateLocalStorage));
    // setMeeting("meeting", updateLocalStorage);
    dispatch({ type: "update-comments", payload: [...prevComments, comment] });
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
        onChange={(e) =>
          dispatch({ type: "add-comment", payload: e.target.value })
        }
      />
      <button onClick={handleCommentSubmit}>Add comment</button>
    </div>
  );
};

export default AddComment;
