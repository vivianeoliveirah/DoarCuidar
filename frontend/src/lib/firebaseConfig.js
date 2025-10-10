// src/lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE_F4_tXOv1PHaRZUKeZjxgsaCyMr5gJQ",
  authDomain: "doarcuidar-cb8fe.firebaseapp.com",
  projectId: "doarcuidar-cb8fe",
  storageBucket: "doarcuidar-cb8fe.firebasestorage.app",
  messagingSenderId: "601751816125",
  appId: "1:601751816125:web:de05d04844c627f01874d4",
  measurementId: "G-HJF90ME2LE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
