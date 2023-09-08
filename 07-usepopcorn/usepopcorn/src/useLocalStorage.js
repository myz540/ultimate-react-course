import { useState, useRef, useEffect } from "react";

export function useLocalStorage(init, key) {
  const [val, setVal] = useState(function () {
    const val = localStorage.getItem(key);

    return val ? JSON.parse(val) : init;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(val));
    },
    [val, key]
  );

  return [val, setVal];
}
