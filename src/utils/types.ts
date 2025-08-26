//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { z } from "zod";

/**
 * Prettify makes complex object types easier to read by:
 * - Flattening intersections like A & B into a single object type
 * - Recursively expanding nested object types so IDE tooltips are clear
 *
 * Use this when you export or inspect inferred types (e.g., from generics, zod, or utility types),
 * they can be hard to parse. Wrap them in Prettify to get a clean, readable shape.
 *
 * Notes:
 * - This only affects type presentation in tooling; it does not change runtime behavior.
 * - Use it sparingly on large, deeply nested types if editor performance matters.
 *
 * @example
 * type A = { a: string };
 * type B = { b: number };
 * type Mixed = A & B;
 * type Readable = Prettify<Mixed>; // { a: string; b: number }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & {};

/**
 * ExtractZod pulls the TypeScript type out of a Zod schema.
 * Prefer z.infer when you know you have a Zod schema.
 * Prefer ExtractZod in generic utilities where T might be a Zod type or something else.
 * If T extends z.ZodType, you get the inferred type; otherwise you get undefined.
 *
 * @example
 * function makeType<T>(t: T): ExtractZod<T> { ... }
 * // If T is not a Zod schema, ExtractZod<T> is undefined, allowing you to branch.
 */
export type ExtractZod<T> = T extends z.ZodType ? z.infer<T> : undefined;

/**
 * PathValue returns the type at a nested property path in T.
 *
 * Provide the path as a readonly tuple of keys (string | number | symbol).
 * If the path is valid, you get the nested type; if any key is invalid, you get undefined.
 *
 * Use this to build type-safe selectors and helpers that rely on a path (e.g., get(obj, path)).
 * Derive types based on user-provided key paths without duplicating the object shape.
 *
 * @example
 * type User = {
 *   profile: {
 *     address: { city: string; zip: number };
 *   };
 *   posts: Array<{ id: string; title: string }>;
 * };
 *
 * type City = PathValue<User, ["profile", "address", "city"]>; // string
 * type PostTitle = PathValue<User, ["posts", 0, "title"]>; // string
 * type Missing = PathValue<User, ["profile", "missing"]>; // undefined
 *
 * // With a const path:
 * const path = ["profile", "address", "zip"] as const;
 * type Zip = PathValue<User, typeof path>; // number
 */
export type PathValue<T, P extends readonly PropertyKey[]> =
  P extends [] ? T
  : P extends [infer K, ...infer R] ?
    K extends keyof T ?
      PathValue<T[K], Extract<R, readonly PropertyKey[]>>
    : undefined
  : undefined;

/**
 * ConditionallyOptional transforms T so that any property whose type includes undefined
 * becomes an optional property; all other properties remain required.
 *
 * Use this to normalize API or schema-derived types where undefined signals the property may be omitted.
 * Convert shapes where "value | undefined" should mean "property is optional".
 *
 * Notes:
 * - Optional properties (e.g., foo?: string) typically include undefined in their type,
 *   so they will stay optional.
 * - Properties without undefined remain required.
 *
 * @example
 * type Input = {
 *   id: string;
 *   nickname: string | undefined;
 *   age?: number;
 *   active: boolean;
 * };
 *
 * type Output = ConditionallyOptional<Input>;
 * // {
 * //   id: string;                 // required
 * //   nickname?: string | undefined; // optional because it includes undefined
 * //   age?: number | undefined;   // optional
 * //   active: boolean;            // required
 * // }
 */
export type ConditionallyOptional<T> = {
  [P in keyof T as undefined extends T[P] ? P : never]?: T[P];
} & {
  [P in keyof T as undefined extends T[P] ? never : P]-?: T[P];
};
