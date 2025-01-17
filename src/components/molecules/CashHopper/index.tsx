import React from "react";

import { Coin } from "components/atoms/Coin";
import { useCashHopper } from "providers/CashHopper.provider";

export const CashHopper = () => {
  const { stashedCoins } = useCashHopper();

  const stackDefaultValue: Record<string, number> = {};
  const groupedCoins = stashedCoins.reduce((acc, curr) => {
    const roundedKey = curr.toFixed(2);

    acc[roundedKey] = acc[roundedKey] ? acc[roundedKey] + 1 : 1;

    return acc;
  }, stackDefaultValue);
  // might sort them eventually, we'll see
  const stacks = Object.entries(groupedCoins);

  return (
    <div className="flex gap-2 pt-4 w-full max-w-full flex-wrap" data-testid="cash-hopper">
      {stacks.map(([denomination, stackSize]) => {
        return <div key={denomination} className="relative w-[3rem] h-[3rem]">
          {
            Array.from({ length: stackSize > 5 ? 5 : stackSize }, (_, index) => {
              return <Coin
                key={index}
                denomination={denomination}
                // generate for: top-[-3px] top-[-6px] top-[-9px] top-[-12px] top-[-15px]
                className={`absolute left-0 top-[${index * -3}px]`}
              />;
            })
          }
          {
            stackSize < 5
              ? (null)
              : (
                <div className="absolute bottom-[0.5rem] right-[-1px] rounded-full bg-white border border-black text-center w-4 h-4 text-xs">{stackSize}</div>
              )
          }
        </div>
      })}
    </div>
  )
}