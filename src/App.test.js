import { render } from "@testing-library/react";
import App from "./App";

describe("Drawing canvas layout", () => {
  it("renders the two main containers", () => {
    const { container } = render(<App />);

    const mainElement = container.querySelector(".main");
    const toolsElement = container.querySelector(".tools");

    expect(mainElement).toBeInTheDocument();
    expect(toolsElement).toBeInTheDocument();
  });
});
