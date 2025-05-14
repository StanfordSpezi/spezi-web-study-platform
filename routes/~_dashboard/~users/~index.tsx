//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { UserType } from "@stanfordbdhg/engagehf-models";
import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { createFileRoute, Link } from "@tanstack/react-router";
import { query, where } from "firebase/firestore";
import { UserPlus, Users } from "lucide-react";
import { Helmet } from "react-helmet";
import {
  ensureType,
  getCurrentUser,
  collectionRefs,
} from "@/modules/firebase/app";
import { mapAuthData } from "@/modules/firebase/user";
import { getDocsData } from "@/modules/firebase/utils";
import { routes } from "@/modules/routes";
import {
  getUserOrganizationsMap,
  parseAuthToUser,
  parseInvitationToUser,
} from "@/modules/user/queries";
import { UsersTable } from "./UsersTable";
import { DashboardLayout } from "../DashboardLayout";

const getAdminData = () => ({
  usersQuery: collectionRefs.users(),
  invitationsQuery: collectionRefs.invitations(),
});

const getOwnerData = async () => {
  const { user } = await getCurrentUser();

  if (!user.organization) throw new Error("User without organization");
  return {
    usersQuery: query(
      collectionRefs.users(),
      where("organization", "==", user.organization),
    ),
    invitationsQuery: query(
      collectionRefs.invitations(),
      where("user.organization", "==", user.organization),
    ),
  };
};

const listUsers = async () => {
  const { user } = await getCurrentUser();
  const { usersQuery, invitationsQuery } =
    user.type === UserType.admin ? getAdminData() : await getOwnerData();

  const organizationMap = await getUserOrganizationsMap();
  const invitations = await getDocsData(
    query(invitationsQuery, where("user.type", "!=", UserType.patient)),
  );
  const usersData = await getDocsData(
    query(usersQuery, where("type", "!=", UserType.patient)),
  );
  const userIds = usersData.map((user) => user.id);

  const users = await mapAuthData(
    { userIds, includeUserData: true },
    ({ auth, user }, id) => ({
      ...parseAuthToUser(id, auth),
      disabled: user?.disabled,
      organization: organizationMap.get(user?.organization ?? ""),
      type: user?.type,
    }),
  );

  const invitedUsers = invitations.map((invitation) =>
    parseInvitationToUser(invitation, organizationMap),
  );

  return [...invitedUsers, ...users];
};

export type User = Awaited<ReturnType<typeof listUsers>>[number];

const UsersPage = () => {
  const users = Route.useLoaderData();

  return (
    <DashboardLayout
      actions={
        <Button asChild>
          <Link to={routes.users.invite}>
            <UserPlus />
            Invite User
          </Link>
        </Button>
      }
      title={<PageTitle title="Users" icon={<Users />} />}
    >
      <Helmet>
        <title>Users</title>
      </Helmet>
      <UsersTable data={users} />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/users/")({
  component: UsersPage,
  loader: () => listUsers(),
  beforeLoad: () => ensureType([UserType.admin, UserType.owner]),
});
