import { FC } from "react";

import { CoinSlotPanel } from "components/atoms/CoinSlotPanel";
import { Display } from "components/atoms/Display";
import { Divider } from "components/atoms/Divider";
import { NumberPad, NumberPadProps } from "components/molecules/NumberPad";

export type BoardProps = NumberPadProps;

export const Board: FC<BoardProps> = (props) => {

  return (
    <div className="w-[10rem] max-w-[10rem]">
      <Display className="mb-4" />
      <CoinSlotPanel />
      <Divider />
      <NumberPad {...props} />
    </div>
  );
};
