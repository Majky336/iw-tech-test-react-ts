import React, { useEffect, useMemo, useState } from "react";
import { PaginatedEstablishmentsTable } from "../components/PaginatedEstablishmentsTable";
import AuthoritiesFilter, {
  AuthorityOption,
} from "../components/AuthoritiesFilter";
import { FetchResult, Authority, getAuthorities } from "../api/ratingsAPI";

const HomePage = () => {
  const [selectedAuthorityCode, setSelectedAuthorityCode] = useState<
    string | undefined
  >(undefined);
  const [fetchResult, setFetchResult] = useState<FetchResult<Authority[]>>({
    error: null,
    data: null,
    isFetching: true,
  });
  const cachedAuthoritiesOptions = useMemo<AuthorityOption<string>[]>(() => {
    if (!fetchResult.data) {
      return [];
    }

    return fetchResult.data.map((authority) => ({
      label: authority.Name,
      value: authority.LocalAuthorityIdCode,
    }));
  }, [fetchResult.data]);

  useEffect(() => {
    getAuthorities().then(
      (result) => {
        setFetchResult({
          error: null,
          data: result.authorities,
          isFetching: false,
        });
      },
      (error) => {
        setFetchResult({ error, data: null, isFetching: false });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
