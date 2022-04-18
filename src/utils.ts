/** Error to throw when the actual data mismatch the expected layout */
export const dataTypeError = (
  actual: string,
  expected: string,
): Error => new Error(`Wrong data type; expected ${expected}, got ${actual}`);
