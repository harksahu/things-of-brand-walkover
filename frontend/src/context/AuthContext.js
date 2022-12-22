import React from "react";
import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  // signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import PropTypes from 'prop-types';
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  console.log(children);
  const [user, setUser] = useState({});
  const [isLoading,setIsLoading] = useState(true)
  const navigate = useNavigate();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
    navigate("/my-companies")

    // signInWithRedirect(auth, provider)
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};



AuthContextProvider.propTypes = {
  children: PropTypes.array
};
