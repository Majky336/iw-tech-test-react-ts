import React from 'react';
import { Establishment } from "../api/ratingsAPI";

export const EstablishmentsTableRow: React.FC<{
  establishment: Establishment;
}> = ({ establishment }) => {
  return (
    <tr>
      <td>{establishment?.BusinessName}</td>
      <td>{establishment?.RatingValue}</td>
    </tr>
  );
};
