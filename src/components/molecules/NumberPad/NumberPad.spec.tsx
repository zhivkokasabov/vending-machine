import { TooltipProvider } from "@radix-ui/react-tooltip";
import { NumberPad } from ".";

import { fireEvent, render } from "@testing-library/react";

import * as codeProvider from "providers/Code.provider";

jest.mock("providers/Code.provider");

describe("NumberPad tests", () => {
  const appendMock = jest.fn();
  const onCashOutMock = jest.fn();
  const onCancelMock = jest.fn();
  const onConfirmMock = jest.fn();

  const renderComponent = () => render(
    <TooltipProvider>
      <NumberPad onCancel={onCancelMock} onCashOut={onCashOutMock} onConfirm={onConfirmMock} />
    </TooltipProvider>
  );

  beforeEach(() => {
      jest.spyOn(codeProvider, 'useCode').mockReturnValue({
        append: appendMock,
        resetCode: jest.fn(),
        code: ""
      });
    });

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should propagate cancel", () => {
    const { getAllByRole } = renderComponent();

    fireEvent.click(getAllByRole("button")[9]);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it("should propagate confirm", () => {
    const { getAllByRole } = renderComponent();

    fireEvent.click(getAllByRole("button")[12]);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it("should propagate cashOut", () => {
    const { getAllByRole } = renderComponent();

    fireEvent.click(getAllByRole("button")[11]);

    expect(onCashOutMock).toHaveBeenCalledTimes(1);
  });

  it("should call append with the selected character", () => {
    const { getAllByRole } = renderComponent();

    fireEvent.click(getAllByRole("button")[2]);
    fireEvent.click(getAllByRole("button")[3]);
    fireEvent.click(getAllByRole("button")[10]);

    expect(appendMock).toHaveBeenCalledTimes(3);
    expect(appendMock).toHaveBeenCalledWith(3);
    expect(appendMock).toHaveBeenCalledWith(4);
    expect(appendMock).toHaveBeenCalledWith(0);
  });
});
