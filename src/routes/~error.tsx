//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createFileRoute } from "@tanstack/react-router";

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
  validateSearch: (search) => {
    return {
      message:
        search.message && typeof search.message === "string" ?
          search.message
        : "An unexpected error occurred",
    };
  },
});
