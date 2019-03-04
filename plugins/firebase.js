import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBVu3a-ZP98HaDw1V0cu6Ddide0DJ8OD4I",
  authDomain: "vowaid-volunteer.firebaseapp.com",
  databaseURL: "https://vowaid-volunteer.firebaseio.com",
  projectId: "vowaid-volunteer",
  storageBucket: "vowaid-volunteer.appspot.com",
  messagingSenderId: "217891530771"
};

!firebase.apps.length ? firebase.initializeApp(config) : "";
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
