import React, {ReactNode} from "react";
import Form from "../form/form.js";
import {
  ValueType,
  ResourceDefinition,
} from "../types.js";

interface State {
  value: unknown;
  actions: Array<string>;
}

const testResource: ResourceDefinition = {
  firstName: "text",
  secondName: {
    label: "Second name",
    dataType: "text",
  },
};

export default class App extends React.Component<unknown, State> {
  public displayName = "App";

  public constructor(props: unknown) {
    super(props);
    this.state = {
      value: {
        firstName: "",
        secondName: "",
      },
      actions: [],
    };
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
          onAction={this.handleAction}
          resource={testResource}
        />
      </div>
      <div>
        <h1>Current value</h1>
        <pre>
          {JSON.stringify(this.state.value, null, JSON_INDENT)}
        </pre>
      </div>
      <div>
        <h1>Last actions</h1>
        <pre>
          {this.state.actions.join("\n")}
        </pre>
      </div>
    </>;
  }

  private handleAction = (action: string) => {
    this.setState(oldState => {
      const actions = [
        `Action: "${action}" at ${new Date().toISOString()}`,
        ...oldState.actions,
      ];
      return {actions};
    });
  };
}
