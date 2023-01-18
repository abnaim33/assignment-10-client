// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTyh0T_wn2ul8GnIFWyEWGmewDBJ4Qg0E",
    authDomain: "assignment-9-46021.firebaseapp.com",
    projectId: "assignment-9-46021",
    storageBucket: "assignment-9-46021.appspot.com",
    messagingSenderId: "815039288189",
    appId: "1:815039288189:web:c2742d003f31e877357214"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };