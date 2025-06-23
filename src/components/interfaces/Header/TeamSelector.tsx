//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { DropdownMenuSeparator } from "@stanfordspezi/spezi-web-design-system";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  Flower,
  Mountain,
  Plus,
  TentTree,
  TreePalm,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import { teamListQueryOptions } from "@/lib/queries/team";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";
import { HeaderSelectorSkeleton } from "./HeaderSelectorSkeleton";

const iconMap: Record<string, LucideIcon> = {
  TreePine: TreePine,
  TentTree: TentTree,
  TreePalm: TreePalm,
  Flower: Flower,
  Mountain: Mountain,
};

export const TeamSelector = () => {
  const params = useParams({ from: "/(dashboard)/$team/$study" });
  const { data: teams } = useQuery(teamListQueryOptions());
  const selectedTeam = teams?.find((team) => team.id === params.team);

  if (!teams || !selectedTeam) {
    return <HeaderSelectorSkeleton hasIcon={true} />;
  }

  return (
    <HeaderSelector
      selectedItem={{
        title: selectedTeam.name,
        icon: iconMap[selectedTeam.icon] ?? TreePine,
      }}
    >
      <HeaderSelectorMenuLabel>Teams</HeaderSelectorMenuLabel>
      {teams.map((team) => (
        <HeaderSelectorMenuItem
          key={team.id}
          icon={iconMap[team.icon] ?? TreePine}
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
        icon={Plus}
        linkOptions={{ to: "." }}
        className="text-text-tertiary"
      >
        Add Team
      </HeaderSelectorMenuItem>
    </HeaderSelector>
  );
};
