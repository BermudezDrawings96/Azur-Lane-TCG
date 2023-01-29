import React from "react";
import { Outlet } from "react-router-dom";

// components
import Navbar from "../components/Navbar/Navbar";

const View = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default View;
