import { PropsWithChildren } from "react";

export const Bage = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-neutralGreenBg font-semibold px-4 bg-lightGreen rounded-full">
      {children}
    </div>
  );
};
