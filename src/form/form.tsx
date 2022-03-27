import React from "react";
import PropTypes from "prop-types";
import {Field} from "../fields/types.js";
import {DataValues} from "./types.js";

interface Props {
  fields: Record<string, Field>;
  data: DataValues;
  onChange: (newValue: DataValues) => void;
}

export class Form extends React.Component<Props> {
  public static displayName = "Form";

  public static propTypes = {
    fields: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func,
  };

  public static defaultProps = {onChange: undefined};

  public constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  public render(): React.ReactNode {
    // Insert layout somewhere
    const fields = Object.keys(this.props.fields).map(fieldName => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const FieldComp = this.props.fields[fieldName];
      return <FieldComp
        key={fieldName}
        name={fieldName}
        value={this.props.data[fieldName]}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        onChange={this.handleChange}
      />;
    });
    return fields;
  }

  // eslint-disable-next-line class-methods-use-this
  protected handleChange(name: string, value: unknown): void {
    console.log("change");
  }
}
