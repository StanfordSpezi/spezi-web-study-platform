//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type AsideBrandLayoutProps,
  AsideBrandLayout,
} from "@stanfordspezi/spezi-web-design-system/molecules/AsideBrandLayout";
import { Logo } from "@/components/icons/Logo";
import { LogoType } from "@/components/icons/LogoType";

export const AsideLayout = (props: Omit<AsideBrandLayoutProps, "aside">) => (
  <AsideBrandLayout
    aside={
      <>
        <div className="flex-center gap-6">
          <Logo className="size-10 text-white" />
          <LogoType className="h-auto w-18" />
        </div>
        <img
          src="/stanfordbiodesign.png"
          alt="Stanford Biodesign Logo"
          className="h-[193px]"
        />
      </>
    }
    {...props}
  />
);
