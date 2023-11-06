import React from "react";

const rowStyle: React.CSSProperties = {
  fontStyle: "italic",
  fontSize: "20px",
};

const NoDataTableRow: React.FC = () => {
  return (
    <tr style={rowStyle}>
      <td>No data found</td>
    </tr>
  );
};

export default NoDataTableRow;
