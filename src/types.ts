/** Possible type of fields repetition */
export enum ArrayType {
  /** Field does not repeat */
  noArray = "",
  /** Field repeat in an array statically provided by the data */
  staticArray = "STATICARRAY",
  /** Field repeat in an array that can be extended/reduced */
  dynamicArray = "DYNAMICARRAY",
}
Object.freeze(ArrayType);

/**
 * An extended resource field.
 *
 * Allows defining more property than the basic type
 */
export interface ResourceFieldEx {
  type: string | ResourceFields;
  isArray: ArrayType;
}

/** A single resource field */
export type ResourceField = string | ResourceFieldEx;

/** A list of fields that makes up a full resource */
export type ResourceFields = Record<string, ResourceField>;
