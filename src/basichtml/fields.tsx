import React from "react";
import {FieldProviderFunction} from "../types.js";
import {dataTypeError} from "../utils.js";
import TextField from "./fields/textfield.js";

const basicHTMLFieldProvider: FieldProviderFunction = ({
  definition,
  name,
  onChange,
  value,
}) => {
  switch (definition.dataType) {
    case "text":
      if (typeof value !== "string") throw dataTypeError(typeof value, "string");
      return <TextField
        name={name}
        label={definition.label}
        onChange={onChange}
        value={value}
      />;
  }
  throw new Error("Not implemented");
};

export default basicHTMLFieldProvider;
