/** @format */

import produce from "immer";
import React, { FormEvent, useEffect, useReducer } from "react";
import io from "socket.io-client";
import { writeComment } from "../services/firebase";
const socket = io("http://localhost:8000/");

export type Comments = {
  name: string;
  comment: string;
};

type AddComment = {
  name: string;
  comment: string;
};

type GetComments = [
  string,
  {
    comment: string;
    name: string;
  }
];

type CommentState = {
  title: string;
  presenter: string;
  summary: string;
  comments: any[];
  comment: string;
};

type AddCommentProps = {
  values: any;
  meeting: CommentState;
  id: string;
};

export type CommentAction =
  | { type: "GET_COMMENTS"; payload: GetComments[] }
  | { type: "ADD_COMMENT"; payload: string }
  | { type: "UPDATE_COMMENTS"; payload: any };

function reducer(state: CommentState, action: CommentAction) {
  switch (action.type) {
    case "GET_COMMENTS":
      console.log("GET COMMENTS STATE", state);
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

const AddComment = ({ values, meeting, id }: AddCommentProps) => {
  const [state, dispatch] = useReducer(reducer, meeting);

  const { comments } = meeting;

  useEffect(() => {
    getComments();
  }, [comments]);

  let getComments = () => {
    if (comments) {
      let array: GetComments[] = Object.entries(comments);
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

    writeComment(id, newComment);
    dispatch({
      type: "UPDATE_COMMENTS",
      payload: [...prevComments, ["", newComment]],
    });
  };

  return (
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

export default AddComment;
