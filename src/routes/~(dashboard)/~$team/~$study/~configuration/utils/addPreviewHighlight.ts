//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

interface CreateHighlightElementParams {
  id: string;
  highlightColor: string;
  borderColor: string;
  borderWidthInPixels: number;
  borderRadiusInPercent: number;
}

/**
 * Creates a highlight overlay element that can be positioned over a target element.
 *
 * The highlight element is styled as an absolute positioned div that extends 10% beyond
 * the target element's boundaries on all sides. The border radius is adjusted based on
 * the target element's aspect ratio to maintain correct visual proportions.
 */
const createHighlightElement = ({
  id,
  highlightColor,
  borderColor,
  borderWidthInPixels,
  borderRadiusInPercent,
}: CreateHighlightElementParams) => {
  const highlight = document.createElement("div");

  Object.assign(highlight.style, {
    position: "absolute",
    top: "-10%",
    left: "-10%",
    width: "120%",
    height: "120%",
    pointerEvents: "none",
    backgroundColor: highlightColor,
    border: `${borderWidthInPixels}px solid ${borderColor}`,
    borderRadius: `calc(var(--phone-width) * ${borderRadiusInPercent / 100})`,
  });

  highlight.id = id;
  return highlight;
};

interface HighlightConfig {
  targetIdPrefix: string;
  highlightColor?: string;
  borderColor?: string;
  borderWidthInPixels?: number;
  borderRadiusInPercent?: number;
}

/**
 * Adds preview highlight functionality to a form field by creating visual highlight overlays
 * when the field gains focus and removing them when it loses focus.
 * @example
 * ```typescript
 * const field = { id: "username", onBlur: () => console.log("blur") };
 * const enhancedField = addPreviewHighlight(field, {
 *   targetIdPrefix: "form",
 *   highlightColor: "rgba(0, 123, 255, 0.1)"
 * });
 * ```
 */
export const addPreviewHighlight = (
  field: { id: string; onBlur: () => void },
  config: HighlightConfig = { targetIdPrefix: "phone" },
) => {
  const {
    targetIdPrefix,
    highlightColor = "color-mix(in oklab, var(--color-fill-info) 5%, transparent)",
    borderColor = "var(--color-border-info)",
    borderWidthInPixels = 1.5,
    borderRadiusInPercent = 3,
  } = config;
  const targetElementId = `${targetIdPrefix}-${field.id}`;
  const highlightElementId = `${targetIdPrefix}-preview-highlight`;

  const onFocus = () => {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
      console.warn(`Target element not found for ID: ${targetElementId}`);
      return;
    }

    // Remove any existing highlight
    const existingHighlight = document.getElementById(highlightElementId);
    existingHighlight?.remove();

    // Create and configure highlight element
    const highlight = createHighlightElement({
      id: highlightElementId,
      highlightColor,
      borderColor,
      borderWidthInPixels,
      borderRadiusInPercent,
    });

    targetElement.style.position = "relative";
    targetElement.appendChild(highlight);
  };

  const onBlur = () => {
    field.onBlur();
    const highlight = document.getElementById(highlightElementId);
    if (highlight) {
      highlight.remove();
    }
  };

  return {
    ...field,
    onFocus,
    onBlur,
  };
};
