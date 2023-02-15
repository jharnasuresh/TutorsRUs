// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAozIn9kIV585tRmtZNe06eIG8mtU-CplI",
  authDomain: "tutorsrus-25b33.firebaseapp.com",
  projectId: "tutorsrus-25b33",
  storageBucket: "tutorsrus-25b33.appspot.com",
  messagingSenderId: "288178039159",
  appId: "1:288178039159:web:ba35228491c8c107719972",
  measurementId: "G-6TCVQJ6J6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);