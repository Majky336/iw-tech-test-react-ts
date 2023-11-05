// Common types for all API calls

export type Scores = {
  Hygiene: number;
  Structural: number;
  ConfidenceInManagement: number;
};

export type Geocode = {
  longitude: string;
  latitude: string;
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
