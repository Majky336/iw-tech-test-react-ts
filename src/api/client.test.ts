import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";
import { BASE_URL, makeApiCall } from "./client";

enableFetchMocks();

describe("API client", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the given endpoint with correct headers and returns the data", async () => {
    // Given
    const endpoint = "test";
    const expectedResponse = { testing: "test" };
    const expectedEndpoint = `${BASE_URL}/test`;
    const expectedHeaders = { headers: { "x-api-version": "2" } };

    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    // When
    const actual = await makeApiCall(endpoint);

    // Then
    expect(actual).toEqual(expectedResponse);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(expectedEndpoint);
    expect(fetch.mock.calls[0][1]).toEqual(expectedHeaders);
  });
});
