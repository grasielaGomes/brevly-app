/**
 * Utility functions for formatting CSV data.
 */

/**
 * Escapes a single CSV field by wrapping in double quotes and escaping internal double quotes.
 * @param field The string to escape.
 * @returns The escaped CSV field.
 */
export function escapeCsvField(field: string): string {
  const escaped = field.replace(/"/g, '""')
  return `"${escaped}"`
}

/**
 * Formats an array of values into a CSV row string, properly escaping each field.
 * @param fields An array of strings representing the fields in a row.
 * @returns A CSV row string ending with a newline.
 */
export function formatCsvRow(fields: string[]): string {
  return fields.map(escapeCsvField).join(',') + '\n'
}

/**
 * Asynchronously generates CSV lines from an async iterable of records.
 * Each record should be an array of stringified values.
 * @param rows An async iterable where each element is an array of field values.
 * @returns An async generator yielding CSV-formatted lines (including headers if provided).
 */
export async function* csvGenerator(
  rows: AsyncIterable<string[]>
): AsyncGenerator<string> {
  for await (const rowFields of rows) {
    yield formatCsvRow(rowFields)
  }
}
