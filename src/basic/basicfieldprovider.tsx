/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {ChangeEvent} from "react";
import {ArrayField, ChangeFunc, Field, FieldProvider, SingleField} from "../fields/types.js";
import {ResourceField, ArrayType} from "../resource/types.js";
import {getRawType} from "../resource/utils.js";
import {getUniqId} from "./utils.js";

const domChangeWrapper = (changeFunc: ChangeFunc) => (ev: ChangeEvent) => {
  const elem = ev.currentTarget as HTMLInputElement;
  changeFunc(elem.name, elem.value);
};

export interface NumberFieldProperties {
  min?: number;
  max?: number;
}

export const isNumberFieldProperties = (
  obj: unknown,
): obj is NumberFieldProperties => {
  const rec = obj as Record<string, unknown>;
  return (!("min" in rec) || typeof rec.min === "number")
    && (!("max" in rec) || typeof rec.max === "number");
};

export interface LabelProps {
  htmlFor?: string;
}

export interface InputProps {
  inputId: string;
  name: string;
  value: unknown;
  onChange: ChangeFunc;
}

/**
 * Basic HTML field provider
 *
 * Natively supports the following field types:
 *
 * - text
 * - password
 * - number (with min and max)
 *
 * As well as very basic arrays
 */
export class BasicFieldProvider implements FieldProvider {
  public getField(
    fieldName: string,
    fieldDescription: ResourceField,
    muteLabel: boolean,
  ): SingleField {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Label = muteLabel
      ? undefined
      : this.getLabel(fieldName, fieldDescription.label);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Input = this.getInput(fieldName, fieldDescription);
    return (props: {
      name: string,
      value: unknown,
      onChange: ChangeFunc,
    }) => {
      const uniqId = getUniqId();
      return <div>
        {Label ? <Label htmlFor={uniqId} /> : undefined}
        <Input
          inputId={uniqId}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </div>;
    };
  }

  public getArrayField(
    fieldName: string,
    label: string | undefined,
    arrayType: ArrayType,
    childFields: Record<string, Field>,
  ): ArrayField {
    return props => {
      const arrayValue = props.value;
      if (!Array.isArray(arrayValue)) throw new Error("Unexpected state");
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const selfName = props.name;
      /** A single value (which might be comprised of multiple fields) */
      const singleChild: React.FC<{value: unknown, position: number}> = props2 => {
        const childGroupName = `${selfName}[${props2.position}]`;
        const childs = Object.keys(childFields).map(childName => {
          const childGroupFieldName = `${childGroupName}.${childName}`;
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const ChildField = childFields[childName];
          return <ChildField
            key={childGroupFieldName}
            name={childGroupFieldName}
            value={props2.value}
            onChange={props.onChange}
            position={props2.position}
          />;
        });
        return <div key={childGroupName}>
          {childs}
        </div>;
      };

      // eslint-disable-next-line react/no-this-in-sfc, @typescript-eslint/naming-convention
      const Label = this.getLabel(fieldName, label);
      return <div>
        <Label />
        {arrayValue.map((value, position) => singleChild({
          value: value as unknown,
          position,
        }))}
      </div>;
    };
  }

  /** Return a function component to display the label of the given field */
  protected getLabel(
    fieldName: string,
    label: string | undefined,
  ): React.FC<LabelProps> {
    const labelStr = label ?? fieldName;
    return props => <label htmlFor={props.htmlFor}>
      {labelStr}
    </label>;
  }

  protected getInput(
    fieldName: string,
    fieldDescription: ResourceField,
  ): React.FC<InputProps> {
    const effectiveType = getRawType(fieldDescription);
    if (["text", "password"].includes(effectiveType)) {
      return props => <input
        type={effectiveType}
        name={props.name}
        id={props.inputId}
        value={props.value as string}
        onChange={domChangeWrapper(props.onChange)}
      />;
    }
    if (effectiveType === "number") {
      const numberParam = fieldDescription.properties ?? {};
      if (!isNumberFieldProperties(numberParam)) throw new Error("Invalid properties");
      const numberProperties: NumberFieldProperties = numberParam;
      return props => <input
        type="number"
        name={props.name}
        id={props.inputId}
        min={numberProperties.min}
        max={numberProperties.max}
        value={props.value as number}
        onChange={domChangeWrapper(props.onChange)}
      />;
    }
    throw new Error("Unsupported field type");
  }
}
