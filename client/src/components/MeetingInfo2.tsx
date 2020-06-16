/** @format */

import React, { useContext, useEffect, useState } from "react";
import useForm from "./useForm";
import MeetingView from "./MeetingView";
import { MeetingContext2 } from "./MeetingContext2";
import { getMeeting } from "./handleLocalStorage";
import { readMeeting, queryMeeting } from "../services/firebase";
import MeetingsTable from "./MeetingsTable";
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

const MeetingInfo2 = () => {
  const { values, handleChange, handleFormSubmit } = useForm(
    DEFAULT_MEETING,
    submit
  );

  const { state, dispatch } = useContext(MeetingContext2);
  const meetings = state.state;

  const [showAll, setShowAll] = useState(true);

  function submit() {
    dispatch({ type: "add-meeting", payload: values });
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
        {meetings && meetings.length > 1 ? (
          <>
            {meetings.map((meeting) => (
              <MeetingsTable
                key={meeting[0]}
                id={meeting[0]}
                meeting={meeting[1]}
              />
            ))}
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </table>
    </div>
  );
};

export default MeetingInfo2;
