/** @format */

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import firebase from "firebase";
import app from "./config/firebase";
import Meetings from "./components/Meetings";

import { MeetingProvider } from "./components/MeetingContext";

import Meeting from "./components/Meeting";
import AddMeeting from "./components/AddMeeting";

function App() {
  return (
    <MeetingProvider>
      <Router>
        <Route exact path='/' component={Meetings} />
        <Route exact path='/meetings/:id' component={Meeting} />
        <Route exact path='/addmeeting' component={AddMeeting} />
      </Router>
    </MeetingProvider>
  );
}

export default App;
