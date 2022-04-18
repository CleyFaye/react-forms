import React, {ReactNode} from "react";
import PropTypes from "prop-types";
import {ActionHandler, ArrayProviderFunction, ChangeHandler, FieldProviderFunction, LayoutFunction, ResourceDefinition, ValueType} from "../types.js";
import basicHTMLLayout from "../basichtml/layout.js";
import basicHTMLFieldProvider from "../basichtml/fields.js";
import basicHTMLArrayProvider from "../basichtml/array.js";

interface Props {
  value: ValueType;
  onChange: ChangeHandler<ValueType>;
  onAction: ActionHandler;
  resource: ResourceDefinition;
  layout: LayoutFunction;
  fieldsProvider: FieldProviderFunction;
  arrayProvider: ArrayProviderFunction;
  children: ReactNode | Array<ReactNode>;
}

interface State {
}

/** Display a Form for user to edit data. */
export default class Form extends React.Component<Props, State> {
  public static displayName = "Form";
  public static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onAction: PropTypes.func,
    resource: PropTypes.object.isRequired,
    layout: PropTypes.func,
    fieldsProvider: PropTypes.func,
    arrayProvider: PropTypes.func,
    children: PropTypes.node,
  };

  public static defaultProps = {
    onAction: undefined,
    layout: basicHTMLLayout,
    fieldsProvider: basicHTMLFieldProvider,
    arrayProvider: basicHTMLArrayProvider,
    children: undefined,
  };

  public constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render(): ReactNode {
    return <div>TODO</div>;
  }
}
