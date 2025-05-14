//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { UserType } from "@stanfordbdhg/engagehf-models";
import { query, where } from "firebase/firestore";
import { collectionRefs, getCurrentUser } from "@/modules/firebase/app";
import { mapAuthData } from "@/modules/firebase/user";
import { getDocsData } from "@/modules/firebase/utils";
import { queryClient } from "@/modules/query/queryClient";
import {
  type UserData,
  userOrganizationQueryOptions,
} from "@/modules/user/queries";

const getUserClinicians = async () => {
  const { user } = await getCurrentUser();
  let usersQuery = query(
    collectionRefs.users(),
    where("type", "in", [UserType.clinician, UserType.owner]),
  );
  if (user.type === UserType.owner || user.type === UserType.clinician) {
    usersQuery = query(
      usersQuery,
      where("organization", "==", user.organization),
    );
  }
  const users = await getDocsData(usersQuery);
  return mapAuthData(
    { userIds: users.map((user) => user.id) },
    ({ auth }, id) => ({
      id,
      displayName: auth.displayName,
      email: auth.email,
    }),
  );
};

export const getFormProps = async () => ({
  clinicians: await getUserClinicians(),
  organizations: await queryClient.ensureQueryData(
    userOrganizationQueryOptions(),
  ),
});

export const getPatientInfo = ({ user, resourceType, authUser }: UserData) => ({
  email: authUser.email,
  lastActiveDate: user.lastActiveDate,
  invitationCode: user.invitationCode,
  isInvitation: resourceType === "invitation",
});

export type PatientInfo = Awaited<ReturnType<typeof getPatientInfo>>;
