import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import App from "./App";

describe("Episode", () => {
  const history = createMemoryHistory();

  it("component fetch data", async () => {
    const { container } = render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    expect(container).toBeInTheDocument();
  });
});
