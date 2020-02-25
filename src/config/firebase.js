import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAwWe8_MCe9TSZ40mCGK4SEPFnEcKXqQuQ",
  authDomain: "expert-e3a1c.firebaseapp.com",
  databaseURL: "https://expert-e3a1c.firebaseio.com",
  projectId: "expert-e3a1c",
  storageBucket: "expert-e3a1c.appspot.com",
  messagingSenderId: "198620453854",
  appId: "1:198620453854:web:b08ae07a9977c4f58a9b4f",
  measurementId: "G-THPPQSRN6P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

export const firestore = firebase.firestore();

export const users = firestore.collection('users');

export const auth = firebase.auth();