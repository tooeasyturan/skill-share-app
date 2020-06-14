/** @format */

import React from "react";
import { Link } from "react-router-dom";

const MeetingsTable = ({ meeting, id }) => {
  return (
    <tr>
      <td>{meeting.title}</td>
      <td>{meeting.presenter}</td>
      <td>{meeting.summary}</td>
      <Link to={`/${id}`}>Details</Link>
    </tr>
  );
};

export default MeetingsTable;
