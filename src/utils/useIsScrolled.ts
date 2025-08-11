//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useEffect, useRef, useState } from "react";

/**
 * A hook that tracks whether the user has scrolled past a specified threshold.
 *
 * This hook is useful for showing/hiding navigation elements, implementing scroll-to-top
 * buttons, or triggering animations based on scroll position.
 *
 * @example
 * ```tsx
 * // Basic usage - triggers on any scroll
 * const isScrolled = useIsScrolled();
 *
 * // Custom threshold - triggers after scrolling 100px
 * const hasScrolledPastHeader = useIsScrolled(100);
 * ```
 */
export const useIsScrolled = (threshold = 0) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const rafIdRef = useRef<number>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame to avoid stale updates
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use requestAnimationFrame to ensure scroll updates happen at most once per frame
      rafIdRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > threshold);
        rafIdRef.current = undefined;
      });
    };

    // Check initial scroll position to handle cases where the page is already scrolled on mount
    setIsScrolled(window.scrollY > threshold);

    // Use passive listener since we're not calling preventDefault()
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Clean up any pending animation frame
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [threshold]);

  return isScrolled;
};
