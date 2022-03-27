import {ResourceField} from "./types.js";

/** Determine if a ResourceField is an array of fields */
export const isFieldArray = (
  fieldType: ResourceField,
): boolean => Boolean(fieldType.isArray);

/** Determine if a ResourceField map to another resource (=many fields) */
export const isFieldDeep = (
  fieldType: ResourceField,
): boolean => typeof fieldType.type !== "string";

export const getRawType = (fieldType: ResourceField): string => {
  if (typeof fieldType.type !== "string") {
    throw new Error("Unexpected state");
  }
  return fieldType.type;
};
