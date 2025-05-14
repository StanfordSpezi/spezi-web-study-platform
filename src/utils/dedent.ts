/**
 * Removes leading and trailing whitespace from each line of a template string,
 * filters out empty lines, and joins the result with newlines.
 *
 * @example
 * const result = dedent`
 *   This is a template string
 *   with multiple lines.
 *   It will be dedented.
 * `;
 * console.log(result);
 * // Output:
 * // This is a template string
 * // with multiple lines.
 * // It will be dedented.
 */
export const dedent = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  // Combine the template string and values
  let raw = strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");

  // Split into lines, trim each line, and filter out empty lines
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
};
