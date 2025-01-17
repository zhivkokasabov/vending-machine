import { FC, PropsWithChildren } from "react";

export type ResponsiveContainerProps = {
  className?: string;
}

export const ResponsiveContainer: FC<PropsWithChildren<ResponsiveContainerProps>> = ({ className, children }) => (
  <div className={`p-4 ${className} mx-auto w-full max-w-[1240px]`}>
    {children}
  </div>
);
