import React from "react";
import { Establishment, EstablishmentSearchResult } from "../api/ratingsAPI";
import { Link } from "react-router-dom";
import { getEstablishmentDetailRoute } from "../constants/routes";

const rowStyle: React.CSSProperties = {
  fontSize: "20px",
};

const linkStyle: React.CSSProperties = {
  textDecoration: "underline",
  color: "#d14509",
};

export const EstablishmentsTableRow: React.FC<{
  establishment: Establishment | EstablishmentSearchResult;
}> = ({ establishment }) => {
  return (
    <tr>
      <td style={rowStyle}>
        <Link
          style={linkStyle}
          to={getEstablishmentDetailRoute(establishment.FHRSID)}
        >
          {establishment?.BusinessName}
        </Link>
      </td>
      <td style={rowStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};
