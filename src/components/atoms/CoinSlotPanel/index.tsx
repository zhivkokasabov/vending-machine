import { Button } from "components/ui/button";
import { Control } from "components/atoms/Control";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";

import { useCashHopper } from "providers/CashHopper.provider";
import { useCoinManager } from "providers/CoinManager.provider";

import { denominations } from "constants/denominations.const";
import { generateRandomDenomination } from "utils/generateRandomDenomination.util";

export const CoinSlotPanel = () => {
  const { insertCoin } = useCoinManager();
  const { stashCoins } = useCashHopper();

  const onClick = (coin: number) => {
    if (denominations.indexOf(coin) >= 0) {
      insertCoin(coin);
    } else {
      stashCoins(coin);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {
        denominations.map((coin: number) => (
          <Control
            key={coin}
            onClick={() => onClick(coin)}
          >
            {coin}
          </Control>
        ))
      }
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="destructive"
            className="rounded-full w-[3rem] h-[3rem]"
            onClick={() => onClick(generateRandomDenomination())}
            aria-label="Insert random coin"
          >
            ?
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Insert random coin
        </TooltipContent>
      </Tooltip>
    </div>
  )
};
