import { useEffect, RefObject } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void
): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, callback]);
};

export default useClickOutside;
