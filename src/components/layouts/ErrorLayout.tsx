//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { ErrorState } from "@stanfordspezi/spezi-web-design-system";

interface ErrorLayoutProps {
  error: Error;
}

export const ErrorLayout = ({ error }: ErrorLayoutProps) => {
  return (
    <div className="flex-center size-full">
      <ErrorState>
        Unhandled error happened. Please try again later.
        <br />
        Message: {error.message}
      </ErrorState>
    </div>
  );
};
