// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore , collection} from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFMjVNAepr4yqqvE2-XLOLNrgOI0tAC8o",
  authDomain: "trips-app-15f2b.firebaseapp.com",
  projectId: "trips-app-15f2b",
  storageBucket: "trips-app-15f2b.appspot.com",
  messagingSenderId: "567945303471",
  appId: "1:567945303471:web:2ec994493b0c10cefb4b5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

export const tripsRef = collection(db , 'trips');
export const expensesRef = collection(db , 'expenses');


export default app ;