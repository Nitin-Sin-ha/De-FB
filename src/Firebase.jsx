// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDe66kLcLcFLxO_ibdiA_eThxPizcMSMUw",
  authDomain: "plant-disease-7f68f.firebaseapp.com",
  projectId: "plant-disease-7f68f",
  storageBucket: "plant-disease-7f68f.appspot.com",
  messagingSenderId: "491912366552",
  appId: "1:491912366552:web:0a13277ec0e1ec75c14aad",
  measurementId: "G-9SQ04MPSLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);