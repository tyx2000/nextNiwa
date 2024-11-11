import { useCallback, useEffect, useRef } from 'react';

// Higher-order function that returns a throttled version of the passed function
const throttle = (fn: Function, delay: number = 400) => {
  // Timer to track pending delayed executions
  let timer: ReturnType<typeof setTimeout> | null = null;
  // Timestamp of the last time the function was executed
  let lastRun = 0;

  // Return the wrapped function that implements throttling
  return (...args: any[]) => {
    // Get current timestamp
    const now = Date.now();
    // If enough time has passed since last execution, run immediately
    if (now - lastRun >= delay) {
      fn.apply(fn, args);
      lastRun = now;
      // If no timer is currently set, schedule delayed execution
    } else if (timer === null) {
      timer = setTimeout(
        () => {
          // Execute function with original arguments
          fn.apply(fn, args);
          // Update last run timestamp
          lastRun = Date.now();
          // Clear timer reference
          timer = null;
        },
        // Calculate remaining delay time
        delay - (now - lastRun),
      );
    }
  };
};

const useThrottleFn = (fn: Function, delay: number = 400) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRunRef = useRef<number>(0);

  const run = useCallback(
    (...args: any[]) => {
      const now = Date.now();
      if (now - lastRunRef.current >= delay) {
        fn.apply(fn, args);
        lastRunRef.current = now;
      } else if (!timerRef.current) {
        timerRef.current = setTimeout(
          () => {
            fn.apply(fn, args);
            lastRunRef.current = Date.now();
            timerRef.current = null;
          },
          delay - (now - lastRunRef.current),
        );
      }
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
