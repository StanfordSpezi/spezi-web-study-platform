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
import { useParams } from "@tanstack/react-router";
import { studyListQueryOptions } from "@/lib/queries/study";
import {
  HeaderSelector,
  HeaderSelectorMenuItem,
  HeaderSelectorMenuLabel,
} from "./HeaderSelector";
import { HeaderSelectorSkeleton } from "./HeaderSelectorSkeleton";
import { NewStudyDialogContent } from "../NewStudyDialog";

export const StudySelector = () => {
  const params = useParams({ strict: false });
  const { data: studies } = useQuery(
    studyListQueryOptions({ team_id: params.team }),
  );
  const selectedStudy = studies?.find((study) => study.id === params.study);

  const newStudyDialog = useOpenState();

  if (!params.study || !params.team) {
    return null;
  }

  if (!studies || !selectedStudy) {
    return <HeaderSelectorSkeleton hasIcon={false} />;
  }

  return (
    <>
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
          className="text-text-tertiary"
          onSelect={newStudyDialog.open}
        >
          Add study
        </HeaderSelectorMenuItem>
      </HeaderSelector>
      <Dialog
        open={newStudyDialog.isOpen}
        onOpenChange={newStudyDialog.setIsOpen}
      >
        <NewStudyDialogContent
          teamId={params.team}
          onSuccess={newStudyDialog.close}
        />
      </Dialog>
    </>
  );
};
