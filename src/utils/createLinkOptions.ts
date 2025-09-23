//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type {
  RegisteredRouter,
  ValidateLinkOptions,
} from "@tanstack/react-router";

/**
 * Creates link options by validating and returning the provided options.
 * This utility function ensures type safety for router link configurations.
 */
export const createLinkOptions = <
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
>(
  options: ValidateLinkOptions<TRouter, TOptions>,
) => options;
