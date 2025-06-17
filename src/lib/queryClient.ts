//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { QueryClient } from "@tanstack/react-query";

/*
 We are only exposing the query client and query options to the rest of the app, instead of providing
 reusable hooks like useStudyListQuery or only query keys like ["study", "list"].
 Passing reusable query options lets us define a query’s key, function, and config in one place,
 so we can use the same options for useQuery, prefetchQuery, or invalidateQueries.
 This ensures cache keys and logic always match, reduces bugs, and makes refactoring easier.
*/
export const queryClient = new QueryClient();
