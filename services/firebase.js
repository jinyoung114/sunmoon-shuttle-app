import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXRYQgCOvRjLjrYAeTZm5yHrPFH1us2Gk",
  authDomain: "shuttlebusapp-ce380.firebaseapp.com",
  databaseURL: "https://shuttlebusapp-ce380-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shuttlebusapp-ce380",
  storageBucket: "shuttlebusapp-ce380.firebasestorage.app",
  messagingSenderId: "138976571361",
  appId: "1:138976571361:web:e1f44ae0949d2838c22ca0"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);