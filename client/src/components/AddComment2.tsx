/** @format */

import React, { FormEvent, useContext, useReducer, useEffect } from "react";
import produce from "immer";
import io from "socket.io-client";
import { MeetingInfo } from "../types.d";
import { getMeeting } from "./handleLocalStorage";
import { MeetingContext2 } from "./MeetingContext2";
import { writeComment } from "../services/firebase";
const socket = io("http://localhost:8000/");

export type Comments = {
  name: string;
  comment: string;
};

type CommentsProps = {
  values: MeetingInfo;
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_COMMENTS":
      console.log("setting comments");
      return { ...state, comments: action.payload };
    case "ADD_COMMENT":
      return { ...state, comment: action.payload };
    case "UPDATE_COMMENTS":
      return produce(state, (draft) => {
        console.log("DRAFTING");
        draft.comments = action.payload;
        draft.comment = "";
      });
    default:
      return state;
  }
}

const AddComment2 = ({ values, meeting, id }) => {
  const [state, dispatch] = useReducer(reducer, meeting);
  console.log("add comment state", state);

  let comments = meeting.meeting.comments;

  useEffect(() => {
    getComments();
  }, [comments]);

  let getComments = () => {
    if (comments) {
      console.log("COMMENTS", comments);
      let array = Object.entries(comments);
      dispatch({ type: "GET_COMMENTS", payload: array });
    }
  };

  socket.on("comment", (data) => {
    addComment(data.name, data.comment);
  });

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("new-user", values.presenter);
    socket.emit("send", state.comment);
    addComment(values.presenter, state.comment);
  };

  const addComment = (name: string, comment: string) => {
    const newComment = { name: name, comment: comment };
    let prevComments = state.comments;
    // const meetingFromLocalStorage = getMeeting("meeting");

    // const updateLocalStorage: {
    //   meetingFromLocalStorage: string;
    //   comments: Comments[];
    // } = {
    //   ...meetingFromLocalStorage,
    //   comments: [...prevComments, newComment],
    // };

    // localStorage.setItem("meeting", JSON.stringify(updateLocalStorage));
    writeComment(id, newComment);
    // setMeeting("meeting", updateLocalStorage);
    dispatch({
      type: "UPDATE_COMMENTS",
      payload: [...prevComments, ["", newComment]],
    });
  };

  (window as any).comments = comments;

  console.log("get comments", state.comments);

  return (
    // <p>comment</p>
    <div>
      {state.comments ? (
        <div>
          {state.comments.map((comment: Comments) => {
            return (
              <div key={Math.random()}>
                <strong>{comment[1].name}: </strong>
                {comment[1].comment}
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}

      <label htmlFor='comment'></label>
      <input
        type='text'
        id='comment'
        name='comment'
        value={state.comment}
        onChange={(e) =>
          dispatch({ type: "ADD_COMMENT", payload: e.target.value })
        }
      />
      <button onClick={handleCommentSubmit}>Add comment</button>
    </div>
  );
};

export default AddComment2;
