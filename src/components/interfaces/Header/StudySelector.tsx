//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useParams } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/DropdownMenu";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";

const studies = [
  {
    id: "activity-study",
    title: "Activity Study",
    shortTitle: "Activity",
    explanation: "This is a study about activity.",
    shortExplanation: "Study about activity.",
    participationCriteria: "Must be over 18 years old.",
  },
  {
    id: "health-study",
    title: "Health Study",
    shortTitle: "Health",
    explanation: "This is a study about health.",
    shortExplanation: "Study about health.",
    participationCriteria: null,
  },
  {
    id: "brain-study",
    title: "Brain Study",
    shortTitle: "Brain",
    explanation: "This is a study about the brain.",
    shortExplanation: "Study about the brain.",
    participationCriteria: null,
  },
  {
    id: "dna-study",
    title: "DNA Study",
    shortTitle: "DNA",
    explanation: "This is a study about DNA.",
    shortExplanation: "Study about DNA.",
    participationCriteria: null,
  },
];

export const StudySelector = () => {
  const { team, study } = useParams({ from: "/(dashboard)/$team/$study" });
  const selectedStudy = studies.find((s) => s.id === study);

  // if (!studies) {
  //   return <HeaderSelectorSkeleton hasIcon={false} />
  // }

  return (
    <HeaderSelector
      selectedItem={{
        title: selectedStudy?.title ?? studies[0].title,
      }}
    >
      <HeaderSelectorMenuLabel>Studies</HeaderSelectorMenuLabel>
      {studies.map((study) => (
        <HeaderSelectorMenuItem
          key={study.id}
          linkOptions={{
            to: "/$team/$study",
            params: {
              team,
              study: study.id,
            },
          }}
        >
          {study.title}
        </HeaderSelectorMenuItem>
      ))}
      <DropdownMenuSeparator />
      <HeaderSelectorMenuItem icon={Plus} linkOptions={{ to: "." }}>
        Add Study
      </HeaderSelectorMenuItem>
    </HeaderSelector>
  );
};
