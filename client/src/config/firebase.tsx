/** @format */

import app from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBUJFCOLNxkuWsSxFCO9BlpRKTl2rvy1_4",
  authDomain: "skill-share-app.firebaseapp.com",
  databaseURL: "https://skill-share-app.firebaseio.com",
  projectId: "skill-share-app",
  storageBucket: "skill-share-app.appspot.com",
  messagingSenderId: "484337902713",
  appId: "1:484337902713:web:c4979eba0616db36f560a8",
  measurementId: "G-5KN311X2F9",
};
app.initializeApp(firebaseConfig);

export default app;
