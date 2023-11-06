import { render } from "@testing-library/react";
import EstablishmentDetailPage from "./EstablishmentDetailPage";
import useFetch from "../hooks/useFetch";

jest.mock("../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to }: { children: any; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useParams: () => ({
    establishmentId: "1",
  }),
}));

describe("EstablishmentDetailPage", () => {
  beforeEach(() => {
    useFetch.mockImplementation(() => [
      jest.fn(),
      {
        data: {
          BusinessName: "Establishment name",
          RatingValue: "5",
          RatingDate: "2022-11-07T00:00:00",
          AddressLine1: "Some street",
        },
      },
    ]);
  });

  it("renders without crashing", () => {
    const { getByText } = render(<EstablishmentDetailPage />);

    expect(getByText("Establishment name")).toBeInTheDocument();
  });

  it("triggers data fetching on mount", () => {
    const fetchFn = jest.fn();
    useFetch.mockImplementation(() => [fetchFn, { data: {} }]);

    render(<EstablishmentDetailPage />);

    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("renders correct adress", () => {
    const { getByText } = render(<EstablishmentDetailPage />);

    expect(getByText("Some street")).toBeInTheDocument();
  });

  it("renders correct rating", () => {
    const { getByText } = render(<EstablishmentDetailPage />);

    expect(getByText("Rating: 5")).toBeInTheDocument();
  });

  it("renders correct date", () => {
    const { getByText } = render(<EstablishmentDetailPage />);

    expect(getByText("Date of inspection: 7/11/22")).toBeInTheDocument();
  });

  it("renders go back button", () => {
    const { getByText } = render(<EstablishmentDetailPage />);

    expect(getByText("Go back")).toBeInTheDocument();
  });
});
