//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Functions, httpsCallable } from "@firebase/functions";
import {
  type CreateInvitationInput,
  type CreateInvitationOutput,
  type DeleteUserInput,
  type DeleteUserOutput,
  type DisableUserInput,
  type DisableUserOutput,
  type DismissMessageInput,
  type DismissMessageOutput,
  type DismissMessagesInput,
  type DismissMessagesOutput,
  type EnableUserInput,
  type EnableUserOutput,
  type GetUsersInformationInput,
  type GetUsersInformationOutput,
  type UpdateUserInformationInput,
  type UpdateUserInformationOutput,
} from "@stanfordbdhg/engagehf-models";
import {
  collection,
  type CollectionReference,
  doc,
  type DocumentReference,
  type Firestore,
  getDoc,
  getDocs,
  type Query,
} from "firebase/firestore";
import {
  type Invitation,
  type Organization,
  type User,
  type UserMessage,
} from "@/modules/firebase/models";

export const collectionNames = {
  invitations: "invitations",
  users: "users",
  organizations: "organizations",
  messages: "messages",
};

export type ResourceType = "invitation" | "user";

export const getCollectionRefs = (db: Firestore) => ({
  users: () =>
    collection(db, collectionNames.users) as CollectionReference<User>,
  invitations: () =>
    collection(
      db,
      collectionNames.invitations,
    ) as CollectionReference<Invitation>,
  organizations: () =>
    collection(
      db,
      collectionNames.organizations,
    ) as CollectionReference<Organization>,
  userMessages: ({ userId }: { userId: string }) =>
    collection(
      db,
      `/${collectionNames.users}/${userId}/${collectionNames.messages}`,
    ) as CollectionReference<UserMessage>,
});

export const getDocumentsRefs = (db: Firestore) => ({
  user: (...segments: string[]) =>
    doc(db, collectionNames.users, ...segments) as DocumentReference<
      User,
      User
    >,
  invitation: (...segments: string[]) =>
    doc(db, collectionNames.invitations, ...segments) as DocumentReference<
      Invitation,
      Invitation
    >,
  organization: (...segments: string[]) =>
    doc(
      db,
      collectionNames.organizations,
      ...segments,
    ) as DocumentReference<Organization>,
});

export interface UserAuthenticationInformation {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

export const getCallables = (functions: Functions) => ({
  createInvitation: httpsCallable<
    CreateInvitationInput,
    CreateInvitationOutput
  >(functions, "createInvitation"),
  getUsersInformation: httpsCallable<
    GetUsersInformationInput,
    GetUsersInformationOutput
  >(functions, "getUsersInformation"),
  deleteUser: httpsCallable<DeleteUserInput, DeleteUserOutput>(
    functions,
    "deleteUser",
  ),
  updateUserInformation: httpsCallable<
    UpdateUserInformationInput,
    UpdateUserInformationOutput
  >(functions, "updateUserInformation"),
  dismissMessage: httpsCallable<DismissMessageInput, DismissMessageOutput>(
    functions,
    "dismissMessage",
  ),
  dismissMessages: httpsCallable<DismissMessagesInput, DismissMessagesOutput>(
    functions,
    "dismissMessages",
  ),
  disableUser: httpsCallable<DisableUserInput, DisableUserOutput>(
    functions,
    "disableUser",
  ),
  enableUser: httpsCallable<EnableUserInput, EnableUserOutput>(
    functions,
    "enableUser",
  ),
});

export const getDocData = async <T>(reference: DocumentReference<T>) => {
  const doc = await getDoc(reference);
  const data = doc.data();
  return data ?
      {
        ...data,
        id: doc.id,
      }
    : undefined;
};

export const getDocDataOrThrow = async <T>(reference: DocumentReference<T>) => {
  const data = await getDocData(reference);
  if (!data) {
    throw new Error(`Doc not found: ${reference.path}`);
  }
  return data;
};

export const getDocsData = async <T>(query: Query<T>) => {
  const docs = await getDocs(query);
  return docs.docs.map((doc) => {
    const data = doc.data();
    if (!data) throw new Error(`No data for ${doc.id} ${doc.ref.path}`);
    return {
      ...data,
      id: doc.id,
    };
  });
};
