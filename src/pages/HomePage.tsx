import React, { useEffect, useMemo, useState } from "react";
import { PaginatedEstablishmentsTable } from "../components/PaginatedEstablishmentsTable";
import AuthoritiesFilter, {
  AuthorityOption,
} from "../components/AuthoritiesFilter";
import { getAuthorities } from "../api/authorities";
import useFetch from "../hooks/useFetch";

const HomePage: React.FC = () => {
  const [selectedAuthorityCode, setSelectedAuthorityCode] = useState<
    string | undefined
  >(undefined);
  const [fetchFn, { data }] = useFetch(getAuthorities());
  const cachedAuthoritiesOptions = useMemo<AuthorityOption<string>[]>(() => {
    if (!data) {
      return [];
    }

    return data.authorities.map((authority) => ({
      label: authority.Name,
      value: authority.LocalAuthorityIdCode,
    }));
  }, [data]);

  useEffect(() => {
    fetchFn();
  }, []);

  const handleSelectAuthorityCode = (authorityCode: string) => {
    setSelectedAuthorityCode(authorityCode);
  };

  return (
    <>
      <AuthoritiesFilter
        authoritiesOptions={cachedAuthoritiesOptions}
        id="authorities-filter"
        onSelect={handleSelectAuthorityCode}
        label="Select from list of Authorities:"
      />
      <PaginatedEstablishmentsTable
        selectedAuthorityCode={selectedAuthorityCode}
      />
    </>
  );
};

export default HomePage;
