// hooks/useWhichScreen.ts
"use client";

import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

interface Breakpoints {
  tablet: number;
  desktop: number;
}

const defaultBreakpoints: Breakpoints = {
  tablet: 640,
  desktop: 1024,
};

export function useWhichScreen(
  breakpoints: Breakpoints = defaultBreakpoints,
): DeviceType {
  const [device, setDevice] = useState<DeviceType>("mobile");

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;

      if (width >= breakpoints.desktop) {
        setDevice("desktop");
      } else if (width >= breakpoints.tablet) {
        setDevice("tablet");
      } else {
        setDevice("mobile");
      }
    };

    // Run immediately on mount
    checkDevice();

    // Create media query list objects
    const mqlDesktop = window.matchMedia(
      `(min-width: ${breakpoints.desktop}px)`,
    );
    const mqlTablet = window.matchMedia(`(min-width: ${breakpoints.tablet}px)`);

    const onChange = () => checkDevice();

    mqlDesktop.addEventListener("change", onChange);
    mqlTablet.addEventListener("change", onChange);

    // Fallback for older/quirky environments
    window.addEventListener("resize", checkDevice);

    // Cleanup
    return () => {
      mqlDesktop.removeEventListener("change", onChange);
      mqlTablet.removeEventListener("change", onChange);
      window.removeEventListener("resize", checkDevice);
    };
  }, [breakpoints.tablet, breakpoints.desktop]);

  // This is the actual return of the hook
  return device;
}
