import { useCallback, useState } from "react";
import { makeApiCall } from "../api/client";

export type FetchError = {
  message: string;
  [key: string]: string;
};

export type FetchFn = () => void;

export type FetchInput<T> = string | Promise<T>;

export type FetchOutput<T> = [
  () => void,
  { error: FetchError | null; data: T | null; isFetching: boolean }
];

export type FetchResult<T> = {
  error: FetchError | null;
  data: T | null;
  isFetching: boolean;
};

const useFetch = <T>(input: FetchInput<T>): FetchOutput<T> => {
  const [fetchResult, setFetchResult] = useState<FetchResult<T>>({
    error: null,
    data: null,
    isFetching: true,
  });

  const fetchFn = () => {
    setFetchResult({
      error: null,
      data: null,
      isFetching: true,
    });

    if (typeof input === "string") {
      return makeApiCall<T>(input)
        .then((result) => {
          setFetchResult({
            error: null,
            data: result,
            isFetching: false,
          });
        })
        .catch((error) => {
          setFetchResult({
            error,
            data: null,
            isFetching: false,
          });
        });
    }

    return input
      .then((result) => {
        setFetchResult({
          error: null,
          data: result,
          isFetching: false,
        });
      })
      .catch((error) => {
        setFetchResult({
          error,
          data: null,
          isFetching: false,
        });
      });
  };

  const cachedFetchFn = useCallback(fetchFn, [input]);

  return [
    cachedFetchFn,
    {
      error: fetchResult.error,
      data: fetchResult.data,
      isFetching: fetchResult.isFetching,
    },
  ];
};

export default useFetch;
