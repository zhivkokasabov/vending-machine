import { CoinSlotPanel } from ".";

import * as coinManager from "providers/CoinManager.provider";
import * as cashHopper from "providers/CashHopper.provider";
import { denominations } from "constants/denominations.const";
import { TooltipProvider } from "components/ui/tooltip";
import { fireEvent, render } from "@testing-library/react";

jest.mock("providers/CoinManager.provider");
jest.mock("providers/CashHopper.provider");

describe("CoinSlotPanel tests", () => {
  const insertCoinMock = jest.fn();
  const stashCoinsMock = jest.fn();

  const renderComponent = () => render(
   <TooltipProvider>
     <CoinSlotPanel />
   </TooltipProvider>
  );

  beforeEach(() => {
    jest.spyOn(coinManager, 'useCoinManager').mockReturnValue({
      insertCoin: insertCoinMock,
      reset: jest.fn(),
      total: 1
    });
    jest.spyOn(cashHopper, 'useCashHopper').mockReturnValue({
      stashCoins: stashCoinsMock,
      stashedCoins: []
    });
  });

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should call insertCoin with correct denomination", () => {
    const { getAllByRole } = renderComponent();

    const coinButtons = getAllByRole("button");

    fireEvent.click(coinButtons[2]);

    expect(insertCoinMock).toHaveBeenCalledTimes(1);
    expect(insertCoinMock).toHaveBeenCalledWith(denominations[2]);
  });

  it("should call stashCoins if invalid denomination", () => {
    const { getAllByRole } = renderComponent();

    const coinButtons = getAllByRole("button");

    fireEvent.click(coinButtons[8]);

    expect(stashCoinsMock).toHaveBeenCalledTimes(1);
  });
});
