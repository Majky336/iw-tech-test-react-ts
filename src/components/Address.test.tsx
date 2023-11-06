import { render } from "@testing-library/react";
import Address from "./Address";

describe("Address", () => {
  it("renders with title", () => {
    const { getByText } = render(<Address addressLines={[]} title="Title" />);

    expect(getByText("Title")).toBeInTheDocument();
  });

  it("renders with title and address lines", () => {
    const { getByText } = render(
      <Address addressLines={["line1", "line2", "line3"]} title="Title" />
    );

    expect(getByText("line1")).toBeInTheDocument();
    expect(getByText("line2")).toBeInTheDocument();
    expect(getByText("line3")).toBeInTheDocument();
    expect(getByText("Title")).toBeInTheDocument();
  });

  it("renders with title and address lines", () => {
    const { getByText } = render(
      <Address
        addressLines={["line1", "line2", "", undefined, "line5"]}
        title="Title"
      />
    );

    expect(getByText("line1")).toBeInTheDocument();
    expect(getByText("line2")).toBeInTheDocument();
    expect(getByText("line5")).toBeInTheDocument();
    expect(getByText("Title")).toBeInTheDocument();
  });
});
