import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import Loader from "./Loader";
import NoDataTableRow from "./NoDataTableRow";
import {
  Establishment,
  EstablishmentSearchResult,
} from "../api/establishments";

const headerStyle: React.CSSProperties = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: Establishment[] | EstablishmentSearchResult[] | null;
  isLoading: boolean;
}> = ({ establishments, isLoading }) => {
  const renderLoader = () => (
    <tr>
      <td>
        <Loader />
      </td>
    </tr>
  );

  const renderRows = (
    establishments: Establishment[] | EstablishmentSearchResult[] | null
  ) => {
    if (!establishments || !establishments.length) {
      return <NoDataTableRow />;
    }

    return establishments?.map((establishment, index) => (
      <EstablishmentsTableRow key={index} establishment={establishment} />
    ));
  };

  return (
    <table>
      <tbody>
        <tr>
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
          <th style={headerStyle}>Favourite?</th>
        </tr>
        {isLoading ? renderLoader() : renderRows(establishments)}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
};
