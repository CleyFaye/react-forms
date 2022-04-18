import React, {ReactNode} from "react";
import PropTypes from "prop-types";
import {
  ActionHandler,
  ArrayProviderFunction,
  NamedChangeHandler,
  FieldProviderFunction,
  LayoutFunction,
  ResourceDefinition,
  ValueType,
} from "../types.js";
import FieldList from "./fieldlist.js";

interface Props {
  name: string;
  value: ValueType;
  onChange: NamedChangeHandler;
  resource: ResourceDefinition;
  depth: number;
}

export default class Nesting extends React.Component<Props> {
  public static displayName = "Nesting";

  public static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    resource: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
  };

  public render(): ReactNode {
    return <FieldList
      value={this.props.value}
      onChange={this.handleChange}
      resource={this.props.resource}
      depth={this.props.depth + 1}
    />;
  }

  private handleChange = (newValue: unknown) => {
    this.props.onChange(this.props.name, newValue);
  };
}
