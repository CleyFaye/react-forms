import React, {ChangeEvent, ReactNode} from "react";
import PropTypes from "prop-types";
import {NamedChangeHandler} from "../../types.js";
import {getUniqId} from "../utils.js";

interface Props {
  name: string;
  label?: string;
  value: string;
  onChange: NamedChangeHandler<string>;
}

interface State {
  uniqId: string;
}

export default class TextField extends React.Component<Props, State> {
  public static displayName = "TextField";

  public static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  public static defaultProps = {label: undefined};

  public constructor(props: Props) {
    super(props);
    this.state = {uniqId: getUniqId()};
  }

  public render(): ReactNode {
    const labelElem = this.props.label
      ? <label htmlFor={this.state.uniqId}>{this.props.label}</label>
      : undefined;
    return <div>
      {labelElem}
      <input
        id={this.state.uniqId}
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
      />
    </div>;
  }

  private handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(this.props.name, ev.target.value);
  };
}
