/** A single data mapping to a field */
export type DataValue = unknown | Record<string, unknown> | Array<Record<string, unknown>>;

/** Input/ouptut data for/from a Form */
export type DataValues = Record<string, DataValue>;
