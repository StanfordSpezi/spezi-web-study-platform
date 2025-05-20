<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Contribute to the repo

This guide helps you contribute changes to the Stanford Biodesign Digital Health Spezi Web Study Platform frontend.

## 1. Create an issue

Open a new issue in the [GitHub repository](https://github.com/StanfordSpezi/spezi-web-study-platform/issues) describing the bug, feature, or improvement you want to address.

## 2. Create a branch from the issue

Fetch the latest changes:

```bash
git fetch origin
git checkout main
git pull
```

Create a new branch using the issue number and a short description. For example, if the issue number is 42 and the description is "fix typo in README", name your branch `42-fix-typo-in-readme`:

```bash
git checkout -b <number>-<short-description>
```

## 3. Make your changes

- Use Node.js version 22 (`nvm use 22`).
- Install dependencies if needed: `npm install`.
- Make your changes in the appropriate files.
- Follow the project’s code style and conventions.
- Add or update tests if relevant.

## 4. Commit your changes

```bash
git add .
git commit -m "<short-description>"
```

## 5. Push your branch

```bash
git push origin <your-branch-name>
```

## 6. Create a pull request

- Go to the repository on GitHub.
- Open a pull request from your branch to the `main` branch.
- Name your pull request like this: `Closes #<issue-number>: <short-description>`. For example, `Closes #42: Fix typo in README`.
- Fill out the pull request template and describe your changes.
- Add the appropriate labels and reviewers.

## 7. Address feedback

- Respond to code review comments.
- Make any requested changes and push updates to your branch.

## 8. Squash and merge

After approval, squash and merge your pull request using the GitHub UI. The branch will be merged into the `main` branch, the issue will be closed automatically and the branch will be deleted.
