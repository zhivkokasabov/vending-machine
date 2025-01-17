import { Machine } from ".";

import { ByRoleMatcher, fireEvent, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CoinManagerProvider } from "providers/CoinManager.provider";
import { CashHopperProvider } from "providers/CashHopper.provider";
import { CodeProvider } from "providers/Code.provider";
import { ProductsProvider } from "providers/Products.provider";
import { MessageProvider } from "providers/Message.provider";
import { IProduct } from "interfaces/Product.interface";

import { TooltipProvider } from "components/ui/tooltip";

jest.mock("utils/generateRandomDenomination.util", () => ({
  generateRandomDenomination: () => 2.05
}));

describe("Machine tests", () => {
  const products: IProduct[] = [
    {
      id: 1,
      name: "Soda Can",
      stock: 1,
      image: "https://picsum.photos/600/300?text=Soda+Can",
      code: "001",
      price: 1.25
    },
    {
      id: 2,
      name: "Candy Bar",
      stock: 0,
      image: "https://picsum.photos/600/300?text=Candy+Bar",
      code: "002",
      price: 0.75
    }
  ];

  const renderComponent = () => render(
    <TooltipProvider>
      <CoinManagerProvider>
        <CashHopperProvider>
          <CodeProvider>
            <ProductsProvider products={products}>
              <MessageProvider>
                <Machine />
              </MessageProvider>
            </ProductsProvider>
          </CodeProvider>
        </CashHopperProvider>
      </CoinManagerProvider>
    </TooltipProvider>
  );

  const getButtons = (getAllByRole: (role: ByRoleMatcher) => HTMLElement[]) => {
    const buttons = getAllByRole("button");
    const denominations = buttons.slice(0, 8);
    const controls = [buttons[19]].concat(buttons.slice(9, 18));

    return {
      denominations,
      controls,
      random: buttons[8],
      purchase: buttons[21],
      cancel: buttons[18],
      cashOut: buttons[20]
    };
  }

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should sum inserted coins", () => {
    const { getAllByRole, queryByText } = renderComponent();

    const { denominations } = getButtons(getAllByRole);

    fireEvent.click(denominations[2]);
    fireEvent.click(denominations[2]);
    fireEvent.click(denominations[1]);
    fireEvent.click(denominations[5]);
    fireEvent.click(denominations[3]);
    fireEvent.click(denominations[6]);

    expect(queryByText("1.72")).not.toBeNull();
  });

  it("should send invalid denominations to the cashHopper", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { random } = getButtons(getAllByRole);
    const cashHopper = within(getByTestId("cash-hopper"));
    const display = within(getByTestId("display"));

    await userEvent.click(random);

    expect(cashHopper.queryByText("2.05")).not.toBeNull();
    expect(display.queryByText("2.05")).toBeNull();
  });

  it("should append control characters to code", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { controls } = getButtons(getAllByRole);
    const display = within(getByTestId("display"));

    await userEvent.click(controls[3]);
    await userEvent.click(controls[7]);
    await userEvent.click(controls[4]);
    await userEvent.click(controls[0]);

    expect(display.queryByText("3740")).not.toBeNull();
  });

  it("should clear code on cancel click", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { controls, cancel } = getButtons(getAllByRole);
    const display = within(getByTestId("display"));

    await userEvent.click(controls[2]);
    await userEvent.click(controls[6]);
    await userEvent.click(controls[3]);
    await userEvent.click(controls[9]);
    await userEvent.click(cancel);

    expect(display.queryByText("3740")).toBeNull();
  });

  it("should reset total on cashOut", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { denominations, cashOut } = getButtons(getAllByRole);
    const display = within(getByTestId("display"));

    await userEvent.click(denominations[6]);
    await userEvent.click(denominations[6]);
    await userEvent.click(cashOut);

    expect(display.queryByText("0")).not.toBeNull();
  });

  it("should return change on cashOut", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { denominations, cashOut } = getButtons(getAllByRole);
    const cashHopper = within(getByTestId("cash-hopper"));

    await userEvent.click(denominations[1]);
    await userEvent.click(denominations[1]);
    await userEvent.click(denominations[2]);
    await userEvent.click(cashOut);

    expect(cashHopper.queryByText("0.05")).not.toBeNull();
    expect(cashHopper.queryAllByText("0.02")).toHaveLength(2);
  });

  it("should show error message if invalid code", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { purchase, controls } = getButtons(getAllByRole);
    const display = within(getByTestId("display"));

    await userEvent.click(controls[1]);
    await userEvent.click(controls[1]);
    await userEvent.click(controls[2]);
    await userEvent.click(purchase);

    expect(display.queryByText("Invalid code!")).not.toBeNull();
  });

  it("should show error message if insufficient funds", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { purchase, controls } = getButtons(getAllByRole);
    const display = within(getByTestId("display"));

    await userEvent.click(controls[0]);
    await userEvent.click(controls[0]);
    await userEvent.click(controls[1]);

    await userEvent.click(purchase);

    expect(display.queryByText("Insufficient funds!")).not.toBeNull();
  });

  it("should show error message if product is out of stock", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { purchase, controls } = getButtons(getAllByRole);
    const display = within(getByTestId("display"));

    await userEvent.click(controls[0]);
    await userEvent.click(controls[0]);
    await userEvent.click(controls[2]);

    await userEvent.click(purchase);

    expect(display.queryByText("Product is out of stock!")).not.toBeNull();
  });

  it("should subtract from product stock on purchase", async () => {
    const { getAllByRole, getAllByTestId } = renderComponent();

    const { purchase, controls, denominations } = getButtons(getAllByRole);
    const product = within(getAllByTestId("product")[0]);

    await userEvent.click(controls[0]);
    await userEvent.click(controls[0]);
    await userEvent.click(controls[1]);
    
    await userEvent.click(denominations[7]);

    await userEvent.click(purchase);

    expect(product.queryByText("Out of stock")).not.toBeNull();
  });

  it("should return change on purchase", async () => {
    const { getAllByRole, getByTestId } = renderComponent();

    const { purchase, controls, denominations } = getButtons(getAllByRole);
    const cashHopper = within(getByTestId("cash-hopper"));

    await userEvent.click(controls[0]);
    await userEvent.click(controls[0]);
    await userEvent.click(controls[1]);
    
    await userEvent.click(denominations[7]);

    await userEvent.click(purchase);

    expect(cashHopper.queryByText("0.50")).not.toBeNull();
    expect(cashHopper.queryByText("0.20")).not.toBeNull();
    expect(cashHopper.queryByText("0.05")).not.toBeNull();
  });
});
