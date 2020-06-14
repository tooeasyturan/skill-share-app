/** @format */

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import firebase from "firebase";
import app from "./config/firebase";
import MeetingInfo from "./components/MeetingInfo";
import { MeetingProvider } from "./components/MeetingContext";
import Meeting from "./components/Meeting";

function App() {
  return (
    <MeetingProvider>
      <Router>
        <Route exact path='/' component={MeetingInfo} />
        <Route exact path='/:id' component={Meeting} />
        {/* <MeetingInfo /> */}
      </Router>
    </MeetingProvider>
  );
}

export default App;
