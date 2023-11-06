import { render } from "@testing-library/react";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";

jest.mock("../components/FavouriteEstablishmentsTable", () => () => (
  <div>FavouriteEstablishmentsTable</div>
));

describe("Layout", () => {
  it("always renders FavouriteEstablishmentsTable", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(getByText("FavouriteEstablishmentsTable")).toBeInTheDocument();
  });
});
