import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewai-a8557.firebaseapp.com",
  projectId: "interviewai-a8557",
  storageBucket: "interviewai-a8557.firebasestorage.app",
  messagingSenderId: "858879742935",
  appId: "1:858879742935:web:7e8e695ebe445f1c16f192"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider};