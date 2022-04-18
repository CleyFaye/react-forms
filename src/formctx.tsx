import {Requireable, Validator} from "prop-types";
import React, {ForwardedRef, LegacyRef} from "react";
import {
  ActionHandler,
  LayoutFunction,
  FieldProviderFunction,
  ArrayProviderFunction,
} from "./types.js";

export interface FormCtxType {
  onAction?: ActionHandler;
  layout: LayoutFunction;
  fieldProvider: FieldProviderFunction;
  arrayProvider: ArrayProviderFunction;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FormCtx = React.createContext<FormCtxType>({
  layout: () => {
    throw new Error("Layout not defined");
  },
  fieldProvider: () => {
    throw new Error("Field provider not defined");
  },
  arrayProvider: () => {
    throw new Error("Array provider not defined");
  },
});

export const validatorFormCtx: Requireable<FormCtxType> = (
  props,
  propName,
  componentName,
) => {
  // TODO implement type check?
  if (!(propName in props)) return new Error(`Missing prop ${propName} in ${componentName}`);
  return null;
};
validatorFormCtx.isRequired = validatorFormCtx as Validator<FormCtxType>;

export const withFormCtx = <Props,>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Compo: React.ComponentClass<Props & {formCtx: FormCtxType}>,
): React.FC<Props> => {
  const wrapper = (props: Props) => <FormCtx.Consumer>
    {ctx => <Compo
      {...props}
      formCtx={ctx}
    />}
  </FormCtx.Consumer>;
  return wrapper;
};
