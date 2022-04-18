import React, {ReactNode} from "react";
import PropTypes from "prop-types";
import {
  DirectFieldDefinition,
  FieldDefinition,
  NestedArrayFieldDefinition,
  NestedFieldDefinition,
  ValueType,
  ChangeHandler,
  ResourceDefinition,
  validatorValueType,
  validatorResourceDefinition,
  FullDirectFieldDefinition,
} from "../types.js";
import {FormCtxType, validatorFormCtx, withFormCtx} from "../formctx.js";

interface PropsWithoutCtx {
  value: ValueType;
  onChange: ChangeHandler<ValueType>;
  resource: ResourceDefinition;
  depth: number;
  fields?: Array<string>;
  children?: ReactNode | Array<ReactNode>;
}

interface Props extends PropsWithoutCtx {
  formCtx: FormCtxType;
}

/** Render a single depth form a resource definition */
class FieldList extends React.Component<Props> {
  public static displayName = "FieldList";

  public static propTypes = {
    value: validatorValueType,
    onChange: PropTypes.func.isRequired,
    resource: validatorResourceDefinition,
    depth: PropTypes.number.isRequired,
    formCtx: validatorFormCtx.isRequired,
    fields: PropTypes.array,
    children: PropTypes.node,
  };

  public static defaultProps = {
    fields: undefined,
    children: undefined,
  };

  public render(): ReactNode {
    const fields = this.getAllFields();
    if (!fields) return null;
    return this.props.formCtx.layout({
      fields,
      depth: this.props.depth,
      children: this.props.children,
    });
  }

  private handleChange = (name: string, value: unknown) => {
    this.props.onChange({
      ...this.props.value,
      [name]: value,
    });
  };

  private getAllFields(): Record<string, ReactNode> | null {
    const topLevelFields = this.getActiveFields();
    if (topLevelFields.length === 0) return null;
    return topLevelFields.reduce<Record<string, ReactNode>>(
      (res, fieldName) => {
        res[fieldName] = this.getField(fieldName);
        return res;
      },
      {},
    );
  }

  private getActiveFields() {
    if (!this.props.fields) return Object.keys(this.props.resource);
    return this.props.fields.filter(c => c.indexOf(".") === -1);
  }

  /** Return the fully rendered field requested */
  private getField(
    name: string,
  ): ReactNode {
    const field = this.props.resource[name];
    if (typeof field === "string") return this.getDirectField(name, {dataType: field});
    switch (field.type) {
      case "nest": return this.getNestField(name, field);
      case "array": return this.getArrayField(name, field);
      case "field": return this.getDirectField(name, field);
      case undefined: return this.getDirectField(name, field);
    }
  }

  private getDirectField(name: string, definition: FullDirectFieldDefinition): ReactNode {
    return this.props.formCtx.fieldProvider({
      name,
      definition,
      onChange: this.handleChange,
      value: this.props.value[name],
    });
  }

  private getNestField(name: string, field: NestedFieldDefinition): ReactNode {
    // TODO
    throw new Error("Not implemented");
  }

  private getArrayField(name: string, field:NestedArrayFieldDefinition): ReactNode {
    // TODO
    throw new Error("Not implemented");
  }
}

export default withFormCtx<PropsWithoutCtx>(FieldList);
