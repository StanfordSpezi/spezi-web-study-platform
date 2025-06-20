//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ErrorRoute = () => {
  const { message } = Route.useSearch();
  return (
    <div className="flex-center size-full flex-col">
      <h1 className="text-text">Error</h1>
      <p>{message}</p>
    </div>
  );
};

export const Route = createFileRoute("/error")({
  component: ErrorRoute,
  validateSearch: z.object({
    message: z.string().optional().catch("An unexpected error occurred"),
  }),
});
