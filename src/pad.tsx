import React from "react";
import ReactDOMServer from "react-dom/server.js";
import {DummyFieldProvider} from "./dummy/dummyfieldprovider.js";
import {Resource} from "./resource.js";

const res = new Resource({name: "string", phone: "string"});

const fields = res.getFields(new DummyFieldProvider());

let keyId = 0;

const fieldComps = Object.keys(fields).map(fieldName => fields[fieldName]()({
  key: (++keyId).toString(),
  name: "titi",
  value: undefined,
  onChange(name: string, newValue: unknown): void {
    throw new Error("Function not implemented.");
  },
  position: undefined,
}));

console.log(ReactDOMServer.renderToString(<div>{fieldComps}</div>));
