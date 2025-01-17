import { ControlSize } from "../types/enums";

export const controlContainerSizeClass = (size: ControlSize): string =>
  size && size === "small"
    ? "h-[38px]"
    : size === "medium"
    ? "h-[42px]"
    : size === "large"
    ? "h-[48px]"
    : "";
