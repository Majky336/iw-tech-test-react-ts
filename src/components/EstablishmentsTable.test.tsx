import { render } from "@testing-library/react";
import EstablishmentsTable from "./EstablishmentsTable";
import { Establishment } from "../api/establishments";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to }: { children: any; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

const establishments: Establishment[] = [
  {
    FHRSID: 1,
    BusinessName: "Name 1",
    BusinessType: "Just a business",
    LocalAuthorityBusinessID: "1",
    RatingDate: "2022-11-07T00:00:00",
    RatingValue: "5",
    links: [],
  },
  {
    FHRSID: 2,
    BusinessName: "Name 2",
    BusinessType: "Special business",
    LocalAuthorityBusinessID: "2",
    RatingDate: "2022-11-03T00:00:00",
    RatingValue: "2",
    links: [],
  },
];

describe("EstablishmentsTable", () => {
  it("renders loader when isLoading is true", () => {
    const { getByText } = render(
      <EstablishmentsTable establishments={[]} isLoading={true} />
    );

    expect(getByText("Loading ...")).toBeInTheDocument();
  });

  it("renders no data when isLoading is false and there are no establishments", () => {
    const { getByText } = render(
      <EstablishmentsTable establishments={[]} isLoading={false} />
    );

    expect(getByText("No data found")).toBeInTheDocument();
  });

  it("renders correct headers", () => {
    const { getByText } = render(
      <EstablishmentsTable establishments={[]} isLoading={true} />
    );

    expect(getByText("Business Name")).toBeInTheDocument();
    expect(getByText("Rating Value")).toBeInTheDocument();
    expect(getByText("Favourite?")).toBeInTheDocument();
  });

  it("renders correct data when isLoading is false and there are some establishments", () => {
    const { getByText } = render(
      <EstablishmentsTable establishments={establishments} isLoading={false} />
    );

    expect(getByText("Name 1")).toBeInTheDocument();
    expect(getByText("Name 2")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
  });
});
