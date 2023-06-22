// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

export const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBRq8VabufXAUSqLb0iPy664aOvgZOm5JM",
    authDomain: "whastappclonedb.firebaseapp.com",
    projectId: "whastappclonedb",
    storageBucket: "whastappclonedb.appspot.com",
    messagingSenderId: "68385683594",
    appId: "1:68385683594:web:883870b6246aecf46ed573",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
