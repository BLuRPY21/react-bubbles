import React from "react";
import { NavLink } from "react-router-dom";

const SplashPage = () => {
  
  return (
    <>
      <h1>Welcome to the React Bubbles!</h1>
      <NavLink to="/login" className="button7">
        Login
      </NavLink>
    </>
  );
};

export default SplashPage;