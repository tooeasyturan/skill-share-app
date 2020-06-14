/** @format */

import React from "react";
import "./App.css";
// import { DB_CONFIG } from "./config/firebase";
import firebase from "firebase";
import app from "./config/firebase";
import MeetingInfo from "./components/MeetingInfo";
import { MeetingProvider } from "./components/MeetingContext";

// let db = firebase.database();

// function writeData() {
//   db.ref("meetings").set({
//     title: "Test Meeting Title3",
//     name: "Bob",
//   });
// }

// writeData();

function App() {
  return (
    <MeetingProvider>
      <MeetingInfo />
    </MeetingProvider>
  );
}

export default App;
