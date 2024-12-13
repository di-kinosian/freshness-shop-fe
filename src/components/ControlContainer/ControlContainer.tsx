import { ReactNode } from "react";
import { ControlSize } from "../../main/types/enums";
import { twMerge } from "tailwind-merge";
import { controlContainerSizeClass } from "../../main/constants/classes.constants";

interface Props {
  size?: ControlSize;
  leftElement: ReactNode;
  rightElement: ReactNode;
  className?: string;
}

export const ControlContainer = ({
  size = ControlSize.MEDIUM,
  leftElement,
  rightElement,
  className,
}: Props) => (
  <div
    className={twMerge(
      "border border-basicGray rounded-xl bg-neutralGrayBg px-4 flex items-center justify-between",
      className,
      controlContainerSizeClass(size as ControlSize),
    )}
  >
    <div className="flex gap-2">
      {leftElement}
      <div className="border border-basicGray h-[20px]"></div>
    </div>
    {rightElement}
  </div>
);
