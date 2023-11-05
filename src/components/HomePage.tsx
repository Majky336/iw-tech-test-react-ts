import React, { useEffect, useMemo, useState } from "react";
import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";
import AuthoritiesFilter, { AuthorityOption } from "./AuthoritiesFilter";
import { FetchResult, Authority, getAuthorities } from "../api/ratingsAPI";

const logoStyle: React.CSSProperties = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const mainStyle: React.CSSProperties = {
  maxWidth: "160ch",
  margin: "auto",
  padding: "50px",
};

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
      <header style={logoStyle} />
      <main style={mainStyle}>
        <AuthoritiesFilter
          authoritiesOptions={cachedAuthoritiesOptions}
          id="authorities-filter"
          onSelect={handleSelectAuthorityCode}
          label="Select from list of Authorities:"
        />
        <PaginatedEstablishmentsTable
          selectedAuthorityCode={selectedAuthorityCode}
        />
      </main>
    </>
  );
};

export default HomePage;
