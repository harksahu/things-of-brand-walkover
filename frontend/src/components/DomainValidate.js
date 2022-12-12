import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const DomainValidate = ({ children }) => {
    const location = useLocation()
  if (!location.pathname.includes(".")) {
    return <Navigate to='/' />;
  }

  return children;
};

export default DomainValidate;
