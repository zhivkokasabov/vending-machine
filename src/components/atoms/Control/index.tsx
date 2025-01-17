import { Button } from "components/ui/button";
import { forwardRef, PropsWithChildren } from "react";

export type ControlProps = {
  onClick: () => void;
  className?: string;
  variant?: Extract<React.ComponentProps<typeof Button>['variant'], string>;
}

export const Control = forwardRef<HTMLButtonElement, PropsWithChildren<ControlProps>>(function Control({
  onClick,
  children,
  className,
  variant = "outline"
}, ref) {
  return (
    <Button
      variant={variant}
      className={`${className} rounded-full w-[3rem] h-[3rem]`}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </Button>
  )
})