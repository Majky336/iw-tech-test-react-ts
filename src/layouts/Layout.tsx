import React from "react";
import Background from "../static/logo.svg";
import { Outlet } from "react-router-dom";

const logoStyle: React.CSSProperties = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const mainStyle: React.CSSProperties = {
  maxWidth: "160ch",
  margin: "auto",
  padding: "50px",
};

const Layout: React.FC = () => {
  return (
    <>
      <header style={logoStyle} />
      <main style={mainStyle}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
