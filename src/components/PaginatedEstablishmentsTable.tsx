import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import {
  Establishment,
  EstablishmentSearchResult,
  FetchResult,
  getEstablishments,
} from "../api/ratingsAPI";

const tableStyle: React.CSSProperties = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "20px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
};

const PAGE_COUNT = 100;

export const PaginatedEstablishmentsTable: React.FC<{
  selectedAuthorityCode?: string;
}> = ({ selectedAuthorityCode }) => {
  const [fetchResult, setFetchResult] = useState<
    FetchResult<Establishment[] | EstablishmentSearchResult[]>
  >({
    error: null,
    data: null,
    isFetching: true,
  });
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    setFetchResult({
      error: null,
      data: null,
      isFetching: true,
    });

    getEstablishments(
      pageNum,
      getLocalAuthorityIdSearchParams(selectedAuthorityCode)
    ).then(
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
  }, [selectedAuthorityCode, pageNum]);

  useEffect(() => {
    pageNum !== 1 && setPageNum(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAuthorityCode]);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
  }

  async function handleNextPage() {
    pageNum < PAGE_COUNT && setPageNum(pageNum + 1);
  }

  function getLocalAuthorityIdSearchParams(localAuthorityId?: string) {
    if (!localAuthorityId) {
      return undefined;
    }

    return { localAuthorityId };
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
        pageCount={PAGE_COUNT}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

PaginatedEstablishmentsTable.propTypes = {
  selectedAuthorityCode: PropTypes.string,
};
