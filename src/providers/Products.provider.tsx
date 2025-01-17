"use client";
import { IProduct } from "interfaces/Product.interface";
import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";

type State = {
  products: IProduct[];
}

type Action = { type: "buy", payload: number };

type ProductsProviderProps = PropsWithChildren<{
  products: IProduct[];
}>;

const ProductsContext = createContext<{
  products: IProduct[],
  deductStock: (id: number) => void
} | undefined>(undefined);

const productsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "buy": {
      return {
        ...state,
        products: state.products.map((product) => ({
          ...product,
          stock: product.id === action.payload ? product.stock - 1 : product.stock
        }))
      };
    }
  }
}

const ProductsProvider: FC<ProductsProviderProps> = ({
  children,
  products
}) => {
  const [state, dispatch] = useReducer(
    productsReducer,
    { products }
  );

  const deductStock = (id: number) => {
    dispatch({
      payload: id,
      type: "buy"
    });
  }

  return <ProductsContext.Provider value={{
    ...state,
    deductStock
  }}>
    {children}
  </ProductsContext.Provider>
}

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
}

export { ProductsProvider, useProducts };
