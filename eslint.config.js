//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import pkg from "@stanfordspezi/spezi-web-configurations";

const defaultConfig = pkg.getEslintConfig({
  tsconfigRootDir: import.meta.dirname,
});
const config = [
  ...defaultConfig,
  // This is necessary to make sure that the import.meta.dirname is available in the config
  // See https://github.com/eslint/eslint/discussions/16037
  { languageOptions: { ecmaVersion: "latest", sourceType: "module" } },
];

export default config;
