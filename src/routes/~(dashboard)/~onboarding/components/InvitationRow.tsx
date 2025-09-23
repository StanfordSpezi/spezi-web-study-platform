//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Button,
  Field,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stanfordspezi/spezi-web-design-system";
import { Trash } from "lucide-react";
import type { useInvitationForm } from "../lib/useInvitationForm";

interface InvitationRowProps {
  index: number;
  form: ReturnType<typeof useInvitationForm>["form"];
}

export const InvitationRow = ({ index, form }: InvitationRowProps) => {
  const formValues = form.getValues();

  const removeInvitation = () => {
    const invitations = form.getValues("invitations");
    invitations.splice(index, 1);
    form.setValue("invitations", invitations);
  };
  return (
    <li className="flex gap-2">
      <div className="flex flex-1 gap-4">
        <Field
          control={form.control}
          name={`invitations.${index}.email`}
          className="flex-1"
          render={({ field }) => (
            <Input type="email" placeholder="Enter email" {...field} />
          )}
        />
        <Field
          control={form.control}
          name={`invitations.${index}.role`}
          render={({ field: { onChange, ...field } }) => (
            <Select onValueChange={onChange} {...field}>
              <SelectTrigger className="!w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {index > 0 ?
        <Button
          variant="ghost"
          size={null}
          onClick={removeInvitation}
          className="size-10 rounded-md p-3"
        >
          <Trash className="text-text-tertiary opacity-80" />
        </Button>
      : formValues.invitations.length > 1 ?
        <div className="size-10" />
      : null}
    </li>
  );
};
