import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'

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
export const storage = getStorage(app);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const createUserDocument = async (email, displayName, uid, userColor) => {
  const userRef = doc(collection(database, "users"), uid);
    try {
      await setDoc(userRef, {
        displayName: displayName,
        email: email,
        emailShow: true,
        uid: uid,
        yearMajor: '',
        yearMajorShow: true,
        userStatus: '',
        userStatusShow: true,
        profilePic: '',
        profilePicShow: true,
        telegramHandle: '',
        telegramHandleShow: true,
        NUSModsLink: '',
        NUSModsTimetable: '',
        NUSModsTimetableShow: true,
        createdAt: new Date(),
        userColor: userColor,
        userChatGroups: [],
      });
    } catch(error) {
      console.log('Error in creating user', error);
    }
}

export const chatsRef = collection(database, "chats");

