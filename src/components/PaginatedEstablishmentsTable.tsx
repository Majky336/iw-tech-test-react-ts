import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getEstablishments } from "../api/establishments";
import useFetch from "../hooks/useFetch";
import EstablishmentsTable from "./EstablishmentsTable";
import EstablishmentsTableNavigation from "./EstablishmentsTableNavigation";

const tableStyle: React.CSSProperties = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "20px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
};

const PAGE_COUNT = 100;

const PaginatedEstablishmentsTable: React.FC<{
  selectedAuthorityCode?: string;
}> = ({ selectedAuthorityCode }) => {
  const [pageNum, setPageNum] = useState(1);
  const [fetchFn, { error, data, isFetching }] = useFetch(
    getEstablishments(pageNum, getSearchParams(selectedAuthorityCode))
  );

  useEffect(() => {
    fetchFn();
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

  function getSearchParams(localAuthorityId?: string) {
    if (!localAuthorityId) {
      return undefined;
    }

    return { localAuthorityId };
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={tableStyle}>
      <h2>Food Hygiene Ratings</h2>
      <EstablishmentsTable
        establishments={data?.establishments || []}
        isLoading={isFetching}
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

export default PaginatedEstablishmentsTable;
