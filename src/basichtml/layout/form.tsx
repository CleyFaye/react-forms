import React, {FormEvent, ReactNode} from "react";
import PropTypes from "prop-types";
import {
  withFormCtx,
  validatorFormCtx,
  FormCtxType,
} from "../../formctx.js";

interface PropsWithoutCtx {
  fields: Record<string, ReactNode>,
  children?: ReactNode,
}

interface Props extends PropsWithoutCtx {
  formCtx: FormCtxType,
}

class Form extends React.Component<Props> {
  public static displayName = "Form";

  public static propTypes = {
    fields: PropTypes.objectOf<ReactNode>(PropTypes.object).isRequired,
    formCtx: validatorFormCtx.isRequired,
    children: PropTypes.node,
  };

  public static defaultProps = {children: undefined};

  public render(): ReactNode {
    return <form
      onSubmit={this.handleSubmit}
    >
      {this.props.children}
      {Object.keys(this.props.fields).map(name => {
        const node = this.props.fields[name];
        return <React.Fragment key={name}>{node}</React.Fragment>;
      })}
      <input type="submit" value="Submit" />
    </form>;
  }

  private handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (this.props.formCtx.onAction) this.props.formCtx.onAction("submit");
  };
}

export default withFormCtx<PropsWithoutCtx>(Form);
