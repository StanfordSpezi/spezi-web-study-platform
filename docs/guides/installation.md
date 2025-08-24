<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Install and run the project locally

This guide helps you set up and run the frontend locally.

## 1. Use Node.js version 22

For this project, you need to use Node.js version 22.  
We suggest using a tool like [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js versions.

If you do **not** have nvm, [install it first](https://github.com/nvm-sh/nvm#installing-and-updating).

Once nvm is installed, switch to Node.js 22:

```bash
nvm use 22 || nvm install 22
```

Check your Node.js version:

```bash
node -v
```

It should print `v22.x.x`.

## 2. Ensure npm is available

Check with:

```bash
npm -v
```

If not installed, [install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## 3. Clone the repository

```bash
git clone https://github.com/StanfordSpezi/spezi-web-study-platform.git
cd spezi-web-study-platform
```

## 4. Install dependencies

```bash
npm install
```

## 5. Start the development servers

```bash
npm run dev
```

This command starts:

- The UI at http://localhost:3000
- The development API server at http://localhost:3001

## 6. Open the app

Open your browser and go to http://localhost:3000

## 7. Open the API reference (optional)

Open the interactive API docs at http://localhost:3001/scalar
