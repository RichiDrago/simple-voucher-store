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
 * Checks if the value is a boolean.
 */
export function isBoolean(value: unknown): boolean {
    return typeof value === "boolean";
}

/**
 * Helper: Check if a value is a valid positive integer ID.
 */
export function isValidId(value: unknown): boolean {
    const num = Number(value);
    return Number.isInteger(num) && num > 0;
}
