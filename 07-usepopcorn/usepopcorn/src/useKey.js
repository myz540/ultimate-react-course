import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(
    function () {
      function eventListenerCallback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          callback();
          console.log(key.toLowerCase());
        }
      }
      document.addEventListener("keydown", eventListenerCallback);
      // need to remove the event listener in the cleanup
      return () => {
        document.removeEventListener("keydown", eventListenerCallback);
      };
    },
    [key, callback]
  );
}
