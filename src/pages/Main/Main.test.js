/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import { act } from "react-test-renderer";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { setupFetchStub } from "../../utils";
import Main from "./Main";

describe("Main", () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(
      setupFetchStub([
        {
          episode_id: 60,
          title: "Ozymandias",
          season: "5",
          air_date: "09-15-2013",
          characters: [
            "Walter White",
            "Jesse Pinkman",
            "Skyler White",
            "Hank Schrader",
            "Marie Schrader",
            "Walter White Jr.",
            "Todd Alquist",
            "Jack Welker",
            "Steve Gomez",
          ],
          episode: "14",
          series: "Breaking Bad",
        },
      ])
    );
  });
  it("component fetch data", async () => {
    await act(async () => {
      render(
        <Router location={history.location} navigator={history}>
          <Main />
        </Router>
      );
    });

    expect(screen.getByText(/Season 5/i)).toBeInTheDocument();
  });
});
