//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type InferEncoded,
  type invitationConverter,
  type organizationConverter,
  type userConverter,
  type userMessageConverter,
} from "@stanfordbdhg/engagehf-models";

export type Organization = InferEncoded<typeof organizationConverter> & {
  id: string;
};

export type Invitation = InferEncoded<typeof invitationConverter>;

export type User = InferEncoded<typeof userConverter> & { id: string };

export type UserMessage = InferEncoded<typeof userMessageConverter> & {
  id: string;
};

export type LocalizedText = string | Record<string, string>;
