import { renderHook } from "@testing-library/react-hooks";

import { useMountedEffect } from "./use-mounted-effect.hook";

describe("useMountedEffect", () => {
  it("should run the effect if component is mounted", () => {
    const func = jest.fn();

    renderHook(() =>
      useMountedEffect((isMounted) => {
        if (isMounted()) func();
      })
    );

    expect(func).toHaveBeenCalled();
  });

  it("should't run the effect if component is unmounted", () => {
    jest.useFakeTimers();
    const func = jest.fn();

    const { unmount } = renderHook(() =>
      useMountedEffect((isMounted) => {
        setTimeout(() => {
          if (isMounted()) func();
        }, 3000);
      })
    );

    unmount();

    jest.runAllTimers();

    expect(func).not.toHaveBeenCalled();
  });
});
