import { forwardRef, useImperativeHandle } from "react";

import { denominations } from "constants/denominations.const";

import { useCashHopper } from "providers/CashHopper.provider";
import { useCode } from "providers/Code.provider";
import { useCoinManager } from "providers/CoinManager.provider";
import { useMessage } from "providers/Message.provider";
import { useProducts } from "providers/Products.provider";

export type RefProps = {
  onCancel: () => void;
  onConfirm: () => void;
  onCashOut: () => void;
}

export const MotherBoard = forwardRef<RefProps>(function Brain(_, ref) {
  const { total, reset } = useCoinManager();
  const { stashCoins } = useCashHopper();
  const { code, resetCode } = useCode();
  const { products, deductStock } = useProducts();
  const { set, reset: resetMessage } = useMessage();

  const calculateChange = (amount: number) => {
    const coins = [];
    let sumToReturn = amount * 100;
    let index = denominations.length - 1;

    while (sumToReturn > 0) {
      const coinValue = denominations[index] * 100;

      if (sumToReturn < coinValue) {
        index--;
        continue;
      }

      coins.push(coinValue / 100);
      sumToReturn -= coinValue;
    }

    return coins;
  }

  const onCashOut = () => {
    const coins = calculateChange(total);

    stashCoins(coins);
    reset();
  }

  const onCancel = () => {
    resetCode();
  }

  const onConfirm = () => {
    const product = products.find((x) => x.code === code);
    resetMessage();

    if (!product) {
      set("Invalid code!");
      resetCode();
      return;
    }

    if (product.stock === 0) {
      set("Product is out of stock!");
      resetCode();
      return;
    }

    if (product.price > total) {
      set("Insufficient funds!");
      return;
    }

    deductStock(product.id);
    resetCode();
    reset();

    const remainder = total - product.price;

    if (remainder !== 0) {
      const coins = calculateChange(total - product.price);
      stashCoins(coins);
    }
  }

  useImperativeHandle(ref, () => ({
    onCancel,
    onConfirm,
    onCashOut
  }))

  return null;
});
