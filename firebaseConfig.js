import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCRw8HAEMuCYtxtZnAnmqxfHzu5MTmsFf4",
  authDomain: "connectinus-9b1c6.firebaseapp.com",
  projectId: "connectinus-9b1c6",
  storageBucket: "connectinus-9b1c6.appspot.com",
  messagingSenderId: "1021105229648",
  appId: "1:1021105229648:web:fd240ff7ca3db9f737e655",
  measurementId: "G-XLRTCGK3HD"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
