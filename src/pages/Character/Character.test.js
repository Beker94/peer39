/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import { act } from "react-test-renderer";
import { createMemoryHistory } from "history";

import Character from "./Character";
import { Router } from "react-router-dom";
import { setupFetchStub } from "../../utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    name: "Saul Goodman",
  }),
}));

describe("Character", () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(
      setupFetchStub([
        {
          char_id: 8,
          name: "Saul Goodman",
          birthday: "Unknown",
          occupation: ["Lawyer"],
          img: "https://vignette.wikia.nocookie.net/breakingbad/images/1/16/Saul_Goodman.jpg/revision/latest?cb=20120704065846",
          status: "Alive",
          nickname: "Jimmy McGill",
          appearance: [2, 3, 4, 5],
          portrayed: "Bob Odenkirk",
          category: "Breaking Bad, Better Call Saul",
          better_call_saul_appearance: [1, 2, 3, 4, 5],
        },
      ])
    );
  });
  it("component fetch data", async () => {
    await act(async () => {
      render(
        <Router location={history.location} navigator={history}>
          <Character />
        </Router>
      );
    });

    expect(screen.getByText(/Saul Goodman/i)).toBeInTheDocument();
  });
});
