import { makeApiCall } from "./client";
import { Geocode, Link, Metadata, Scores } from "./types";

export type Establishment = {
  BusinessName: string;
  BusinessType: string;
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  RatingDate: string;
  RatingValue: string;
  links: Link[];
};

export type EstablishmentsType = {
  establishments: Establishment[];
  meta: Metadata;
  links: Link[];
};

export type EstablishmentSearchParams = Partial<{
  localAuthorityId: string;
  pageNum: string;
}>;

export type EstablishmentSearchResult = Establishment & {
  ChangesByServerID: number;
  BusinessTypeID: number;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  PostCode: string;
  Phone: string;
  RatingKey: string;
  LocalAuthorityCode: string;
  LocalAuthorityName: string;
  LocalAuthorityWebSite: string;
  LocalAuthorityEmailAddress: string;
  scores: Scores;
  SchemeType: string;
  geocode: Geocode;
  RightToReply: string;
  Distance: number;
  NewRatingPending: boolean;
};

export type EstablishmentSearchResults = {
  establishments: EstablishmentSearchResult[];
  links: Link[];
  meta: Metadata;
};

export type EstablishmentDetail = {
  FHRSID: number;
  ChangesByServerID: number;
  LocalAuthorityBusinessID: string;
  BusinessName: string;
  BusinessType: string;
  BusinessTypeID: number;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  PostCode: string;
  Phone: string;
  RatingValue: string;
  RatingKey: string;
  RatingDate: string;
  LocalAuthorityCode: string;
  LocalAuthorityName: string;
  LocalAuthorityWebSite: string;
  LocalAuthorityEmailAddress: string;
  scores: Scores;
  SchemeType: string;
  geocode: Geocode;
  RightToReply: string;
  Distance: number;
  NewRatingPending: boolean;
};

export function getEstablishments(
  pageNum: number,
  searchParams?: EstablishmentSearchParams
) {
  if (!searchParams || Object.keys(searchParams).length === 0) {
    return getEstablishmentRatingsByPageNumber(pageNum);
  }

  return getEstablishmentRatingsBySearchParams({
    pageNum: pageNum.toString(),
    ...searchParams,
  });
}

export function getEstablishmentRatingsByPageNumber(
  pageNum: number
): Promise<EstablishmentsType> {
  return makeApiCall(`Establishments/basic/${pageNum}/10`);
}

export function getEstablishmentRatingsBySearchParams(
  searchParams: EstablishmentSearchParams
): Promise<EstablishmentSearchResults> {
  return makeApiCall(
    `Establishments?${new URLSearchParams(searchParams).toString()}`
  );
}

export function getEstablishmentDetailById(
  id: string | number
): Promise<EstablishmentDetail> {
  return makeApiCall(`Establishments/${id}`);
}
