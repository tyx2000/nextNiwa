import { useCallback, useEffect, useRef, useState } from 'react';

const debounce = (fn: Function, delay: number = 400) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: any[]) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn.apply(fn, args), delay);
  };
};

const useDebounceValue = <T>(value: T, delay: number = 100): T => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setVal(val), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return val;
};

const useDebounceFn = (fn: Function, delay: number = 400) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = useCallback(
    (...args: any[]) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        fn.apply(fn, args);
        timerRef.current = null;
      }, delay);
    },
    [fn, delay],
  );

  const cancel = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => cancel(), []);

  return { run, cancel };
};
