import React from "react";
import PropTypes from "prop-types";

type AddressLine = string | undefined;

const addressStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  color: "white",
};

const addressLinesStyle: React.CSSProperties = {
  margin: 0,
};

const addressLineStyle: React.CSSProperties = {
  fontSize: "18px",
  margin: "5px 0",
};

const titleStyle: React.CSSProperties = {
  margin: "10px 0",
};

const Address: React.FC<{
  addressLines: AddressLine[];
  title?: string;
}> = ({ addressLines, title }) => {
  return (
    <div style={addressStyle}>
      {title && <h3 style={titleStyle}>{title}</h3>}
      <ul style={addressLinesStyle}>
        {addressLines.map((line, index) => {
          return (
            line && (
              <li style={addressLineStyle} key={index}>
                {line}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

Address.propTypes = {
  addressLines: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default Address;
