
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAY_MdjTCphhgYy1_8sR7PuH3vjudaQ0k",
  authDomain: "web-auth-ff19c.firebaseapp.com",
  projectId: "web-auth-ff19c",
  storageBucket: "web-auth-ff19c.appspot.com",
  messagingSenderId: "47977585631",
  appId: "1:47977585631:web:c46a6edfa322374442026a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
