import { ReactNode } from "react";
import { ControlSize } from "../../main/types/enums";
import { twMerge } from "tailwind-merge";

interface Props {
  size?: ControlSize;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  className?: string;
}

export const ControlContainer = ({
  size,
  leftElement,
  rightElement,
  className,
}: Props) => (
  <div
    className={twMerge(
      "border border-basicGray rounded-xl bg-neutralGrayBg px-4 flex items-center gap-4",
      className,
      size === "small" && "h-[38px]",
      size === "medium" && "h-[42px]",
      size === "large" && "h-[48px]",
    )}
  >
    <div className="flex gap-[24px]">
      {leftElement}
      <img src="/separator.svg" alt="" />
    </div>
    {rightElement}
  </div>
);
