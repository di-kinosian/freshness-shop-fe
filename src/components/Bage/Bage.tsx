import { PropsWithChildren } from "react";

export const Bage = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-neutralGreenBg font-semibold px-2 bg-lightGreen rounded-full">
      {children}
    </div>
  );
};
