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

export type Establishment = {
  BusinessName: string;
  BusinessType: string;
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  RatingDate: string;
  RatingValue: string;
  links: Link[];
};

export type Metadata = {
  dataSource: string;
  extractDate: string;
  itemCount: number;
  returncode: string;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
};

export type Link = {
  rel: string;
  href: string;
};

export type EstablishmentsType = {
  establishments: Establishment[];
  meta: Metadata;
  links: Link[];
};

export type FetchError = {
  message: string;
  [key: string]: string;
};

export type FetchResult<T> = {
  data: T | null;
  error: FetchError | null;
  isFetching: boolean;
};

export type EstablishmentSearchParams = Partial<{
  localAuthorityId: string;
  pageNum: string;
}>;

export type EstablishmentSearchResult = Omit<Establishment, "links"> & {
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

export type Scores = {
  Hygiene: number;
  Structural: number;
  ConfidenceInManagement: number;
};

export type Geocode = {
  longitude: string;
  latitude: string;
};

export type EstablishmentSearchResults = {
  establishments: EstablishmentSearchResult[];
  links: Link[];
  meta: Metadata;
};

// TODO: Create API client with Base URL

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
  return fetch(
    `https://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getEstablishmentRatingsBySearchParams(
  searchParams: EstablishmentSearchParams
): Promise<EstablishmentSearchResults> {
  const url = `https://api.ratings.food.gov.uk/Establishments?${new URLSearchParams(
    searchParams
  ).toString()}`;

  return fetch(url, { headers: { "x-api-version": "2" } }).then((res) =>
    res.json()
  );
}

export function getAuthorities(): Promise<BasicAuthority> {
  return fetch("https://api.ratings.food.gov.uk/Authorities/basic", {
    headers: { "x-api-version": "2" },
  }).then((res) => res.json());
}
