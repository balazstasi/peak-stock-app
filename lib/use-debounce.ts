import { useRef } from "react";

import { useEffect } from "react";

import { Effect } from "effect";
import { useMemo } from "react";

const sleep = (delay: number) => Effect.promise(() => new Promise((resolve) => setTimeout(resolve, delay)));

export const useDebounce = (callback: () => void, delay: number) => {
  const ref = useRef<() => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return Effect.gen(function* (_) {
      yield* _(sleep(delay));
      func();
    }).pipe(Effect.withSpan("debouncedCallback"));
  }, [delay]);

  return debouncedCallback;
};
