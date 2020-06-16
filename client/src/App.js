/** @format */

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import firebase from "firebase";
import app from "./config/firebase";
import MeetingInfo from "./components/MeetingInfo";
import MeetingInfo2 from "./components/MeetingInfo2";

import { MeetingProvider } from "./components/MeetingContext";
import { MeetingProvider2 } from "./components/MeetingContext2";

import Meeting from "./components/Meeting";

function App() {
  return (
    <MeetingProvider2>
      <Router>
        {/* <Route exact path='/' component={MeetingInfo} /> */}
        <Route exact path='/' component={MeetingInfo2} />

        <Route exact path='/:id' component={Meeting} />
        {/* <MeetingInfo /> */}
      </Router>
    </MeetingProvider2>
  );
}

export default App;
