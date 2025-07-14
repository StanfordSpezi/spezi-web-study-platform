//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { lightTheme, type Theme } from "@stanfordspezi/spezi-web-design-system";

/**
 * By default, the SpeziProvider injects its theme variables as CSS variables into the
 * root of the document. Since these variables are injected at runtime, they have a higher
 * specificity than the ones that are injected by TailwindCSS. To ensure that the value given
 * to a theme variable in the `color.css` matches the value that can be retrieved through the
 * CSS variable (e.g. `var(--color-text)`), we need to unset the theme variables
 * in the SpeziProvider.
 */
export const unsetSpeziProviderTheme = () => {
  const themeKeys = Object.keys(lightTheme);
  return Object.fromEntries(themeKeys.map((key) => [key, ""])) as Theme;
};
