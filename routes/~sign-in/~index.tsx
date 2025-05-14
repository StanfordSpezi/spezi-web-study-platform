//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { SignInForm as AuthSignInForm } from "@stanfordspezi/spezi-web-design-system/modules/auth";
import { createFileRoute } from "@tanstack/react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet";
import { AsideLayout } from "@/components/AsideLayout";
import { env } from "@/env";
import { auth, authProvider } from "@/modules/firebase/app";
import stanfordLogoImg from "./stanfordLogo.png";

const SignIn = () => (
  <AsideLayout>
    <Helmet>
      <title>Sign In</title>
    </Helmet>
    <AuthSignInForm
      className="mx-auto w-[350px]"
      providers={[
        {
          name: "Stanford",
          provider: authProvider.stanford,
          icon: (
            <img
              src={stanfordLogoImg}
              alt="Stanford University logo"
              className="w-[22px]"
            />
          ),
        },
      ]}
      enableEmailPassword={env.VITE_PUBLIC_EMAIL_PASSWORD_SIGN_IN}
      auth={auth}
      buttonSize="lg"
      signInWithPopup={signInWithPopup}
      signInWithEmailAndPassword={signInWithEmailAndPassword}
    />
  </AsideLayout>
);

export const Route = createFileRoute("/sign-in/")({
  component: SignIn,
});
