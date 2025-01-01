
// Your Firebase configuration object



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBrjLApJL9K5UkSf5YQuwvp-lmKV14ygZY",
    authDomain: "innomax-app.firebaseapp.com",
    projectId: "innomax-app",
    storageBucket: "innomax-app.firebasestorage.app",
    messagingSenderId: "66191010121",
    appId: "1:66191010121:web:94e3815e349eb41e2dd298"
  };


const app = initializeApp(firebaseConfig);
export { app, getFirestore, getStorage };
