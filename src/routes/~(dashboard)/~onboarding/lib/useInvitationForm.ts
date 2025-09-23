//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useForm } from "@stanfordspezi/spezi-web-design-system";
import { z } from "zod";
import type { User } from "@/server/database/entities/user/schema";

export interface Invitation {
  email: string;
  role: User["role"];
}

const defaultInvitation: Invitation = { email: "", role: "user" };

/**
 * Hook for managing an invitation form with dynamic list of invitations.
 */
export const useInvitationForm = () => {
  const form = useForm({
    formSchema: z.object({
      invitations: z.array(
        z.object({ email: z.email(), role: z.enum(["user", "admin"]) }),
      ),
    }),
    defaultValues: { invitations: [defaultInvitation] },
  });

  return { form, defaultInvitation };
};
