import {Field, FieldProvider} from "../fields/types.js";
import {ArrayType, ResourceField, ResourceFields} from "./types.js";
import {isFieldArray, isFieldDeep} from "./utils.js";

const getFieldNameFromType = (
  fieldName: string,
  fieldType: ResourceField,
): Array<string> => {
  if (typeof fieldType === "string") return [fieldName];
  const fieldTypeEx = fieldType.type;
  if (typeof fieldTypeEx === "string") return [fieldName];
  return [
    fieldName,
    ...Object.keys(fieldTypeEx).map(subFieldName => {
      const allSubFieldNames = getFieldNameFromType(subFieldName, fieldTypeEx[subFieldName]);
      return allSubFieldNames.map(c => `${fieldName}.${c}`);
    })
      .flat(),
  ];
};

/** Return all the fields making up a single ResourceField mapped to another ResourceFields */
const getFieldDeep = (
  provider: FieldProvider,
  fieldName: string | undefined,
  fieldType: ResourceFields,
  fields: Array<string>,
): Record<string, Field> => {
  const res: Record<string, Field> = {};
  fields.filter(c => c.indexOf(".") === -1).forEach(subFieldName => {
    const subFieldType = fieldType[subFieldName];
    const subSubFields = fields.filter(c => c.startsWith(`${subFieldName}.`))
      .map(c => c.substring(`${subFieldName}.`.length));
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const effectiveSubFieldName = fieldName
      ? `${fieldName}.${subFieldName}`
      : subFieldName;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    Object.assign(res, getField(provider, effectiveSubFieldName, subFieldType, subSubFields));
  });
  return res;
};

/** Return the fields representing a single ResourceField */
const getFieldSingle = (
  provider: FieldProvider,
  fieldName: string,
  fieldType: ResourceField,
  subFields: Array<string>,
): Record<string, Field> => {
  if (isFieldDeep(fieldType)) {
    return getFieldDeep(
      provider,
      fieldName,
      fieldType.type as ResourceFields,
      subFields,
    );
  }
  return {[fieldName]: provider.getField(fieldName, fieldType)};
};

const getFieldArray = (
  provider: FieldProvider,
  fieldName: string,
  fieldType: ResourceField,
  subFields: Array<string>,
): Record<string, Field> => {
  if (typeof fieldType === "string") throw new Error("Unexpected state");
  const childFields = getFieldSingle(
    provider,
    fieldName,
    fieldType,
    subFields,
  );
  const arrayType = fieldType.isArray;
  if (arrayType === undefined || arrayType === ArrayType.noArray) {
    throw new Error("Unexpected state");
  }
  return {
    fieldName: provider.getArrayField(
      fieldName,
      arrayType,
      childFields,
    ),
  };
};

/** Get the appropriate Field for the given ResourceField */
const getField = (
  provider: FieldProvider,
  fieldName: string,
  fieldType: ResourceField,
  subFields: Array<string>,
): Record<string, Field> => {
  if (isFieldArray(fieldType)) {
    return getFieldArray(provider, fieldName, fieldType, subFields);
  }
  return getFieldSingle(provider, fieldName, fieldType, subFields);
};

/**
 * A resource that can be displayed/edited in a form.
 *
 * A resource is merely the description of fields present in a data.
 * When a form is instanciated, the fields are created using the resource description, while the
 * values are pulled from the data.
 *
 * When a form is saved, the value are read from the field in the description and updates the
 * corresponding properties in the data.
 */
export class Resource {
  private fields: ResourceFields;

  public constructor(fields: ResourceFields) {
    this.fields = fields;
  }

  /**
   * Return all requested properties as fields to represent this resource
   *
   * @param fields
   * List of fields to provide.
   * When restricting fields in sub-properties, the syntax "topfield.subfield1" can be used.
   */
  public getFields(
    provider: FieldProvider,
    fields?: Array<string>,
  ): Record<string, Field> {
    const effectiveFields = fields ?? this.getAllFieldsName();
    return getFieldDeep(
      provider,
      undefined,
      this.fields,
      effectiveFields,
    );
  }

  /** Return all field names in this resource */
  public getAllFieldsName(): Array<string> {
    const res: Array<string> = [];
    Object.keys(this.fields).forEach(fieldName => {
      const fieldNames: Array<string> = getFieldNameFromType(
        fieldName,
        this.fields[fieldName],
      );
      res.push(...fieldNames);
    });
    return res;
  }
}
