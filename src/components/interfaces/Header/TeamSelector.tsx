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
import { DropdownMenuSeparator } from "@/components/ui/DropdownMenu";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";
// import { DropdownSelectorSkeleton } from "./DropdownSelectorSkeleton";

const iconMap: Record<string, LucideIcon> = {
  TreePine: TreePine,
  TentTree: TentTree,
  TreePalm: TreePalm,
  Flower: Flower,
  Mountain: Mountain,
};

const teams = [
  {
    id: "team-pine",
    name: "Team Pine",
    icon: "TreePine",
  },
  {
    id: "team-tree",
    name: "Team Tree",
    icon: "TentTree",
  },
  {
    id: "team-palm",
    name: "Team Palm",
    icon: "TreePalm",
  },
  {
    id: "team-flower",
    name: "Team Flower",
    icon: "Flower",
  },
  {
    id: "team-mountain",
    name: "Team Mountain",
    icon: "Mountain",
  },
];

export const TeamSelector = () => {
  const { team } = useParams({ from: "/(dashboard)/$team/$study" });
  const selectedTeam = teams.find((t) => t.id === team);

  //   if (!teams) {
  //     return <HeaderSelectorSkeleton hasIcon={true} />;
  //   }

  return (
    <HeaderSelector
      selectedItem={{
        title: selectedTeam?.name ?? teams[0].name,
        icon: iconMap[selectedTeam?.icon ?? teams[0].icon] ?? TreePine,
      }}
    >
      <HeaderSelectorMenuLabel>Teams</HeaderSelectorMenuLabel>
      {teams.map((team) => (
        <HeaderSelectorMenuItem
          key={team.id}
          icon={iconMap[team.icon] ?? TreePine}
          linkOptions={{
            to: "/$team/$study",
            params: {
              team: team.id,
              study: "activity-study", // Todo: This should be dynamic based on the selected team
            },
          }}
        >
          {team.name}
        </HeaderSelectorMenuItem>
      ))}
      <DropdownMenuSeparator />
      <HeaderSelectorMenuItem icon={Plus} linkOptions={{ to: "." }}>
        <span className="text-muted-foreground">Add Team</span>
      </HeaderSelectorMenuItem>
    </HeaderSelector>
  );
};
