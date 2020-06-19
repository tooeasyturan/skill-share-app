/** @format */

import React, { useContext, useEffect, useState } from "react";
import { queryMeeting } from "../services/firebase";
import { MeetingContext } from "./MeetingContext";
import MeetingsTable from "./MeetingsTable";
import useForm from "./useForm";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    meetings: any;
  }
}

const DEFAULT_MEETING = {
  title: "",
  presenter: "",
  summary: "",
  comments: [],
};

const Meetings = () => {
  const { values, handleChange, handleFormSubmit } = useForm(
    DEFAULT_MEETING,
    submit
  );

  const { state, dispatch } = useContext(MeetingContext);

  function submit() {
    console.log("need to update");
    // dispatch({ type: "add-meeting", payload: values });
  }

  useEffect(() => {
    firebaseMeeting();
  }, []);

  const firebaseMeeting = async () => {
    const meetings = await queryMeeting();
    dispatch({ type: "GET_MEETINGS", payload: meetings });
  };

  return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Presenter</th>
          <th>Summary</th>
        </tr>
        {state && state.length > 0 ? (
          <>
            {state.map((meetings) => (
              <MeetingsTable
                key={meetings[0]}
                id={meetings[0]}
                meeting={meetings[1]}
              />
            ))}
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </table>
      <Link to='/addmeeting'>Add Meeting</Link>
    </div>
  );
};

export default Meetings;

// {state.map((meetings) =>
//   meetings.map((meeting) => {
//     //what is going on here
//     if (meeting[1]) {
//       console.log("meeting!", meetings);
//       return (
//         <MeetingsTable
//           key={meetings[0]}
//           id={meetings[0]}
//           meeting={meetings[1]}
//         />
//       );
//     }
//   })
// )}
