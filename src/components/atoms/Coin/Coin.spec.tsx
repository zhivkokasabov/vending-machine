import { render } from "@testing-library/react";
import { Coin } from ".";

describe("Coin tests", () => {
  const renderComponent = () => render(
    <Coin denomination="1" className="className" />
  );

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
