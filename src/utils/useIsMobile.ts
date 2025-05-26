//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Custom React hook that determines if the current viewport width is considered "mobile"
 * based on the `MOBILE_BREAKPOINT` constant.
 *
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile-specific UI
 * }
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
};
