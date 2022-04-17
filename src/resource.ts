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
  /** Should the form allows for adding/removing entries */
  dynamic?: boolean;
  /** The nested resource definition. */
  nestedType: ResourceDefinition;
}

export type FieldDefinition = DirectFieldDefinition
| NestedFieldDefinition
| NestedArrayFieldDefinition;

export type ResourceDefinition = Record<string, FieldDefinition>;
