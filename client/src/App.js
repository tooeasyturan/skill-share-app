/** @format */

import React from "react";
import "./App.css";
import MeetingInfo from "./components/MeetingInfo";
import { MeetingProvider } from "./components/MeetingContext";

function App() {
  return (
    <MeetingProvider>
      <MeetingInfo />
    </MeetingProvider>
  );
}

export default App;
