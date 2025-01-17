import { CashHopper } from ".";

import { render } from "@testing-library/react";

import * as cashHopper from "providers/CashHopper.provider";

jest.mock("providers/CashHopper.provider");

describe("CashHopper tests", () => {

  beforeEach(() => {
    jest.spyOn(cashHopper, 'useCashHopper').mockReturnValue({
      stashCoins: jest.fn(),
      stashedCoins: []
    });
  });

  const renderComponent = () => render(
    <CashHopper />
  );

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should group coins", () => {
    jest.spyOn(cashHopper, 'useCashHopper').mockReturnValue({
      stashCoins: jest.fn(),
      stashedCoins: [1, 2, 2, 1]
    });

    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not stack more than 5 coins", () => {
    jest.spyOn(cashHopper, 'useCashHopper').mockReturnValue({
      stashCoins: jest.fn(),
      stashedCoins: [1, 2, 2, 1, 2, 2, 2, 2, 2]
    });

    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
