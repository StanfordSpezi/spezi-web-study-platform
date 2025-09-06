//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stanfordspezi/spezi-web-design-system";
import { Trash } from "lucide-react";
import type { User } from "@/server/database/entities/user/schema";
import type { Invitation } from "../lib/useInvitationForm";

const roles: Array<{ label: string; value: User["role"] }> = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

interface InvitationRowProps {
  invitation: Invitation;
  index: number;
  invitationCount: number;
  update: (index: number, data: Partial<Invitation>) => void;
  remove: (index: number) => void;
}

export const InvitationRow = ({
  invitation,
  index,
  invitationCount,
  update,
  remove,
}: InvitationRowProps) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-1 gap-4">
        <Input
          type="email"
          required
          placeholder="Enter email"
          value={invitation.email}
          onChange={(event) => update(index, { email: event.target.value })}
        />
        <Select
          value={invitation.role}
          onValueChange={(value) =>
            update(index, { role: value as User["role"] })
          }
        >
          <SelectTrigger className="!w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {index > 0 ?
        <Button
          variant="ghost"
          size={null}
          onClick={() => remove(index)}
          className="size-10 rounded-md p-3"
        >
          <Trash className="text-text-tertiary opacity-80" />
        </Button>
      : invitationCount > 1 ?
        <div className="size-10" />
      : null}
    </div>
  );
};
