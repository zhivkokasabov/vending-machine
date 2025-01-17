import { FC } from "react";

export type CoinProps = {
  denomination: string;
  className?: string;
}

export const Coin: FC<CoinProps> = ({
  denomination,
  className
}) => {
  return (
    <div
      className={`flex items-center bg-gray-500 border-black text-white rounded-full justify-center border w-[3rem] h-[3rem] ${className}`}
      style={{ transform: 'perspective(500px) rotateX(50deg)' }}
    >
      {denomination}
    </div>
  );
}