// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByI7Pc_NlzPkkBivGILd2-ubM-3n02cDg",
    authDomain: "shadow-bin.firebaseapp.com",
    projectId: "shadow-bin",
    storageBucket: "shadow-bin.appspot.com",
    messagingSenderId: "852718759883",
    appId: "1:852718759883:web:2f1c37c34d00f3eabc504e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
