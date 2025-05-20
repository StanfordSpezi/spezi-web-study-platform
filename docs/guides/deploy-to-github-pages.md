<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Deploy to GitHub Pages

This guide helps you deploy the frontend to GitHub Pages using the pre-configured automated deployment workflow.

## 1. Configure GitHub Pages

1. Go to your repository's "Settings" tab
2. In the "Code and automation" section, click "Pages"
3. Under "Build and deployment", select "GitHub Actions" as the source

## 2. Prepare your code

Build your code locally to check for errors:

```bash
npm run build
```

Fix any build errors before proceeding.

## 3. Push your changes

The project is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## 4. Monitor the deployment

1. Go to your repository on GitHub
2. Click the "Actions" tab
3. Look for the "Deploy static content to Pages" workflow
4. Wait for the workflow to complete

## 5. View your deployed site

Once the deployment is successful:

1. Go to your repository's "Settings" tab
2. Navigate to "Pages" in the sidebar
3. Find your site URL under "Your site is live at"

Your app should now be available at: `https://<USERNAME>.github.io/spezi-web-study-platform/`

## Troubleshooting

- If the deployment fails, check the Actions tab for error messages
- Verify that all required GitHub Pages permissions are enabled
- Check that the repository's visibility settings allow GitHub Pages

For more deployment options, see the [Vite deployment guide](https://vite.dev/guide/static-deploy).
