import React from "react";
import { Establishment } from "../api/ratingsAPI";

const rowStyle: React.CSSProperties = {
    fontSize: "20px"
}

export const EstablishmentsTableRow: React.FC<{
  establishment: Establishment;
}> = ({ establishment }) => {
  return (
    <tr>
      <td style={rowStyle}>{establishment?.BusinessName}</td>
      <td style={rowStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};
