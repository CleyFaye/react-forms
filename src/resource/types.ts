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
export interface ResourceField {
  type: string | ResourceFields;
  label?: string;
  isArray?: ArrayType;
  /** Custom properties for specific field implementation */
  properties?: Record<string, unknown>;
}

/** A list of fields that makes up a full resource */
export type ResourceFields = Record<string, ResourceField>;
