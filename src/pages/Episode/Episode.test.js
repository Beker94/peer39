/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import { act } from "react-test-renderer";
import { createMemoryHistory } from "history";

import { Router } from "react-router-dom";
import { setupFetchStub } from "../../utils";
import Episode from "./Episode";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "3",
  }),
}));

describe("Episode", () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(setupFetchStub([]));
  });
  it("error", async () => {
    await act(async () => {
      render(
        <Router location={history.location} navigator={history}>
          <Episode />
        </Router>
      );
    });

    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});
