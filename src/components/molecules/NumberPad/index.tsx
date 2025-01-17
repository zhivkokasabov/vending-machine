import { FC, useMemo } from "react";
import { XIcon, HandCoinsIcon, CheckIcon } from "lucide-react";

import { Control } from "components/atoms/Control";
import { Button } from "components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";

import { useCode } from "providers/Code.provider";

export type NumberPadProps = {
  onCashOut: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export const NumberPad: FC<NumberPadProps> = ({
  onCancel,
  onConfirm,
  onCashOut
}) => {
  const { append } = useCode();
  const numbers = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }, []);

  const onClick = (control: number) => {
    append(control);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {
          numbers.map((number) => (
            <Control key={number} onClick={() => onClick(number)}>
              {number}
            </Control>
          ))
        }
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Control onClick={onCancel} variant="destructive">
                <XIcon />
              </Control>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            Clear code
          </TooltipContent>
        </Tooltip>
        <Control onClick={() => onClick(0)}>
          0
        </Control>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Control onClick={onCashOut} variant="default">
                <HandCoinsIcon />
              </Control>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            Cash out
          </TooltipContent>
        </Tooltip>
      </div>
      
      <Button onClick={onConfirm} className="w-full" aria-label="purchase specified product">
        <CheckIcon /> Purchase
      </Button>
    </>
  );
}
