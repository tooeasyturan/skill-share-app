/** @format */

import React, { useState } from "react";

interface User {
  name: string;
  comment: string;
  meeting: string;
}

const Comments = ({ values, meetingInfo, addComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    const newComment = {
      name: values.presenter,
      comment: comment,
    };
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

export default Comments;
