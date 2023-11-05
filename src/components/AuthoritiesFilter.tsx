import React, { ChangeEvent } from "react";
import PropTypes from "prop-types";

export type AuthorityOption<T> = {
  label: string;
  value: T;
};

const EMPTY_OPTION: AuthorityOption<string> = {
  label: "---",
  value: "",
};

const containerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  margin: "20px 0",
};

const labelStyles: React.CSSProperties = {
  fontSize: "20px",
  color: "white",
};

const AuthoritiesFilter: React.FC<{
  authoritiesOptions?: AuthorityOption<string>[] | null;
  id: string;
  onSelect?: (selectedValue: string) => void;
  label?: string;
}> = ({ authoritiesOptions, id, onSelect, label }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!onSelect) {
      return;
    }

    onSelect(event.target.value);
  };

  return (
    <div style={containerStyles}>
      <label htmlFor={id} style={labelStyles}>
        {label}
      </label>
      <select id={id} onChange={handleChange}>
        {[EMPTY_OPTION, ...(authoritiesOptions || [])]?.map((option, index) => {
          return (
            <option key={option.value || index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AuthoritiesFilter;

AuthoritiesFilter.propTypes = {
  authoritiesOptions: PropTypes.array,
  onSelect: PropTypes.func,
};
