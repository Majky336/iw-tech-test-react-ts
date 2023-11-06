import { makeApiCall } from "./client";
import { Link, Metadata } from "./types";

export type Authority = {
  LocalAuthorityId: number;
  LocalAuthorityIdCode: string;
  Name: string;
  EstablishmentCount: number;
  SchemeType: number;
  links: Link[];
};

export type BasicAuthority = {
  authorities: Authority[];
  meta: Metadata;
  links: Link[];
};

export const getAuthorities = (): Promise<BasicAuthority> => {
  return makeApiCall("Authorities/basic");
};
