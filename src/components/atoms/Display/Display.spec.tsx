import { render } from "@testing-library/react";

import { Display } from ".";

import * as coinManager from "providers/CoinManager.provider";
import * as codeProvider from "providers/Code.provider";
import * as messageProvider from "providers/Message.provider";

jest.mock("providers/CoinManager.provider");
jest.mock("providers/Code.provider");
jest.mock("providers/Message.provider");

describe("CoinSlotPanel tests", () => {
  const total = 12;
  const code = "code";
  const message = "message";

  const renderComponent = () => render(
     <Display />
  );

  beforeEach(() => {
    jest.spyOn(coinManager, 'useCoinManager').mockReturnValue({
      insertCoin: jest.fn(),
      reset: jest.fn(),
      total
    });
    jest.spyOn(codeProvider, 'useCode').mockReturnValue({
      append: jest.fn(),
      resetCode: jest.fn(),
      code
    });
    jest.spyOn(messageProvider, 'useMessage').mockReturnValue({
      reset: jest.fn(),
      set: jest.fn(),
      message
    });
  });

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
