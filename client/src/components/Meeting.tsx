/** @format */

import React, { useState, useEffect } from "react";
import { MeetingInfo, MeetingState } from "../types.d";
import AddComment from "./AddComment";
import DeleteMeeting from "./DeleteMeeting";
import { queryMeeting } from "../services/firebase";

const Meeting = (props) => {
  const [meeting, setMeeting] = useState([]);

  useEffect(() => {
    firebaseMeeting();
  }, []);

  const firebaseMeeting = async () => {
    const meetings = await queryMeeting();
    const meeting = meetings.find(
      (meeting) => meeting[0] === props.match.params.id
    );
    console.log(meeting);
  };

  console.log("props", props);
  return <h1>Works</h1>;
};

export default Meeting;
