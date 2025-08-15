//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import fs from "node:fs";
import { z } from "zod";
import { studyFixtures } from "./entities/study/fixtures";
import { studySchema } from "./entities/study/schema";
import { teamFixtures } from "./entities/team/fixtures";
import { teamSchema } from "./entities/team/schema";
import { userFixtures } from "./entities/user/fixtures";
import { userSchema } from "./entities/user/schema";

const devDatabasePath = "src/server/database/db.json";

const devDatabaseSchema = z.object({
  studies: studySchema.array(),
  teams: teamSchema.array(),
  users: userSchema.array(),
});

type DevDatabase = z.infer<typeof devDatabaseSchema>;

// Fixtures with different scenarios for seeding the development database
const devDatabaseFixtures: Record<string, DevDatabase> = {
  default: {
    studies: studyFixtures,
    teams: teamFixtures,
    users: userFixtures,
  },
  empty: {
    studies: [],
    teams: [],
    users: userFixtures,
  },
};

// Current development database, change this to test different scenarios
const initialDevDatabase: DevDatabase = devDatabaseFixtures.default;

/**
 * Retrieves the development database from the file system.
 *
 * If the database file exists and its contents are valid according to the schema,
 * returns the parsed database. If the file exists but is invalid, resets the file
 * to the default development database and returns it. If the file does not exist, creates
 * it with the default development database and returns it.
 */
export const getDevDatabase = (): DevDatabase => {
  const hasDatabase = fs.existsSync(devDatabasePath);
  if (hasDatabase) {
    const data = fs.readFileSync(devDatabasePath, "utf-8");
    const parsed = devDatabaseSchema.safeParse(JSON.parse(data));
    if (parsed.success) {
      return parsed.data;
    }
    // If the format is invalid, reset to the default development database
    fs.writeFileSync(
      devDatabasePath,
      JSON.stringify(initialDevDatabase, null, 2),
    );
    return initialDevDatabase;
  }

  fs.writeFileSync(
    devDatabasePath,
    JSON.stringify(initialDevDatabase, null, 2),
  );
  return initialDevDatabase;
};

/**
 * Updates the development database with the provided partial data.
 * This function only allows a shallow merge with the existing database.
 */
export const setDevDatabase = (data: Partial<DevDatabase>): void => {
  const currentDatabase = getDevDatabase();
  const newDatabase = { ...currentDatabase, ...data };
  const parsed = devDatabaseSchema.safeParse(newDatabase);
  if (parsed.success) {
    fs.writeFileSync(devDatabasePath, JSON.stringify(parsed.data, null, 2));
  } else {
    throw new Error("Invalid database schema");
  }
};
