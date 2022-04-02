import { useEffect, useRef, DependencyList } from "react";

export const useMountedEffect = (
  effectCallback: (isMounted: () => boolean) => void,
  deps?: DependencyList | undefined
) => {
  const effectCallbackRef = useRef(effectCallback);
  effectCallbackRef.current = effectCallback;

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    effectCallbackRef.current(() => mountedRef.current);
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
