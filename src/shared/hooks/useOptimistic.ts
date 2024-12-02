import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';

export function useOptimistic<T, P>(
  passthrough: T,
  reducer: (state: T, payload: P) => T
): [T, (payload: P) => void] {
  const [value, setValue] = useState(passthrough);

  useEffect(() => {
    setValue(passthrough);
  }, [passthrough]);

  return [value, (payload) => setValue(reducer(passthrough, payload))];
}
