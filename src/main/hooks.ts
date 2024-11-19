import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/app/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number| null = null;
  
  return (...args: Parameters<T>): void => {
    if (timeout) {
      return;
    }
    func(...args);
    timeout = setTimeout(() => {
      timeout = null;
    }, delay);
  };
};
