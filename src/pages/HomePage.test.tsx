import { render, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import useFetch from "../hooks/useFetch";

jest.mock("../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../components/PaginatedEstablishmentsTable", () => () => (
  <div>PaginatedEstablishmentsTable</div>
));

describe("HomePage", () => {
  beforeEach(() => {
    useFetch.mockImplementation(() => [
      jest.fn(),
      {
        data: {
          authorities: [{ Name: "Authority 1", LocalAuthorityIdCode: "AUTH1" }],
        },
      },
    ]);
  });

  it("renders without crashing", () => {
    const { getByLabelText } = render(<HomePage />);
    expect(
      getByLabelText("Select from list of Authorities:")
    ).toBeInTheDocument();
  });

  it("triggers data fetching on mount", () => {
    const fetchFn = jest.fn();
    useFetch.mockImplementation(() => [fetchFn, { data: null }]);

    render(<HomePage />);

    expect(fetchFn).toHaveBeenCalled();
  });

  it("renders the AuthoritiesFilter with the fetched data", async () => {
    const { findByText } = render(<HomePage />);

    const option = await findByText("Authority 1");

    expect(option).toBeInTheDocument();
  });

  it("sets selected authority code on select", async () => {
    const { getByLabelText, getByText } = render(<HomePage />);
    const select = getByLabelText("Select from list of Authorities:");

    fireEvent.change(select, { target: { value: "AUTH1" } });
    const option = await getByText("Authority 1");

    // Simulate click event on the option
    fireEvent.click(option);

    expect(getByText("Authority 1")).toBeInTheDocument();
  });
});
