/** @format */

import React from "react";

const DeleteMeeting = () => {
  const handleDeleteMeeting = () => {
    localStorage.removeItem("meeting");
  };

  return <button onClick={handleDeleteMeeting}>Delete Meeting</button>;
};

export default DeleteMeeting;
