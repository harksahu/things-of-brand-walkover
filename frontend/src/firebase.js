
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9skyUyb5RmyyWTUAvZnzQ050o95BtQ_4",
  authDomain: "things-of-brand.firebaseapp.com",
  projectId: "things-of-brand",
  storageBucket: "things-of-brand.appspot.com",
  messagingSenderId: "483966270538",
  appId: "1:483966270538:web:02b9f93a763c49ae46fab3",
  measurementId: "G-SGKRXY7XGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


