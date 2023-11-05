const commonHeaders = {
  "x-api-version": "2",
};

export const BASE_URL = "https://api.ratings.food.gov.uk";

export const makeApiCall = <T>(endpoint: string): Promise<T> => {
  const url = `${BASE_URL}/${endpoint}`;

  return fetch(url, { headers: commonHeaders }).then((res) => res.json());
};
