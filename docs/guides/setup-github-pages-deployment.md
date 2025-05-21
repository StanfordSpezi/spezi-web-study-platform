<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Setup GitHub Pages deployment

This guide helps you configure automated GitHub Pages deployment for your fork of the project.

## Prerequisites

Ensure the GitHub Actions workflow exists in your repository at `.github/workflows/deploy-to-pages.yml`. If it doesn't exist, copy it from the [main repository](https://github.com/StanfordSpezi/spezi-web-study-platform/blob/main/.github/workflows/deploy-to-pages.yml).

## 1. Enable GitHub Actions

1. Go to your repository's "Settings" tab
2. Select "Actions" > "General" in the sidebar
3. Under "Actions permissions", select "Allow all actions and reusable workflows"
4. Click "Save"

## 2. Configure GitHub Pages

1. Go to your repository's "Settings" tab
2. Select "Pages" in the sidebar
3. Under "Build and deployment", select "GitHub Actions" as the source
4. Verify that you see "Your site is ready to be published by GitHub Pages"

## 3. Verify deployment

The deployment workflow will run automatically when you push to the main branch. To check its status:

1. Go to the "Actions" tab
2. Look for the "Deploy static content to Pages" workflow
3. Click on any workflow run to see detailed logs

## 4. View your deployed site

Once the deployment is successful:

1. Go to your repository's "Settings" tab
2. Navigate to "Pages" in the sidebar
3. Find your site URL under "Your site is live at"

Your app should now be available at: `https://<USERNAME>.github.io/spezi-web-study-platform/`.

## Troubleshooting

- If the workflow doesn't appear, ensure you've enabled GitHub Actions
- For permission errors, check repository settings under "Actions" > "General"
- For workflow errors, inspect the detailed logs in the Actions tab

For more information about GitHub Pages, see the [GitHub Pages documentation](https://docs.github.com/en/pages).
