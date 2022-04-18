import React, {ReactNode} from "react";
import PropTypes from "prop-types";
import {
  ActionHandler,
  ArrayProviderFunction,
  ChangeHandler,
  FieldProviderFunction,
  LayoutFunction,
  ResourceDefinition,
  ValueType,
} from "../types.js";
import basicHTMLLayout from "../basichtml/layout.js";
import basicHTMLFieldProvider from "../basichtml/fields.js";
import basicHTMLArrayProvider from "../basichtml/array.js";
import {FormCtx} from "../formctx.js";
import FieldList from "./fieldlist.js";

interface Props {
  value: ValueType;
  onChange: ChangeHandler<ValueType>;
  onAction?: ActionHandler;
  resource: ResourceDefinition;
  layout: LayoutFunction;
  fieldProvider: FieldProviderFunction;
  arrayProvider: ArrayProviderFunction;
  fields?: Array<string>;
  children?: ReactNode | Array<ReactNode>;
}

/** Display a Form for user to edit data. */
export default class Form extends React.Component<Props> {
  public static displayName = "Form";
  public static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onAction: PropTypes.func,
    resource: PropTypes.object.isRequired,
    layout: PropTypes.func,
    fieldProvider: PropTypes.func,
    arrayProvider: PropTypes.func,
    fields: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
  };

  public static defaultProps = {
    onAction: undefined,
    layout: basicHTMLLayout,
    fieldProvider: basicHTMLFieldProvider,
    arrayProvider: basicHTMLArrayProvider,
    fields: undefined,
    children: undefined,
  };

  public render(): ReactNode {
    return <FormCtx.Provider
      value={{
        onAction: this.props.onAction,
        layout: this.props.layout,
        fieldProvider: this.props.fieldProvider,
        arrayProvider: this.props.arrayProvider,
      }}
    >
      <FieldList
        value={this.props.value}
        onChange={this.props.onChange}
        resource={this.props.resource}
        fields={this.props.fields}
        depth={0}
      >
        {this.props.children}
      </FieldList>
    </FormCtx.Provider>;
  }
}
