import { useEffect } from "react";

const useEventListener = (
  event: string,
  handler: () => void,
  passive = false
): void => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};

export default useEventListener;
