import {ReactNode} from "react";
import {ArrayType, ResourceField} from "../types.js";

/** Return the appropriate React component for each field. */
export interface FieldProvider {
  /** Return a component for a single field. */
  getField(
    fieldName: string,
    fieldDescription: ResourceField,
  ): SingleField;

  /** Return a component for an array field */
  getArrayField(
    fieldName: string,
    arrayType: ArrayType,
    childFields: Record<string, Field>,
  ): ArrayField;
}

/** Change function called when a field is updated */
export type ChangeFunc = (name: string, newValue: unknown) => void;

/** Render a single field of a single known type. */
export type SingleField = () => (
  props: {
    key: string,
    name: string,
    value: unknown,
    onChange: ChangeFunc,
    position: number | undefined,
  },
) => ReactNode;

/** Render a single array field */
export type ArrayField = () => (
  props: {
    key: string,
    name: string,
  },
) => ReactNode;

export type Field = SingleField | ArrayField;
