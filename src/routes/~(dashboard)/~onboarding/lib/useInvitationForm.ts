//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useRef, useState } from "react";
import type { User } from "@/server/database/entities/user/schema";

export interface Invitation {
  email: string;
  role: User["role"];
}

const defaultInvitation: Invitation = { email: "", role: "user" };

interface UseInvitationFormParams {
  onSubmit: (invitations: Invitation[]) => void | Promise<void>;
}

/**
 * Hook for managing an invitation form with dynamic list of invitations.
 */
export const useInvitationForm = ({ onSubmit }: UseInvitationFormParams) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([
    defaultInvitation,
  ]);

  const add = () => {
    setInvitations((prev) => [...prev, defaultInvitation]);
  };

  const update = (index: number, data: Partial<Invitation>) => {
    setInvitations((prev) =>
      prev.map((invitation, i) =>
        i === index ? { ...invitation, ...data } : invitation,
      ),
    );
  };

  const remove = (index: number) => {
    setInvitations((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async () => {
    const isValid = formRef.current?.reportValidity();
    if (!isValid) return;
    await onSubmit(invitations);
  };

  return {
    formRef,
    invitations,
    add,
    update,
    remove,
    submit,
  };
};
