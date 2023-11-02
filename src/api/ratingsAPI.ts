export type Establishment = {
  BusinessName: string;
  BusinessType: string;
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  RatingDate: string;
  RatingValue: string;
  links: EstablishmentLink[];
};

export type EstablishmentMetadata = {
  dataSource: string;
  extractDate: string;
  itemCount: number;
  returncode: string;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
};

export type EstablishmentLink = {
  rel: string;
  href: string;
};

export type EstablishmentsType = {
  establishments: Establishment[];
  meta: EstablishmentMetadata;
  links: EstablishmentLink[];
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

export function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `https://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}
