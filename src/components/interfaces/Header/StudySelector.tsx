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
import { studyListQueryOptions } from "@/lib/queries/study";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";
import { HeaderSelectorSkeleton } from "./HeaderSelectorSkeleton";

export const StudySelector = () => {
  const params = useParams({ strict: false });
  const { data: studies } = useQuery(
    studyListQueryOptions({ team_id: params.team }),
  );
  const selectedStudy = studies?.find((study) => study.id === params.study);

  if (!params.study) {
    return null;
  }

  if (!studies || !selectedStudy) {
    return <HeaderSelectorSkeleton hasIcon={false} />;
  }

  return (
    <HeaderSelector selectedItem={{ title: selectedStudy.title }}>
      <HeaderSelectorMenuLabel>Studies</HeaderSelectorMenuLabel>
      {studies.map((study) => (
        <HeaderSelectorMenuItem
          key={study.id}
          linkOptions={{
            to: "/$team/$study",
            params: {
              team: study.teamId,
              study: study.id,
            },
          }}
        >
          {study.title}
        </HeaderSelectorMenuItem>
      ))}
      <DropdownMenuSeparator />
      <HeaderSelectorMenuItem
        icon="plus"
        linkOptions={{ to: "." }}
        className="text-text-tertiary"
      >
        Add Study
      </HeaderSelectorMenuItem>
    </HeaderSelector>
  );
};
