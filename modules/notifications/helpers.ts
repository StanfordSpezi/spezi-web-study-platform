//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type UserMessage } from "@/modules/firebase/models";

export const isMessageRead = (message: UserMessage) => !!message.completionDate;

export const filterUnreadNotifications = (messages: UserMessage[]) =>
  messages.filter((notification) => !isMessageRead(notification));

export const parseMessageToLink = (): string | null => null;

export const getNotificationPatientId = (message: UserMessage) => {
  const action = message.action;
  if (!action) return null;
  const actionParts = action.split("/");
  if (actionParts.at(0) === "users") {
    return actionParts.at(1);
  }
  return null;
};
