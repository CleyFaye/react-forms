import React from "react";
import {ArrayType, ResourceField} from "../resource/types.js";

/** Return the appropriate React component for each field. */
export interface FieldProvider {
  /** Return a component for a single field. */
  getField(
    fieldName: string,
    fieldDescription: ResourceField,
    muteLabel: boolean,
  ): SingleField;

  /** Return a component for an array field */
  getArrayField(
    fieldName: string,
    label: string | undefined,
    arrayType: ArrayType,
    childFields: Record<string, Field>,
  ): ArrayField;
}

/** Change function called when a field is updated */
export type ChangeFunc = (name: string, newValue: unknown) => void;

export interface SingleFieldProps {
  name: string;
  value: unknown;
  onChange: ChangeFunc;
  position?: number;
}

/** Render a single field of a single known type. */
export type SingleField = React.FC<SingleFieldProps>;

export interface ArrayFieldProps {
  name: string;
  value: unknown;
  onChange: ChangeFunc;
}

/** Render a single array field */
export type ArrayField = React.FC<ArrayFieldProps>;

export type Field = SingleField | ArrayField;
