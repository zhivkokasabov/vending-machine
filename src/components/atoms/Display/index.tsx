import { FC } from "react";

import { useCode } from "providers/Code.provider";
import { useCoinManager } from "providers/CoinManager.provider";
import { useMessage } from "providers/Message.provider";

export type DisplayProps = {
  className?: string;
}

export const Display: FC<DisplayProps> = ({
  className
}) => {
  const { total } = useCoinManager();
  const { code } = useCode();
  const { message } = useMessage();

  return (
    <div className={`bg-black rounded p-4 text-right text-white ${className}`} data-testid="display">
      <p className="text-4xl text-sky-600 font-bold mb-2">{total}</p>
      <p className="h-6 text-2xl max-w-40 text-ellipsis overflow-hidden mb-2">{code}</p>
      <p className="h-10 text-sm">{message}</p>
    </div>
  )
};
