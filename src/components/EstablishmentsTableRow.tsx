import React, { ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { getEstablishmentDetailRoute } from "../constants/routes";
import { FavouriteEstablishmentsContext } from "../context/FavouriteEstablishments";
import {
  Establishment,
  EstablishmentSearchResult,
} from "../api/establishments";

const rowStyle: React.CSSProperties = {
  fontSize: "20px",
};

const linkStyle: React.CSSProperties = {
  textDecoration: "underline",
  color: "#d14509",
};

const EstablishmentsTableRow: React.FC<{
  establishment: Establishment | EstablishmentSearchResult;
}> = ({ establishment }) => {
  const {
    favouriteEstablishments,
    setFavouriteEstablishments,
    addFavouriteEstablishment,
    removeFavouriteEstablishment,
  } = useContext(FavouriteEstablishmentsContext);

  const handleFavourite = (event: ChangeEvent<HTMLInputElement>) => {
    const targetEstablishment: Establishment = {
      FHRSID: establishment.FHRSID,
      BusinessName: establishment.BusinessName,
      BusinessType: establishment.BusinessType,
      LocalAuthorityBusinessID: establishment.LocalAuthorityBusinessID,
      RatingDate: establishment.RatingDate,
      RatingValue: establishment.RatingValue,
      links: [],
    };

    if (event.target.checked) {
      const updatedFavouriteEstablishments = addFavouriteEstablishment(
        targetEstablishment,
        favouriteEstablishments
      );

      setFavouriteEstablishments(updatedFavouriteEstablishments);
      return;
    }

    const updatedFavouriteEstablishments = removeFavouriteEstablishment(
      targetEstablishment,
      favouriteEstablishments
    );

    setFavouriteEstablishments(updatedFavouriteEstablishments);
  };

  const isFavourite = !!favouriteEstablishments.find(
    (favouriteEstablishment) =>
      favouriteEstablishment.FHRSID === establishment.FHRSID
  );

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
      <td style={rowStyle}>
        <input
          type="checkbox"
          checked={isFavourite}
          onChange={handleFavourite}
        />
      </td>
    </tr>
  );
};

export default EstablishmentsTableRow;
