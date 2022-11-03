import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLf5LI0OAnLthD9C-GxZ3ZwRLBzkBOAQw",
  authDomain: "gourmet-6faba.firebaseapp.com",
  databaseURL: "https://gourmet-6faba-default-rtdb.firebaseio.com",
  projectId: "gourmet-6faba",
  storageBucket: "gourmet-6faba.appspot.com",
  messagingSenderId: "371408028132",
  appId: "1:371408028132:web:da22b5b445129696ef87f1"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
