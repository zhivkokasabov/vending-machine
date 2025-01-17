import { render } from "@testing-library/react";
import { Header } from ".";

describe("Header tests", () => {
  const renderComponent = () => render(
    <Header />
  );

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
