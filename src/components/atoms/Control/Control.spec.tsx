import { fireEvent, render } from "@testing-library/react";
import { Control } from ".";

describe("Control tests", () => {
  const onClickMock = jest.fn();

  const renderComponent = () => render(
    <Control onClick={onClickMock} className="className" variant="default">
      1
    </Control>
  );

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should propagate click", () => {
    const { getByRole } = renderComponent();

    fireEvent.click(getByRole("button"));

    expect(onClickMock).toHaveBeenCalled();
  });
});
