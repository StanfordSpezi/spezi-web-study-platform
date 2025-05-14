//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  Card,
  CardHeader,
  CardTitle,
} from "@stanfordspezi/spezi-web-design-system/components/Card";

export const TemplateCard = () => (
  <Card className="pb-4">
    <CardHeader>
      <CardTitle>Template dashboard</CardTitle>
    </CardHeader>
    <div className="px-5">
      <p>
        Welcome to your dashboard! Here you can view your recent notifications
        and manage your application. This card provides a quick overview of your
        dashboard's main features and functionality.
        <br />
        <br />
        Please refer to README.
      </p>
    </div>
  </Card>
);
