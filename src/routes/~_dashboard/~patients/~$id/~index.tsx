//
// This source file is part of the Stanford Biodesign Digital Health ENGAGE-HF open-source project
//
// SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { updateDoc } from "@firebase/firestore";
import { UserType } from "@stanfordbdhg/engagehf-models";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@stanfordspezi/spezi-web-design-system/components/Tabs";
import { toast } from "@stanfordspezi/spezi-web-design-system/components/Toaster";
import { getUserName } from "@stanfordspezi/spezi-web-design-system/modules/auth";
import { PageTitle } from "@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { Contact } from "lucide-react";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { NotFound } from "@/components/NotFound";
import { callables, docRefs } from "@/modules/firebase/app";
import { getDocDataOrThrow } from "@/modules/firebase/utils";
import { routes } from "@/modules/routes";
import { getUserData, parseUserId } from "@/modules/user/queries";
import {
  PatientForm,
  type PatientFormSchema,
} from "@/routes/~_dashboard/~patients/PatientForm";
import {
  getFormProps,
  getPatientInfo,
} from "@/routes/~_dashboard/~patients/utils";
import { Notifications } from "@/routes/~_dashboard/~patients/~$id/Notifications";
import { PatientInfo } from "@/routes/~_dashboard/~patients/~$id/PatientInfo";
import { DashboardLayout } from "../../DashboardLayout";

export enum PatientPageTab {
  information = "information",
  notifications = "notifications",
}

const PatientPage = () => {
  const router = useRouter();
  const { tab } = Route.useSearch();
  const { userId, formProps, user, authUser, resourceType, info } =
    Route.useLoaderData();

  const updatePatient = async (form: PatientFormSchema) => {
    const clinician = await getDocDataOrThrow(docRefs.user(form.clinician));
    const authData = {
      displayName: form.displayName,
    };
    const userData = {
      clinician: form.clinician,
      organization: clinician.organization,
      dateOfBirth: form.dateOfBirth?.toISOString() ?? null,
      providerName: form.providerName,
    };
    if (resourceType === "user") {
      await callables.updateUserInformation({
        userId,
        data: {
          auth: authData,
        },
      });
      await updateDoc(docRefs.user(userId), userData);
    } else {
      const invitation = await getDocDataOrThrow(docRefs.invitation(userId));
      await updateDoc(docRefs.invitation(userId), {
        auth: {
          ...invitation.auth,
          ...authData,
        },
        user: {
          ...invitation.user,
          ...userData,
        },
      });
    }
    toast.success("Patient has been successfully updated!");
    void router.invalidate();
  };

  const userName = getUserName(authUser) ?? "";

  return (
    <DashboardLayout
      title={
        <PageTitle
          title="Edit patient"
          subTitle={userName}
          icon={<Contact />}
        />
      }
    >
      <Helmet>
        <title>Edit {userName}</title>
      </Helmet>
      <Tabs defaultValue={tab ?? PatientPageTab.information}>
        <TabsList className="mb-6" grow>
          <TabsTrigger value={PatientPageTab.information}>
            Information
          </TabsTrigger>
          <TabsTrigger value={PatientPageTab.notifications}>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value={PatientPageTab.information}>
          <div className="flex flex-col gap-6 xl:flex-row">
            <PatientInfo info={info} />
            <PatientForm
              user={user}
              userInfo={authUser}
              onSubmit={updatePatient}
              {...formProps}
            />
          </div>
        </TabsContent>
        <TabsContent value={PatientPageTab.notifications}>
          <Notifications userId={userId} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_dashboard/patients/$id/")({
  component: PatientPage,
  validateSearch: z.object({
    tab: z.nativeEnum(PatientPageTab).optional().catch(undefined),
  }),
  notFoundComponent: () => (
    <NotFound
      entityName="patient"
      backPage={{ name: "patients list", href: routes.patients.index }}
    />
  ),
  loader: async ({ params }) => {
    const { userId, resourceType } = parseUserId(params.id);
    const userData = await getUserData(userId, resourceType, [
      UserType.patient,
    ]);
    if (!userData) throw notFound();
    const { user, authUser } = userData;

    return {
      user,
      userId,
      authUser,
      resourceType,
      formProps: await getFormProps(),
      info: getPatientInfo(userData),
    };
  },
});
