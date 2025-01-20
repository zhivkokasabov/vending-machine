import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";

import { Button } from "components/ui/button";

export type ControlProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  className?: string;
  variant?: Extract<React.ComponentProps<typeof Button>['variant'], string>;
}

export const Control = forwardRef<HTMLButtonElement, PropsWithChildren<ControlProps>>(function Control({
  onClick,
  children,
  className,
  variant = "outline",
  ...rest
}, ref) {
  return (
    <Button
      variant={variant}
      className={`${className} rounded-full w-[3rem] h-[3rem]`}
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  )
})