#!/bin/bash

#
# This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

set -e

CONTENT=$(curl --fail http://localhost)
echo "$CONTENT" | grep "Spezi Web Template Application"

echo "✅ Test Passed!"
