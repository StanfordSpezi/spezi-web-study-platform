//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Dialog,
  DropdownMenuSeparator,
  useOpenState,
} from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import type { IconName } from "lucide-react/dynamic";
import { teamListQueryOptions } from "@/lib/queries/team";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";
import { HeaderSelectorSkeleton } from "./HeaderSelectorSkeleton";
import { NewTeamDialogContent } from "../NewTeamDialog";

export const TeamSelector = () => {
  const params = useParams({ strict: false });
  const { data: teams } = useQuery(teamListQueryOptions());
  const selectedTeam = teams?.find((team) => team.id === params.team);

  const navigate = useNavigate();
  const newTeamDialog = useOpenState();

  if (!params.team) {
    return null;
  }

  if (!teams || !selectedTeam) {
    return <HeaderSelectorSkeleton hasIcon={true} />;
  }

  return (
    <>
      <HeaderSelector
        selectedItem={{
          title: selectedTeam.name,
          icon: selectedTeam.icon as IconName,
        }}
      >
        <HeaderSelectorMenuLabel>Teams</HeaderSelectorMenuLabel>
        {teams.map((team) => (
          <HeaderSelectorMenuItem
            key={team.id}
            icon={team.icon as IconName}
            linkOptions={{
              to: "/$team",
              params: {
                team: team.id,
              },
            }}
          >
            {team.name}
          </HeaderSelectorMenuItem>
        ))}
        <DropdownMenuSeparator />
        <HeaderSelectorMenuItem
          icon="plus"
          onSelect={newTeamDialog.open}
          className="text-text-tertiary"
        >
          Add team
        </HeaderSelectorMenuItem>
      </HeaderSelector>
      <Dialog
        open={newTeamDialog.isOpen}
        onOpenChange={newTeamDialog.setIsOpen}
      >
        <NewTeamDialogContent
          onSuccess={async (newTeam) => {
            await navigate({ to: "/$team", params: { team: newTeam.id } });
            newTeamDialog.close();
          }}
        />
      </Dialog>
    </>
  );
};
