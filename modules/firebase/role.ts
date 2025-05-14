//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type UserType } from "@stanfordbdhg/engagehf-models";
import { upperFirst } from "@stanfordspezi/spezi-web-design-system/utils/misc";

export const stringifyType = (type: UserType) => upperFirst(type);
