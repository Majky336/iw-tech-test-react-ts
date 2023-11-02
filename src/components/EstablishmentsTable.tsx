import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import { Establishment } from "../api/ratingsAPI";

const headerStyle: React.CSSProperties = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: Establishment[];
}> = ({ establishments }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
        </tr>
        {establishments?.map((establishment: Establishment, index: React.Key | null | undefined) => (
              <EstablishmentsTableRow
                key={index}
                establishment={establishment}
              />
            )
        )}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array.isRequired,
};
