"use client";
import { useRef } from "react";

import { Board } from "components/molecules/Board";
import { CashHopper } from "components/molecules/CashHopper";
import { Products } from "components/molecules/Products";
import { MotherBoard, RefProps } from "components/organisms/MotherBoard";
import { Divider } from "components/atoms/Divider";

export const Machine = () => {
  const brain = useRef<RefProps>(null);

  const onCancel = () => {
    brain.current?.onCancel();
  }

  const onCashOut = () => {
    brain.current?.onCashOut();
  }

  const onConfirm = () => {
    brain.current?.onConfirm();
  }

  return (
    <>
      <MotherBoard ref={brain} />
      <div className="flex gap-4 grow mb-4">
        <Products />
        <Board
          onCancel={onCancel}
          onCashOut={onCashOut}
          onConfirm={onConfirm}
        />
      </div>
      <Divider />
      <CashHopper />
    </>
  )
};
