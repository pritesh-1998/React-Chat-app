import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    // apiKey: "AIzaSyBcn1fTLagLFXXmimcfrZcbun7XEjz1FEI",
    authDomain: "reactchatapp-ac4d3.firebaseapp.com",
    projectId: "reactchatapp-ac4d3",
    storageBucket: "reactchatapp-ac4d3.appspot.com",
    messagingSenderId: "635425774231",
    appId: "1:635425774231:web:06895891d059d71957e7d2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();