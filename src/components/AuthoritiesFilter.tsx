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

const AuthoritiesFilter: React.FC<{
  authoritiesOptions?: AuthorityOption<string>[] | null;
  onSelect?: (selectedValue: string) => void;
}> = ({ authoritiesOptions, onSelect }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!onSelect) {
      return;
    }

    onSelect(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      {[EMPTY_OPTION, ...(authoritiesOptions || [])]?.map((option, index) => {
        return (
          <option key={option.value || index} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default AuthoritiesFilter;

AuthoritiesFilter.propTypes = {
  authoritiesOptions: PropTypes.array,
  onSelect: PropTypes.func,
};
