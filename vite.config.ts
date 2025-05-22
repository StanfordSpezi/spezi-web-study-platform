//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dedent } from "./src/utils/dedent";

export default defineConfig({
  root: ".",
  base: "/spezi-web-study-platform/", // This is necessary for GitHub Pages
  plugins: [
    TanStackRouterVite({
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
