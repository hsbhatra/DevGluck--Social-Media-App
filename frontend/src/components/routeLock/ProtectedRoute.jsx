import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // later we will have state for token and avoid localstorage on Auth process since it is exposed
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser?.token;
  // console.log("ProtectedRoute token:", token);
  return token ? children : <Navigate to="/login" replace />;
}