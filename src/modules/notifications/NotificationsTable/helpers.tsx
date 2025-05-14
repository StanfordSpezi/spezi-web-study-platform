//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type UserMessage } from "@/modules/firebase/models";
import { createColumnHelper } from "@tanstack/table-core";

export const columnHelper = createColumnHelper<UserMessage>();

export const columnIds = {
  isRead: "isRead",
};
