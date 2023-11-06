import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../constants/routes";

const pageStyle: React.CSSProperties = {
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  flexDirection: "column",
  fontSize: "26px",
};

const linkStyle: React.CSSProperties = {
  textDecoration: "underline",
  color: "#d14509",
};

const NotFoundPage: React.FC = () => {
  return (
    <div style={pageStyle}>
      <div>They page you are looking for does not exist. </div>
      <div>
        You should{" "}
        <Link style={linkStyle} to={AppRoutes.HOME}>
          go back
        </Link>
        .
      </div>
    </div>
  );
};

export default NotFoundPage;
