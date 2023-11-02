import React, { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import {
  Establishment,
  FetchResult,
  getEstablishmentRatings,
} from "../api/ratingsAPI";

const tableStyle: React.CSSProperties = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

export const PaginatedEstablishmentsTable = () => {
  const [fetchResult, setFetchResult] = useState<FetchResult<Establishment[]>>({
    error: null,
    data: null,
    isFetching: true,
  });
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);

  useEffect(() => {
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setFetchResult({
          error: null,
          data: result.establishments,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);

    setFetchResult({
      error: null,
      data: null,
      isFetching: true,
    });

    getEstablishmentRatings(pageNum).then(
      (result) => {
        setFetchResult({
          error: null,
          data: result.establishments,
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
  }

  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);

    setFetchResult({
      error: null,
      data: null,
      isFetching: true,
    });

    getEstablishmentRatings(pageNum).then(
      (result) => {
        setFetchResult({
          error: null,
          data: result.establishments,
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
  }

  if (fetchResult.error) {
    return <div>Error: {fetchResult.error.message}</div>;
  }

  return (
    <div style={tableStyle}>
      <h2>Food Hygiene Ratings</h2>
      <EstablishmentsTable
        establishments={fetchResult.data}
        isLoading={fetchResult.isFetching}
      />
      <EstablishmentsTableNavigation
        pageNum={pageNum}
        pageCount={pageCount}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};
