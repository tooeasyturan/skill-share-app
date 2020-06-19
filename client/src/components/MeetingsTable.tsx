/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Meeting } from "../types.d";

interface MeetingsTableProps {
  meeting: Meeting;
  id: string;
}

const MeetingsTable = ({ meeting, id }: MeetingsTableProps) => {
  return (
    <tr>
      <td>{meeting.title}</td>
      <td>{meeting.presenter}</td>
      <td>{meeting.summary}</td>
      <Link to={`/meetings/${id}`}>Details</Link>
    </tr>
  );
};

export default MeetingsTable;
