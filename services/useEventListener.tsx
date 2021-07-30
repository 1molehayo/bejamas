import { useEffect } from "react";

const useEventListener = (
  event: string,
  handler: () => void,
  passive = false
) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // initiate the event handler
      window.addEventListener(event, handler, passive);

      // this will clean up the event every time the component is re-rendered
      return function cleanup() {
        window.removeEventListener(event, handler);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEventListener;
