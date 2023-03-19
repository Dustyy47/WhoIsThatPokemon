import { ReactNode } from "react";

export function Wrapper({ children }: { children: ReactNode }) {
  return <div className="m-[0_auto] w-[96rem]">{children}</div>;
}
