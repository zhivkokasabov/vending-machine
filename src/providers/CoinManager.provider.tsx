"use client";
import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";

type State = {
  total: number;
}

type Action = { type: "insert", payload: number }
| { type: "reset" };

type CoinManagerProviderProps = PropsWithChildren;

const CoinManagerContext = createContext<{
  total: number,
  insertCoin: (denomination: number) => void,
  reset: () => void
} | undefined>(undefined);

const coinManagerReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "insert": {
      const total = Math.round(state.total * 100);
      const addition = Math.round(action.payload * 100);

      return {
        ...state,
        total: state.total = (total + addition) / 100
      };
    }
    case "reset": {
      return {
        ...state,
        total: 0
      };
    }
  }
}

const CoinManagerProvider: FC<CoinManagerProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(
    coinManagerReducer,
    { total: 0 }
  );

  const insertCoin = (denomination: number) => {
    dispatch({
      payload: denomination,
      type: "insert"
    })
  }

  const reset = () => {
    dispatch({
      type: "reset"
    })
  }

  return <CoinManagerContext.Provider value={{
    ...state,
    insertCoin,
    reset
  }}>
    {children}
  </CoinManagerContext.Provider>
}

const useCoinManager = () => {
  const context = useContext(CoinManagerContext);

  if (context === undefined) {
    throw new Error('useCoinManager must be used within a CoinManagerProvider');
  }

  return context;
}

export { CoinManagerProvider, useCoinManager };
