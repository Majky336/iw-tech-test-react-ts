import { getFormattedDateFromDateString } from "./date"; // replace with your actual file name

describe("getFormattedDateFromDateString", () => {
  it("returns an empty string if no date string is provided", () => {
    const formattedDate = getFormattedDateFromDateString();

    expect(formattedDate).toEqual("");
  });

  it("returns correctly formatted date when valid date string is provided", () => {
    const dateString = "2023-07-20";
    const formattedDate = getFormattedDateFromDateString(dateString);

    expect(formattedDate).toEqual("20/7/23");
  });

  it("handles dates correctly around New Year", () => {
    const dateString = "2023-01-01";
    const formattedDate = getFormattedDateFromDateString(dateString);

    expect(formattedDate).toEqual("1/1/23");
  });

  it("handles leap years correctly", () => {
    const dateString = "2024-02-29";
    const formattedDate = getFormattedDateFromDateString(dateString);

    expect(formattedDate).toEqual("29/2/24");
  });
});
