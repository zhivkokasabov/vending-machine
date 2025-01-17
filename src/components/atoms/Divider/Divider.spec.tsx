import { render } from "@testing-library/react";
import { Divider } from ".";

describe("Divider tests", () => {
  const renderComponent = () => render(
    <Divider />
  );

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
