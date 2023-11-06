import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginatedEstablishmentsTable from "./PaginatedEstablishmentsTable";
import { Establishment } from "../api/establishments";
import useFetch from "../hooks/useFetch";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to }: { children: any; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock("../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
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

describe("PaginatedEstablishmentsTable", () => {
  it("triggers data fetching on mount", () => {
    const fetchFn = jest.fn();
    useFetch.mockImplementation(() => [
      fetchFn,
      { data: { establishments }, isFetching: false },
    ]);

    render(<PaginatedEstablishmentsTable selectedAuthorityCode="" />);

    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("triggers data fetching on change page", () => {
    const fetchFn = jest.fn();
    useFetch.mockImplementation(() => [
      fetchFn,
      { data: { establishments }, isFetching: false },
    ]);

    const { getByText } = render(
      <PaginatedEstablishmentsTable selectedAuthorityCode="" />
    );

    expect(fetchFn).toHaveBeenCalledTimes(1);

    const nextPage = getByText("+");

    userEvent.click(nextPage);

    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it("does not change page when previous page number is lower than 1", () => {
    const fetchFn = jest.fn();
    useFetch.mockImplementation(() => [
      fetchFn,
      { data: { establishments }, isFetching: false },
    ]);

    const { getByText } = render(
      <PaginatedEstablishmentsTable selectedAuthorityCode="" />
    );

    expect(fetchFn).toHaveBeenCalledTimes(1);

    const previousPage = getByText("-");

    userEvent.click(previousPage);

    expect(fetchFn).not.toHaveBeenCalledTimes(2);
  });

  it("fetches new data when selectedAuthorityCode changes", () => {
    const fetchFn = jest.fn();
    useFetch.mockImplementation(() => [
      fetchFn,
      { data: { establishments }, isFetching: false },
    ]);

    const { getByText, rerender } = render(
      <PaginatedEstablishmentsTable selectedAuthorityCode="" />
    );

    expect(fetchFn).toHaveBeenCalled();

    rerender(<PaginatedEstablishmentsTable selectedAuthorityCode="1" />);

    expect(fetchFn).toHaveBeenCalledTimes(2);
  });
});
