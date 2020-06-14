/** @format */

import firebase from "firebase";
let db = firebase.database();
const meetingsRef = db.ref("meetings");

export function writeMeeting(values) {
  let meetingData = {
    title: values.title,
    presenter: values.presenter,
    summary: values.summary,
    comments: [],
  };

  if (!db.ref("meetings")) {
    db.ref("meetings").set(meetingData);
  } else {
    db.ref("meetings").push(meetingData);
  }
}

export function writeComment(updatedComments) {
  meetingsRef.child("-M9ceylsoE2_bbYkgphZ").update({
    comments: updatedComments,
  });
}

export function readMeeting() {
  meetingsRef.on("child_added", (snapshot) => {
    console.log("child added!");
  });
}

export const queryMeeting = async (): Promise<any> => {
  const res = await meetingsRef.orderByKey().once("value");
  const snapshot = res.val();
  return Object.entries(snapshot);
};
