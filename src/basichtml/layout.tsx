import React from "react";
import {LayoutFunction} from "../types.js";
import Form from "./layout/form.js";

const basicHTMLLayout: LayoutFunction = ({
  fields,
  children,
  depth,
}) => {
  if (depth === 0) {
    return <Form fields={fields}>
      {children}
    </Form>;
  }
  throw new Error("Not implemented");
};

export default basicHTMLLayout;
