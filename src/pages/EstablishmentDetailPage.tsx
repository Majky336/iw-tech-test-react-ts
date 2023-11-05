import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  EstablishmentDetail,
  FetchResult,
  getEstablishmentDetailById,
} from "../api/ratingsAPI";
import Loader from "../components/Loader";
import Address from "../components/Address";
import { getFormattedDateFromDateString } from "../fns/date";
import { AppRoutes } from "../constants/routes";

const containerStyles: React.CSSProperties = {
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
  const [fetchResult, setFetchResult] = useState<
    FetchResult<EstablishmentDetail>
  >({
    error: null,
    data: null,
    isFetching: true,
  });

  useEffect(() => {
    setFetchResult({
      error: null,
      data: null,
      isFetching: true,
    });

    getEstablishmentDetailById(establishmentId!).then(
      (result) => {
        setFetchResult({
          error: null,
          data: result,
          isFetching: false,
        });
      },
      (error) => {
        setFetchResult({
          error,
          data: null,
          isFetching: false,
        });
      }
    );
  }, [establishmentId]);

  const { data, error, isFetching } = fetchResult;

  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div style={containerStyles}>
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
