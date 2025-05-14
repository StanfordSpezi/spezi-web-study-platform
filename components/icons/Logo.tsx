//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type PartialSome } from "@stanfordspezi/spezi-web-design-system";
import type { ComponentProps } from "react";

type LogoProps = PartialSome<ComponentProps<"img">, "src">;

export const Logo = (props: LogoProps) => (
  <img src="/spezi.png" alt="Spezi logo" {...props} />
);
