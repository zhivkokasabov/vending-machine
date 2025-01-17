import { Products } from ".";

import { render } from "@testing-library/react";

import { ProductsProvider } from "providers/Products.provider";
import { IProduct } from "interfaces/Product.interface";

describe("Products tests", () => {
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
    <ProductsProvider products={products}>
      <Products />
    </ProductsProvider>
  );

  it("should render", () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
