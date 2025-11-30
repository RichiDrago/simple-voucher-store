/**
 * Checks if the value is a string.
 */
export function isString(value: unknown): value is string {
    return typeof value === "string";
}

/**
 * Checks if the value is a non-empty string (after trimming).
 */
export function isNonEmptyString(value: unknown): value is string {
    return isString(value) && value.trim().length > 0;
}

/**
 * Checks if the value is a string with at least the specified minimum length.
 */
export function hasMinLength(value: unknown, min: number): boolean {
    return isString(value) && value.trim().length >= min;
}

/**
 * Checks if the value is a valid number (not NaN).
 */
export function isNumber(value: unknown): boolean {
    return typeof value === "number" && !isNaN(value);
}

/**
 * Checks if the value is a valid integer.
 * Accepts both numeric values and numeric strings.
 */
export function isInteger(value: unknown): boolean {
    if (isNumber(value)) return Number.isInteger(value);
    if (isString(value)) return /^[0-9]+$/.test(value);
    return false;
}

/**
 * Converts valid integer values (string or number) to a number.
 * Returns null if conversion is not possible.
 */
export function toInteger(value: unknown): number | null {
    if (isInteger(value)) return Number(value);
    return null;
}

/**
 * Checks if the value is a boolean.
 */
export function isBoolean(value: unknown): boolean {
    return typeof value === "boolean";
}
