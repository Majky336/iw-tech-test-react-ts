import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";
import { getAuthorities } from "./authorities";
import { BASE_URL } from "./client";

enableFetchMocks();

describe("Authorities API calls", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the Authorities/basic endpoint and returns the data", async () => {
    // Given
    const expectedResponse = { testing: "test" };
    const expectedEndpoint = `${BASE_URL}/Authorities/basic`;
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));
    // When
    const actual = await getAuthorities();

    // Then
    expect(actual).toEqual(expectedResponse);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(expectedEndpoint);
  });
});
