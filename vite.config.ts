//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dedent } from "./src/utils/dedent";

export default defineConfig(({ mode }) => ({
  root: ".",
  base: "/spezi-web-study-platform/", // This is necessary for GitHub Pages
  plugins: [
    tanstackRouter({
      routeToken: "layout",
      routeFilePrefix: "~",
      routeTreeFileHeader: [
        dedent`
        //
        // This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
        //
        // SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
        //
        // SPDX-License-Identifier: MIT
        //
        `,
        "/* prettier-ignore-start */",
        "/* eslint-disable */",
        "// @ts-nocheck",
        "// noinspection JSUnusedGlobalSymbols",
      ],
    }),
    react(),
    tailwindcss(),
  ],
  esbuild: {
    drop: mode === "production" ? ["console"] : [],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
