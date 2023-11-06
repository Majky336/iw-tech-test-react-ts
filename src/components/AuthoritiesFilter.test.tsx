import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthoritiesFilter, { AuthorityOption } from "./AuthoritiesFilter";

const authoritiesOptions: AuthorityOption<string>[] = [
  { label: "Authority 1", value: "1" },
  { label: "Authority 2", value: "2" },
  { label: "Authority 3", value: "3" },
];

describe("AuthoritiesFilter", () => {
  it("renders with label", () => {
    const { getByText } = render(
      <AuthoritiesFilter label="Authorities" id="authorities" />
    );

    expect(getByText("Authorities")).toBeInTheDocument();
  });

  it("renders with empty option as initial option", () => {
    const { getByLabelText, getByText } = render(
      <AuthoritiesFilter label="Authorities" id="authorities" />
    );

    const select = getByLabelText("Authorities");

    expect(select).toHaveValue("");
  });

  it("sets correct value after user clicks on option", () => {
    const { getByLabelText, getByText } = render(
      <AuthoritiesFilter
        label="Authorities"
        id="authorities"
        authoritiesOptions={authoritiesOptions}
      />
    );

    const select = getByLabelText("Authorities");

    userEvent.selectOptions(select, "2");

    expect(select).toHaveValue("2");
  });
});
