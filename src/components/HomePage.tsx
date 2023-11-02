import React from "react";
import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";


const logoStyle: React.CSSProperties = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const HomePage = () => {
  return (
    <div>
      <header style={logoStyle} />
      <PaginatedEstablishmentsTable />
    </div>
  );
};

export default HomePage;
