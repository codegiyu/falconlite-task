import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDRYThEITuiznk0JRKeJfPndJi9OoXvlFA",
  authDomain: "falconlite-task.firebaseapp.com",
  projectId: "falconlite-task",
  storageBucket: "falconlite-task.appspot.com",
  messagingSenderId: "259668582152",
  appId: "1:259668582152:web:fd15907ca35d41e300d6bd",
  measurementId: "G-MMB24JNQQX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)