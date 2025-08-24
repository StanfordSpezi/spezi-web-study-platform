//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Study Platform open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Utility type to prettify object types by flattening intersections and expanding object types.
 * This makes complex inferred types more readable in IDE tooltips and error messages.
 *
 * @example
 * type Complex = { a: string } & { b: number };
 * type Pretty = Prettify<Complex>; // { a: string; b: number }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & {};
