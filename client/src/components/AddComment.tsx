/** @format */

import React, { FormEvent, useContext } from "react";
import io from "socket.io-client";
import { MeetingInfo } from "../types.d";
import { getMeeting } from "./handleLocalStorage";
import { MeetingContext } from "./MeetingContext";
import { writeComment } from "../services/firebase";
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
    addComment(data.name, data.comment);
  });

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("new-user", values.presenter);
    socket.emit("send", comment);
    addComment(values.presenter, comment);
  };

  const addComment = (name: string, comment: string) => {
    const newComment = { name: name, comment: comment };
    let prevComments = meetingInfo.comments;
    const meetingFromLocalStorage = getMeeting("meeting");

    const updateLocalStorage: {
      meetingFromLocalStorage: string;
      comments: Comments[];
    } = {
      ...meetingFromLocalStorage,
      comments: [...prevComments, newComment],
    };

    localStorage.setItem("meeting", JSON.stringify(updateLocalStorage));
    writeComment(newComment);
    // setMeeting("meeting", updateLocalStorage);
    dispatch({
      type: "update-comments",
      payload: [...prevComments, newComment],
    });
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
