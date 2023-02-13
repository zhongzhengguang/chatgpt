import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEHAFED9d_rDT_Q3FLs5ZvvP98YizsJZc",
  authDomain: "chatgpt-70f0e.firebaseapp.com",
  projectId: "chatgpt-70f0e",
  storageBucket: "chatgpt-70f0e.appspot.com",
  messagingSenderId: "1065951719215",
  appId: "1:1065951719215:web:2830aab96f866dacbebbda",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
