// Copy this file to firebase-init.js and fill in the web app config from
// Firebase console > Project settings > General > Your apps (project: nexa-83944).
// The live firebase-init.js on Hostinger is not in this repo because the
// Hostinger file API refuses to export files that look like credentials.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "nexa-83944.firebaseapp.com",
    projectId: "nexa-83944",
    storageBucket: "nexa-83944.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc, onSnapshot };
