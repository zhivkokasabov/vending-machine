"use client";
import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";

type State = {
  stashedCoins: number[];
}

type Action = { type: "stash", payload: number | number[] }
| { type: "reset" };

type CashHopperProviderProps = PropsWithChildren;

const CashHopperContext = createContext<{
  stashedCoins: number[],
  stashCoins: (coins: number | number[]) => void
} | undefined>(undefined);

const cashHopperReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "stash": {
      return {
        ...state,
        stashedCoins: state.stashedCoins.concat(action.payload)
      };
    }
    case "reset": {
      return {
        ...state,
        stashedCoins: []
      };
    }
  }
}

const CashHopperProvider: FC<CashHopperProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(
    cashHopperReducer,
    { stashedCoins: [] }
  );

  const stashCoins = (coin: number | number[]) => {
    dispatch({
      payload: coin,
      type: "stash"
    })
  }

  return <CashHopperContext.Provider value={{
    ...state,
    stashCoins
  }}>
    {children}
  </CashHopperContext.Provider>
}

const useCashHopper = () => {
  const context = useContext(CashHopperContext);

  if (context === undefined) {
    throw new Error('useCashHopper must be used within a CashHopperProvider');
  }

  return context;
}

export { CashHopperProvider, useCashHopper };
