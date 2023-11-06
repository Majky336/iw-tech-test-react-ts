import React from "react";
import PropTypes from "prop-types";

const buttonStyle: React.CSSProperties = {
  margin: "0 5px",
};

const EstablishmentsTableNavigation: React.FC<{
  pageNum: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}> = ({ pageCount, pageNum, onNextPage, onPreviousPage }) => {
  return (
    <nav>
      {
        <button
          type="button"
          style={buttonStyle}
          disabled={pageNum <= 1}
          onClick={onPreviousPage}
        >
          -
        </button>
      }
      {pageNum}
      {
        <button
          type="button"
          style={buttonStyle}
          disabled={pageNum >= pageCount}
          onClick={onNextPage}
        >
          +
        </button>
      }
    </nav>
  );
};

EstablishmentsTableNavigation.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
};

export default EstablishmentsTableNavigation;
