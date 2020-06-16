/** @format */

import React, { useContext, useEffect, useState } from "react";
import useForm from "./useForm";
import MeetingView from "./MeetingView";
import { MeetingContext } from "./MeetingContext";
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

const MeetingInfo = () => {
  const { values, handleChange, handleFormSubmit } = useForm(
    DEFAULT_MEETING,
    submit
  );

  const { state, dispatch } = useContext(MeetingContext);

  const [meetings, setMeetings] = useState([]);
  const [showAll, setShowAll] = useState(true);

  function submit() {
    dispatch({ type: "add-meeting", payload: values });
  }

  useEffect(() => {
    const meeting = getMeeting("meeting");

    firebaseMeeting();

    if (meeting) {
      dispatch({ type: "get-meeting", payload: meeting });
    }
  }, []);

  const firebaseMeeting = async () => {
    const data = await queryMeeting();
    setMeetings(data);
  };

  // window.meetings = window.meetings;
  (window as any).meetings = meetings;

  // const handleClick = (e) => {
  //   const meeting = meetings.find((meeting) => meeting[0] === e.target.id);
  //   console.log("clicked", meeting);
  // };

  const displayMeetings = meetings.map((meeting) => {
    return (
      <MeetingsTable
        key={meeting[0]}
        id={meeting[0]}
        meeting={meeting[1]}
        // handleClick={handleClick}
      />
    );
  });

  return (
    <div>
      {showAll ? (
        <table>
          <tr>
            <th>Title</th>
            <th>Presenter</th>
            <th>Summary</th>
          </tr>
          {displayMeetings}
        </table>
      ) : (
        <MeetingView
          values={values}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          state={state}
        />
      )}
    </div>
  );
};
