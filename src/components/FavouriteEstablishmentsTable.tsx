import React, { useContext } from "react";
import { FavouriteEstablishmentsContext } from "../context/FavouriteEstablishments";
import EstablishmentsTable from "./EstablishmentsTable";

const tableStyle: React.CSSProperties = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "20px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  margin: "15px 0",
};

const FavouriteEstablishmentsTable: React.FC = () => {
  const { favouriteEstablishments } = useContext(
    FavouriteEstablishmentsContext
  );

  return (
    <div style={tableStyle}>
      <h2>My favourite establishments:</h2>
      <EstablishmentsTable
        establishments={favouriteEstablishments}
        isLoading={false}
      />
    </div>
  );
};

export default FavouriteEstablishmentsTable;
