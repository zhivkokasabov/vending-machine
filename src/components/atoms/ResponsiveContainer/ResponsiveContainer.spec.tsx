import { render } from "@testing-library/react";
import { ResponsiveContainer } from ".";

describe("ResponsiveContainer tests", () => {
  const renderComponent = () => render(
    <ResponsiveContainer className="className" />
  );

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
