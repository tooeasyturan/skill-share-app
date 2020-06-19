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
    let newKey = db.ref("meetings").push(meetingData);
    return newKey.key;
  }
}

export function writeComment(id, updatedComments) {
  meetingsRef.child(`${id}/comments`).push({
    name: updatedComments.name,
    comment: updatedComments.comment,
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
  if (snapshot) {
    return Object.entries(snapshot);
  }
};

export const queryByRef = async (id) => {
  const res = await meetingsRef.child(id).once("value");
  return res.val();
};
