import 'firebase/database';
import 'firebase/firestore';

import * as firebase from 'firebase/app';

firebase.initializeApp({
    apiKey: "AIzaSyCeqyNKElYC664xPDT2gMANBUB-0eFQf3U",
    authDomain: "dutchblitz-b77e6.firebaseapp.com",
    databaseURL: "https://dutchblitz-b77e6.firebaseio.com",
    projectId: "dutchblitz-b77e6",
    storageBucket: "dutchblitz-b77e6.appspot.com",
    messagingSenderId: "731384452190",
    appId: "1:731384452190:web:1b385c4b7f9f6a3cc9d0cf",
    measurementId: "G-7Z7WCW5BZW"
  });
  
const firestore = firebase.firestore();
const realtime = firebase.database();

export default {
    firestore,
    realtime,
};
