import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";
import { BASE_URL } from "./client";
import {
  EstablishmentSearchParams,
  getEstablishmentDetailById,
  getEstablishmentRatingsByPageNumber,
  getEstablishmentRatingsBySearchParams,
  getEstablishments,
} from "./establishments";

enableFetchMocks();

describe("Authorities API calls", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("getEstablishmentRatingsByPageNumber call the Establishments/basic endpoint with correct page number and returns the data", async () => {
    // Given
    const pageNumber = 1;
    const expectedResponse = { testing: "test" };
    const expectedEndpoint = `${BASE_URL}/Establishments/basic/${pageNumber}/10`;
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    // When
    const actual = await getEstablishmentRatingsByPageNumber(pageNumber);

    // Then
    expect(actual).toEqual(expectedResponse);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(expectedEndpoint);
  });

  it("getEstablishmentRatingsBySearchParams call the Establishments endpoint with correct search params and returns the data", async () => {
    // Given
    const searchParams: EstablishmentSearchParams = {
      localAuthorityId: "555",
      pageNum: "9",
    };
    const expectedResponse = { testing: "test" };
    const expectedEndpoint = `${BASE_URL}/Establishments?localAuthorityId=555&pageNum=9`;
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    // When
    const actual = await getEstablishmentRatingsBySearchParams(searchParams);

    // Then
    expect(actual).toEqual(expectedResponse);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(expectedEndpoint);
  });

  it("getEstablishmentDetailById call the Establishments endpoint by id and returns the data", async () => {
    // Given
    const expectedResponse = { testing: "test" };
    const expectedEndpoint = `${BASE_URL}/Establishments/5`;
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    // When
    const actual = await getEstablishmentDetailById(5);

    // Then
    expect(actual).toEqual(expectedResponse);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(expectedEndpoint);
  });

  it("getEstablishments call the Establishments/basic endpoint with correct page number when empty search params are provided and returns the data", async () => {
    // Given
    const pageNumber = 1;
    const searchParams = {};
    const expectedResponse = { testing: "test" };
    const expectedEndpoint = `${BASE_URL}/Establishments/basic/${pageNumber}/10`;
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    // When
    const actual = await getEstablishments(pageNumber, searchParams);

    // Then
    expect(actual).toEqual(expectedResponse);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(expectedEndpoint);
  });

  it("getEstablishments call the the Establishments endpoint with correct search params and returns the data", async () => {
    // Given
    const pageNumber = 1;
    const searchParams: EstablishmentSearchParams = { localAuthorityId: "10" };
    const expectedResponse = { testing: "test" };
    const expectedEndpoint = `${BASE_URL}/Establishments?pageNum=1&localAuthorityId=10`;
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    // When
    const actual = await getEstablishments(pageNumber, searchParams);

    // Then
    expect(actual).toEqual(expectedResponse);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(expectedEndpoint);
  });
});
