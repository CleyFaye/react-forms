/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import {ArrayField, Field, FieldProvider, SingleField} from "../fields/types.js";
import {ResourceField, ArrayType} from "../types.js";

export class DummyFieldProvider implements FieldProvider {
  public getField(fieldName: string, fieldDescription: ResourceField): SingleField {
    return () => (props: {key: string}) => <div key={props.key}>
      I am {fieldName} with props {JSON.stringify(props)}
    </div>;
  }

  public getArrayField(
    fieldName: string,
    arrayType: ArrayType,
    childFields: Record<string, Field>,
  ): ArrayField {
    return () => (props: {key: string}) => {
      const childs = Object.keys(childFields).map(childName => <>
        {childName} - {childFields[childName]()}
      </>);
      return <div key={props.key}>
        I am: {fieldName} with childs {childs} and props {JSON.stringify(props)}
      </div>;
    };
  }
}
