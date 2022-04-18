import {ReactNode} from "react";

interface BaseFieldDefinition {
  type?: "field" | "array" | "nest" | undefined;
  /** Either an indication, or the actual label, depending on the fields provider */
  label?: string;
}

export interface DirectFieldDefinition extends BaseFieldDefinition {
  type?: "field" | undefined;
  /** The datatype. Must be accepted by the fields provider. */
  dataType: string;
}

export interface NestedFieldDefinition extends BaseFieldDefinition {
  type: "nest";
  /** The nested resource definition. */
  nestedType: ResourceDefinition;
}

export interface NestedArrayFieldDefinition extends BaseFieldDefinition {
  type: "array";
  canAdd?: boolean;
  canRemove?: boolean;
  canReorder?: boolean;
  /** The nested resource definition. */
  nestedType: ResourceDefinition;
}

/** Definition of a single property in a data object layout */
export type FieldDefinition = DirectFieldDefinition
| NestedFieldDefinition
| NestedArrayFieldDefinition;

/** Definition of a data object layout */
export type ResourceDefinition = Record<string, FieldDefinition>;

/** Type for editable value. */
export type ValueType = Record<string, unknown>;

/** Change handler with only value */
export type ChangeHandler<T = unknown> = (value: T) => void;

export type NamedChangeHandler<T = unknown> = (name: string, value: T) => void;

export type ActionHandler = (action: string) => void;

export interface LayoutArguments {
  fields: Record<string, ReactNode>;
  children?: ReactNode | Array<ReactNode> | undefined;
  depth: number;
  onAction: ActionHandler;
}

export type LayoutFunction = (args: LayoutArguments) => ReactNode;

export interface FieldProviderArguments<DataType = unknown> {
  name: string;
  definition: DirectFieldDefinition;
  onAction: ActionHandler;
  value: DataType;
  onChange: NamedChangeHandler<DataType>;
}

export type FieldProviderFunction = (args: FieldProviderArguments) => ReactNode;

/** Function called when a dynamic array is extended */
export type ArrayAddFunction = () => void;

/** Function called when a dynamic array's entry is removed */
export type ArrayRemoveFunction = (key: string) => void;

/** Function called when two dynamic array's entries must be swapped */
export type ArrayReorderFunction = (key1: string, key2: string) => void;

export interface ArrayProviderArguments {
  name: string;
  canAdd: boolean;
  canRemove: boolean;
  canReorder: boolean;
  entries: Array<{key: string; component: ReactNode}>;
  onAdd: ArrayAddFunction;
  onRemove: ArrayRemoveFunction;
  onReorder: ArrayReorderFunction;
}

export type ArrayProviderFunction = (args: ArrayProviderArguments) => ReactNode;
