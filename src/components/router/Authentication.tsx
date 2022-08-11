import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

const Authentication = ({ children }) => {
  let location = useLocation();
  // 判断是否需要鉴权
  const isRequiredAuth = (): Boolean => {
    // return localStorage.getItem('accessToken') === null;
    return false;
  }
  if (isRequiredAuth()) {
    return <Navigate to={'/login'} state={{ from: location }} replace />
  }
  return children;
}

export default Authentication;
