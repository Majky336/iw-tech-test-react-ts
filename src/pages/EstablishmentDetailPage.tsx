import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Address from "../components/Address";
import { getFormattedDateFromDateString } from "../fns/date";
import { AppRoutes } from "../constants/routes";
import { getEstablishmentDetailById } from "../api/establishments";

import useFetch from "../hooks/useFetch";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  color: "white",
};

const ratingStyle: React.CSSProperties = {
  fontSize: "18px",
};

const inspectionDateStyle: React.CSSProperties = {
  fontSize: "18px",
};

const linkStyle: React.CSSProperties = {
  textDecoration: "underline",
  color: "white",
  width: "max-content",
  marginTop: "30px",
};

const EstablishmentDetailPage = () => {
  const { establishmentId } = useParams();
  const [fetchFn, { error, data, isFetching }] = useFetch(
    getEstablishmentDetailById(establishmentId!)
  );

  useEffect(() => {
    fetchFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [establishmentId]);

  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>{data?.BusinessName}</h2>
      <Address
        title="Establishment's address"
        addressLines={[
          data?.AddressLine1,
          data?.AddressLine2,
          data?.AddressLine3,
          data?.AddressLine4,
        ]}
      />
      <div style={ratingStyle}>Rating: {data?.RatingValue}</div>
      <div style={inspectionDateStyle}>
        Date of inspection: {getFormattedDateFromDateString(data?.RatingDate)}
      </div>

      <Link style={linkStyle} to={AppRoutes.HOME}>
        Go back
      </Link>
    </div>
  );
};

export default EstablishmentDetailPage;
