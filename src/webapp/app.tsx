import React, {ReactNode} from "react";
import Form from "../form/form.js";
import {
  ValueType,
  ResourceDefinition,
} from "../types.js";

interface State {
  value: unknown;
}

const testResource: ResourceDefinition = {};

export default class App extends React.Component<unknown, State> {
  public displayName = "App";

  public constructor(props: unknown) {
    super(props);
    this.state = {value: {}};
  }

  public handleChange = (value: unknown): void => {
    this.setState({value});
  };

  public render(): ReactNode {
    const JSON_INDENT = 2;
    return <>
      <div>
        <h1>Form</h1>
        <Form
          value={this.state.value as ValueType}
          onChange={this.handleChange}
          resource={testResource}
        />
      </div>
      <div>
        <h2>Current value</h2>
        <pre>
          {JSON.stringify(this.state.value, null, JSON_INDENT)}
        </pre>
      </div>
    </>;
  }
}
